import { gql } from 'apollo-angular';

export const addAuthorMutation = gql`
  mutation addAuthorMutation($object: authors_insert_input!) {
    insert_authors_one(object: $object) {
      id
      name
      updated_at
      created_at
      bio
    }
  }
`;

export const updateAuthorMutation = gql`
  mutation updateAuthorMutation($id: Int!, $set: authors_set_input) {
    update_authors_by_pk(pk_columns: { id: $id }, _set: $set) {
      id
      name
      updated_at
      created_at
      bio
    }
  }
`;
