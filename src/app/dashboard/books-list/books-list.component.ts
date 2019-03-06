import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Book } from '../interfaces';
import { Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { DeleteComponent } from '../delete.component';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  searchControl = this.fb.control(null);
  filterControl = this.fb.control('all');
  books;
  booksSource = [];

  constructor(private fb: FormBuilder,
              private afs: AngularFirestore,
              private fireService: FirebaseService,
              public dialog: MatDialog) {
                this.getBooks();
              }

  ngOnInit() {
    this.searchControl.valueChanges.pipe(debounceTime(600)).subscribe((searchTerm) => {
      this.searchBooks(searchTerm);
    })
  }

  getBooks() {
    this.fireService.getBooks().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Book;
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
      ).subscribe(result =>{
        this.displayBooks(result);
      })
  }

  deleteBook(id) {
    this.dialog.open(DeleteComponent, {
      data: {id, type: 0}
    });
  }

  selectChange(event) {
    switch (event) {
      case 'all':
        this.getBooks()
        break;
      case 'borrowed':
        this.getBooksBy(true)
        break;
      case 'available':
        this.getBooksBy(false);
        break;
      default:
        break;
    }
  }

  getBooksBy(borrow_state) {
    this.fireService.filter(borrow_state)
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Book;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
    .subscribe(result =>{
      this.displayBooks(result);
    })
  }

  searchBooks(searchTerm) {
    this.books = this.booksSource.filter(book => new RegExp(searchTerm.trim(), 'i').test(book.name));
  }

  displayBooks(result) {
    this.booksSource = result;
    if (this.searchControl.value) {
      this.searchBooks(this.searchControl.value);
    } else {
      this.books = result;
    }
  }

}
