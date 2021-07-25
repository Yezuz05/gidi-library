import { gql } from 'apollo-angular';

export const addBookMutation = gql`
  mutation addBookMutation($object: books_insert_input!) {
    insert_books_one(object: $object) {
      id
      is_journal
      isbn
      no_of_pages
      quantity
      title
      volume
      books_authors {
        author {
          bio
          id
          name
        }
      }
    }
  }
`;

export const updateBookMutation = gql`
  mutation updateBookMutation($id: Int!, $set: books_set_input) {
    update_books_by_pk(pk_columns: { id: $id }, _set: $set) {
      id
      is_journal
      isbn
      no_of_pages
      quantity
      title
      volume
      books_authors {
        author {
          bio
          id
          name
        }
      }
    }
  }
`;

export const addBookAuthorMutation = gql`
  mutation addBookAuthorMutation($objects: [books_authors_insert_input!]!) {
    insert_books_authors(objects: $objects) {
      returning {
        author_id
        book_id
      }
    }
  }
`;

export const deleteBookAuthorMutation = gql`
  mutation deleteBookAuthorMutation($bookId: Int!, $authorIds: [Int!]!) {
    delete_books_authors(
      where: {
        _and: { book_id: { _eq: $bookId }, author_id: { _in: $authorIds } }
      }
    ) {
      returning {
        author_id
      }
    }
  }
`;
