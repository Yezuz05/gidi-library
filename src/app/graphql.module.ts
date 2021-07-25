import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloLink, InMemoryCache, split } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { HttpLink } from 'apollo-angular/http';
import { getMainDefinition } from '@apollo/client/utilities';

import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

const uri = 'https://lasu-ece-library.herokuapp.com/v1/graphql'; // <-- add the URL of the GraphQL server here
const WSUri = 'wss://lasu-ece-library.herokuapp.com/v1/graphql';

const authorizationHeader = (authService: AuthService) => {
  const token = authService.getToken();
  return {
    headers: {
      Authorization: `${token}`,
    },
  };
};

const authCtx = (authService: AuthService) =>
  setContext(async () => {
    return await authorizationHeader(authService);
  });

const webSocketLink = (authService: AuthService) =>
  new WebSocketLink({
    uri: WSUri,
    options: {
      reconnect: true,
      lazy: true,
      connectionParams: async () => {
        return await authorizationHeader(authService);
      },
    },
  });

const requestLink = (httpLink: HttpLink, authService: AuthService) =>
  split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    webSocketLink(authService),
    httpLink.create({ uri })
  );

export function createApollo(httpLink: HttpLink, authService: AuthService) {
  const link = ApolloLink.from([
    authCtx(authService),
    requestLink(httpLink, authService),
  ]);
  const cache = new InMemoryCache();
  return {
    link,
    cache,
  };
}
@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthService],
    },
  ],
})
export class GraphQLModule {}
