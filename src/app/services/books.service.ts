import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  addBookAuthorMutation,
  addBookMutation,
  deleteBookAuthorMutation,
  updateBookMutation,
} from '../graphql/mutations';
import { BookQuery, BooksQuery } from '../graphql/queries';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private apollo: Apollo) {}

  getBooks(where = {}) {
    return this.apollo.query({
      query: BooksQuery,
      variables: { where: { ...where, is_deleted: { _eq: false } } },
      fetchPolicy: 'network-only',
    });
  }

  getBookById(id: number | string) {
    return this.apollo.query({
      query: BookQuery,
      variables: { id },
      fetchPolicy: 'network-only',
    });
  }

  addBook(data: any) {
    return this.apollo.mutate({
      mutation: addBookMutation,
      variables: { object: data },
    });
  }

  updateBook({ id, set }) {
    return this.apollo.mutate({
      mutation: updateBookMutation,
      variables: { id, set },
    });
  }

  addBookAuthors(data) {
    return this.apollo.mutate({
      mutation: addBookAuthorMutation,
      variables: { objects: data },
    });
  }

  deleteBookAuthors({ bookId, authorIds }) {
    return this.apollo.mutate({
      mutation: deleteBookAuthorMutation,
      variables: { bookId, authorIds },
    });
  }
}
