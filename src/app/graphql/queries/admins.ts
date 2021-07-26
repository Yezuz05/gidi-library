import { gql } from 'apollo-angular';

export const adminsQuery = gql`
  query adminsQuery {
    users(
      where: { is_deleted: { _eq: false } }
      order_by: { created_at: asc }
    ) {
      email
      id
      name
      updated_at
      created_at
    }
  }
`;
