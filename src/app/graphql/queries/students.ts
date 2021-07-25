import { gql } from 'apollo-angular';

export const StudentsQuery = gql`
  query StudentsQuery($where: students_bool_exp) {
    students(where: $where, order_by: { created_at: asc }) {
      updated_at
      profile_picture
      matric_number
      last_name
      id
      hostel_address
      home_address
      first_name
      email
      created_at
    }
  }
`;

export const StudentQuery = gql`
  query StudentQuery($id: Int!) {
    students_by_pk(id: $id) {
      created_at
      email
      first_name
      home_address
      hostel_address
      id
      last_name
      matric_number
      profile_picture
      telephone
      updated_at
      borrow_logs(
        order_by: { created_at: asc }
        where: { book: { is_deleted: { _eq: false } } }
      ) {
        id
        book_id
        return_date
        borrow_date
        created_at
        updated_at
        book {
          image
          id
          title
          quantity
          no_of_pages
        }
      }
    }
  }
`;
