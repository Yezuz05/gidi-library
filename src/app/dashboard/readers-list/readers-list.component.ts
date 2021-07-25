import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/firebase.service';
import { map, debounceTime } from 'rxjs/operators';
import { DeleteComponent } from '../delete.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentsService } from 'src/app/services/students.service';
import { ApolloQueryResult } from '@apollo/client/core';
import { Student } from '../interfaces';
import { cloneDeep } from '@apollo/client/utilities';

@Component({
  selector: 'app-readers-list',
  templateUrl: './readers-list.component.html',
  styleUrls: ['./readers-list.component.scss'],
})
export class ReadersListComponent implements OnInit {
  searchControl = this.fb.control(null);
  readersSource = [];
  readers = [];
  isFetchingStudents = false;

  constructor(
    private fb: FormBuilder,
    private fireService: FirebaseService,
    private studentsService: StudentsService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getReaders();
    this.searchControl.valueChanges
      .pipe(debounceTime(600))
      .subscribe((searchTerm) => {
        this.searchReaders(searchTerm);
      });
  }

  getReaders() {
    this.isFetchingStudents = true;
    this.studentsService
      .getStudents()
      .subscribe((res: ApolloQueryResult<{ students: Student[] }>) => {
        this.readersSource = cloneDeep(res.data.students);
        this.searchReaders('');
        this.isFetchingStudents = false;
      });
  }

  searchReaders(searchTerm) {
    this.readers = this.readersSource.filter(
      (reader) =>
        new RegExp(searchTerm.trim(), 'i').test(reader.first_name) ||
        new RegExp(searchTerm.trim(), 'i').test(reader.last_name)
    );
  }

  deleteReader(id) {
    const deleteDialogRef = this.dialog.open(DeleteComponent, {
      data: { id, type: 'student' },
    });
    deleteDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getReaders();
      }
    });
  }
}
