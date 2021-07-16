import { gql } from 'apollo-angular';

export const getAuthorsQuery = gql`
  query getAuthorsQuery {
    authors(order_by: { created_at: asc }) {
      bio
      id
      name
      books_authors(order_by: { created_at: asc }) {
        book {
          no_of_pages
          isbn
          id
          title
          volume
        }
      }
    }
  }
`;
