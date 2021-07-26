import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { updateAdminMutation } from '../graphql/mutations';
import { adminsQuery } from '../graphql/queries';

@Injectable({
  providedIn: 'root',
})
export class AdminsService {
  constructor(private apollo: Apollo) {}

  getAdmins() {
    return this.apollo.query({
      query: adminsQuery,
      fetchPolicy: 'network-only',
    });
  }

  updateAdmin({ id, set }) {
    return this.apollo.mutate({
      mutation: updateAdminMutation,
      variables: { id, set },
    });
  }
}
