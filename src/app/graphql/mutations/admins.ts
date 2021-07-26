import { gql } from 'apollo-angular';

export const updateAdminMutation = gql`
  mutation updateAdminMutation($id: Int!, $set: users_set_input) {
    update_users_by_pk(pk_columns: { id: $id }, _set: $set) {
      id
      email
    }
  }
`;
