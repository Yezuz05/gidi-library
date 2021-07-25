import { Component, OnInit, Inject } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Reader, Book, Student } from './interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentsService } from '../services/students.service';
import { ApolloQueryResult } from '@apollo/client/core';
import { cloneDeep } from '@apollo/client/utilities';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-lend-book',
  template: `
    <h2 mat-dialog-title>Lend Book</h2>
    <mat-dialog-content class="mat-typography">
      <mat-form-field class="field" *ngIf="readers.length > 0">
        <input
          type="text"
          placeholder="Select Student"
          matInput
          [formControl]="readerControl"
          [matAutocomplete]="auto"
        />
        <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn">
          <mat-option
            *ngFor="let reader of filteredReaders | async"
            [value]="reader"
          >
            {{ reader.first_name }} {{ reader.last_name }}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button color="warn" mat-dialog-close>CANCEL</button>
      <button mat-button cdkFocusInitial (click)="lendBook()">LEND</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .field {
        width: 100%;
      }
    `,
  ],
})
export class LendBookComponent implements OnInit {
  readers = [];
  isFetchingReaders: boolean;
  readerControl = this.fb.control(null);
  filteredReaders: Observable<any[]>;

  constructor(
    private fireService: FirebaseService,
    private studentsService: StudentsService,
    private booksService: BooksService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LendBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getReaders();
    this.filteredReaders = this.readerControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value))
    );
  }

  displayFn(reader): string | undefined {
    return reader ? `${reader.first_name} ${reader.last_name}` : undefined;
  }

  async lendBook() {
    const reader: Reader = this.readerControl.value;
    const book: Book = this.data.book;
    const data = {
      student_id: reader.id,
      book_id: book.id,
    };
    try {
      await this.booksService.lendBook(data).toPromise();
      await this.booksService
        .updateBook({
          id: book.id,
          set: { borrowed_quantity: book.borrowed_quantity + 1 },
        })
        .toPromise();
      this.dialogRef.close(true);
    } catch (e) {
      this.dialogRef.close(true);
      console.log({ e });
    }
  }

  getReaders() {
    this.isFetchingReaders = true;
    this.studentsService
      .getStudents()
      .subscribe((res: ApolloQueryResult<{ students: Student[] }>) => {
        this.readers = cloneDeep(res.data.students);
        this.isFetchingReaders = false;
      });
  }

  private filter(value: string) {
    return this.readers.filter(
      (reader) =>
        new RegExp(value.trim(), 'i').test(reader.first_name) ||
        new RegExp(value.trim(), 'i').test(reader.last_name)
    );
  }
}
