import { gql } from 'apollo-angular';

export const addStudentMutation = gql`
  mutation addStudentMutation($object: students_insert_input!) {
    insert_students_one(object: $object) {
      created_at
      email
      first_name
      home_address
      hostel_address
      id
      last_name
      matric_number
      profile_picture
      updated_at
    }
  }
`;

export const updateStudentMutation = gql`
  mutation updateStudentMutation($id: Int!, $set: students_set_input) {
    update_students_by_pk(pk_columns: { id: $id }, _set: $set) {
      created_at
      email
      first_name
      home_address
      hostel_address
      id
      last_name
      matric_number
      profile_picture
      updated_at
    }
  }
`;
