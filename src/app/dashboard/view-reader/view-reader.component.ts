import { Component, OnInit } from '@angular/core';
import { Reader, Book } from '../interfaces';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/firebase.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-reader',
  templateUrl: './view-reader.component.html',
  styleUrls: ['./view-reader.component.scss'],
})
export class ViewReaderComponent implements OnInit {
  readerId: string;
  reader: Reader;
  books = [];
  all_books = [];

  constructor(
    private route: ActivatedRoute,
    private fireService: FirebaseService
  ) {
    this.route.paramMap.subscribe((param) => {
      this.readerId = param.get('id');
      this.getReader();
    });
  }

  ngOnInit() {}

  getReader() {
    this.fireService.getReader(this.readerId).subscribe((res) => {
      this.reader = res.payload.data() as Reader;
      this.reader['id'] = this.readerId;
      this.getBooks();
    });
  }

  getBooks() {
    this.fireService
      .getBooks()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      )
      .subscribe((result) => {
        this.all_books = result;
        this.books = this.reader.books_borrowed.map((log) => {
          return {
            ...this.all_books.find((book) => book.id == log.book_id),
            borrow_date: log.borrow_date,
            return_date: log.return_date,
          };
        });
      });
  }

  returnBook(id) {
    const readerLogIndex = this.reader.books_borrowed.findIndex(
      (log) => log.book_id == id && log.return_date == null
    );
    const book_log = this.reader.books_borrowed[readerLogIndex];
    book_log.return_date = new Date().toDateString();
    const book = this.all_books.find((book) => book.id == id) as Book;
    book.is_borrowed = false;
    const bookLogIndex = book.logs.findIndex(
      (log) => log.reader_id === this.readerId && log.return_date == null
    );
    book.logs[bookLogIndex] = book_log;
    this.reader.books_borrowed[readerLogIndex] = book_log;
    this.fireService.updateBookLog(book, this.reader).then((result) => {
      this.getReader();
    });
  }
}
