import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Book } from '../interfaces';
// import { Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete.component';
// import { FirebaseService } from 'src/app/firebase.service';
import { LendBookComponent } from '../lend-book.component';
import { BooksService } from 'src/app/services/books.service';
import { ApolloQueryResult } from '@apollo/client/core';
import { cloneDeep } from '@apollo/client/utilities';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  searchControl = this.fb.control(null);
  filterControl = this.fb.control('all');
  books: Book[];
  isFetchingBooks = false;
  booksSource = [];

  constructor(
    private fb: FormBuilder,
    private booksService: BooksService,
    public dialog: MatDialog
  ) {
    this.getBooks();
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(debounceTime(600))
      .subscribe((searchTerm) => {
        this.searchBooks(searchTerm);
      });
  }

  getBooks() {
    this.isFetchingBooks = true;
    this.booksService
      .getBooks()
      .subscribe((res: ApolloQueryResult<{ books: Book[] }>) => {
        this.isFetchingBooks = false;
        this.booksSource = res.data.books.map((book) => {
          return {
            ...book,
            books_authors: book.books_authors
              .map((book_author) => book_author.author.name)
              .join(', '),
          };
        });
        this.displayBooks();
      });
  }

  deleteBook(id) {
    const deleteDialogRef = this.dialog.open(DeleteComponent, {
      data: { id, type: 'book' },
    });
    deleteDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getBooks();
      }
    });
  }

  lend(book) {
    const lendDialogRef = this.dialog.open(LendBookComponent, {
      data: { book },
      minWidth: 300,
    });
    lendDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getBooks();
        // this.selectChange(this.filterControl.value);
      }
    });
  }

  // selectChange(event) {
  //   switch (event) {
  //     case 'all':
  //       this.getBooks();
  //       break;
  //     case 'borrowed':
  //       this.getBooksBy(true);
  //       break;
  //     case 'available':
  //       this.getBooksBy(false);
  //       break;
  //     default:
  //       break;
  //   }
  // }

  // getBooksBy(borrow_state) {
  //   this.fireService
  //     .filterBooks(borrow_state)
  //     .pipe(
  //       map((actions) =>
  //         actions.map((a) => {
  //           const data = a.payload.doc.data() as Book;
  //           const id = a.payload.doc.id;
  //           return { id, ...data };
  //         })
  //       )
  //     )
  //     .subscribe((result) => {
  //       this.displayBooks();
  //     });
  // }

  searchBooks(searchTerm) {
    this.books = this.booksSource.filter((book) =>
      new RegExp(searchTerm.trim(), 'i').test(book.title)
    );
  }

  displayBooks() {
    if (this.searchControl.value) {
      this.searchBooks(this.searchControl.value);
    } else {
      this.books = cloneDeep(this.booksSource);
    }
  }
}
