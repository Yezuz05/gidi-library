import { gql } from 'apollo-angular';

export const getAuthorsQuery = gql`
  query getAuthorsQuery {
    authors(
      where: { is_deleted: { _eq: false } }
      order_by: { created_at: asc }
    ) {
      bio
      created_at
      updated_at
      id
      name
      books_authors_aggregate {
        aggregate {
          count
        }
      }
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

export const getAuthorByIdQuery = gql`
  query getAuthorByIdQuery($id: Int!) {
    authors_by_pk(id: $id) {
      bio
      created_at
      id
      name
      updated_at
      books_authors_aggregate {
        aggregate {
          count
        }
      }
      books_authors(where: { book: { is_deleted: { _eq: false } } }) {
        book {
          image
          no_of_pages
          quantity
          title
          updated_at
          volume
          isbn
        }
      }
    }
  }
`;
