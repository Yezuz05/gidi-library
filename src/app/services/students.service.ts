import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  addStudentMutation,
  updateStudentMutation,
} from '../graphql/mutations';
import { StudentQuery, StudentsQuery } from '../graphql/queries/students';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private apollo: Apollo) {}

  getStudents(where = {}) {
    return this.apollo.query({
      query: StudentsQuery,
      variables: { where: { ...where, is_deleted: { _eq: false } } },
      fetchPolicy: 'network-only',
    });
  }

  getStudentById(id: string | number) {
    return this.apollo.query({
      query: StudentQuery,
      variables: { id },
      fetchPolicy: 'network-only',
    });
  }

  addStudent(data) {
    return this.apollo.mutate({
      mutation: addStudentMutation,
      variables: { object: data },
    });
  }
  updateStudent({ id, set }) {
    return this.apollo.mutate({
      mutation: updateStudentMutation,
      variables: { id, set },
    });
  }
}
