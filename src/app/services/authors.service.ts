import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getAuthorsQuery } from '../graphql/queries';

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
}
