import { Component, OnInit, Inject } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Reader, Book } from './interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-lend-book',
  template: `
    <h2 mat-dialog-title>Lend Book</h2>
    <mat-dialog-content class="mat-typography">
      <mat-form-field class="field" *ngIf="readers.length > 0">
        <input type="text" placeholder="Select Reader" matInput [formControl]="readerControl" [matAutocomplete]="auto">
        <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn">
          <mat-option *ngFor="let reader of filteredReaders | async" [value]="reader">
            {{ reader.name }}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button color="warn" mat-dialog-close>CANCEL</button>
      <button mat-button cdkFocusInitial (click)="lendBook()">LEND</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .field {
      width: 100%;
    }
  `]
})
export class LendBookComponent implements OnInit {

  readers = [];
  isFetchingReaders: boolean;
  readerControl = this.fb.control(null);
  filteredReaders: Observable<any[]>;

  constructor(private fireService: FirebaseService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<LendBookComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getReaders();
    this.filteredReaders = this.readerControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  displayFn(reader): string | undefined {
    return reader ? reader.name : undefined;
  }

  lendBook() {
    const reader: Reader = this.readerControl.value;
    const book: Book = this.data.book;
    book.is_borrowed = true;
    book.logs.push({book_id: book.id, borrow_date: new Date().toDateString(), reader_id: reader.id, return_date: null});
    reader.books_borrowed.push({book_id: book.id, borrow_date: new Date().toDateString(), reader_id: reader.id, return_date: null});
    this.fireService.lendBook(book, reader)
      .then(result =>{
        this.dialogRef.close(true);
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      })
  }

  getReaders() {
    this.isFetchingReaders = true;
    this.fireService.getReaders().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
      ).subscribe(result =>{
        this.readers = result;
        this.isFetchingReaders = false;
      })
  }

  private filter(value: string) {
    return this.readers.filter(reader => new RegExp(value, 'i').test(reader.name));
  }

}
