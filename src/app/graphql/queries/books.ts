import { gql } from 'apollo-angular';

export const BooksQuery = gql`
  query BooksQuery($where: books_bool_exp) {
    books(where: $where, order_by: { created_at: asc }) {
      created_at
      id
      is_journal
      isbn
      quantity
      title
      updated_at
      volume
      image
      no_of_pages
      description
      books_authors {
        author {
          name
          id
          bio
        }
      }
    }
  }
`;

export const BookQuery = gql`
  query BookQuery($id: Int!) {
    books_by_pk(id: $id) {
      created_at
      id
      is_journal
      isbn
      quantity
      title
      updated_at
      volume
      image
      no_of_pages
      description
      books_authors {
        author_id
        author {
          name
          id
          bio
        }
      }
    }
  }
`;
