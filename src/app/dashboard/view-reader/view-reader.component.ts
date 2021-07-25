import { Component, OnInit } from '@angular/core';
import { Reader, Book, Student } from '../interfaces';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/firebase.service';
import { map } from 'rxjs/operators';
import { StudentsService } from 'src/app/services/students.service';
import { ApolloQueryResult } from '@apollo/client/core';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-view-reader',
  templateUrl: './view-reader.component.html',
  styleUrls: ['./view-reader.component.scss'],
})
export class ViewReaderComponent implements OnInit {
  readerId: string;
  reader: Student;
  books = [];

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private studentService: StudentsService
  ) {
    this.route.paramMap.subscribe((param) => {
      this.readerId = param.get('id');
      this.getReader();
    });
  }

  ngOnInit() {}

  getReader() {
    this.studentService
      .getStudentById(this.readerId)
      .subscribe((res: ApolloQueryResult<{ students_by_pk: Student }>) => {
        this.reader = res.data.students_by_pk;
      });
  }

  async returnBook({ logId, book }) {
    try {
      await this.booksService
        .returnBook({
          id: logId,
          set: { return_date: new Date().toISOString() },
        })
        .toPromise();
      await this.booksService
        .updateBook({
          id: book.id,
          set: { borrowed_quantity: book.borrowed_quantity - 1 },
        })
        .toPromise();
      this.getReader();
    } catch (e) {
      console.error({ e });
    }
  }
}
