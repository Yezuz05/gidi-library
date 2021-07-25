import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { addAuthorMutation, updateAuthorMutation } from '../graphql/mutations';
import { getAuthorByIdQuery, getAuthorsQuery } from '../graphql/queries';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  constructor(private apollo: Apollo) {}

  getAuthors() {
    return this.apollo
      .query({
        query: getAuthorsQuery,
        fetchPolicy: 'network-only',
      })
      .toPromise();
  }

  getAuthorById(id) {
    return this.apollo.query({
      query: getAuthorByIdQuery,
      variables: { id },
      fetchPolicy: 'network-only',
    });
  }

  addAuthor(data) {
    return this.apollo.mutate({
      mutation: addAuthorMutation,
      variables: { object: data },
    });
  }

  updateAuthor({ id, set }) {
    return this.apollo.mutate({
      mutation: updateAuthorMutation,
      variables: { id, set },
    });
  }
}
