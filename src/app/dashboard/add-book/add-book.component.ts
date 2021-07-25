import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { finalize, map, startWith } from 'rxjs/operators';
import { FirebaseService } from 'src/app/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorsService } from 'src/app/services/authors.service';
import { ApolloQueryResult } from '@apollo/client/core';
import { cloneDeep } from '@apollo/client/utilities';
import { BooksService } from 'src/app/services/books.service';
import { Book } from '../interfaces';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  bookForm = this.fb.group({
    title: [null, Validators.required],
    author: [[], Validators.required],
    isbn: [null, Validators.required],
    no_of_pages: [null, Validators.required],
    quantity: [null, Validators.required],
    description: [null],
    image: [null, Validators.required],
  });
  fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
  isUploadingFile = false;
  bookId: string;
  book = null;
  authors = [];
  isSavingBook = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private authorsService: AuthorsService,
    private booksService: BooksService,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.getAuthors();
    this.route.paramMap.subscribe((params) => {
      this.bookId = params.get('id');
      this.getBook();
    });
  }

  getAuthors() {
    this.authorsService
      .getAuthors()
      .then((res: ApolloQueryResult<{ authors: any[] }>) => {
        this.authors = cloneDeep(res.data.authors);
      });
  }

  async upload(event) {
    const image_file: File = event.target.files[0];
    if (this.fileTypes.includes(image_file.type)) {
      const base64Url = await this.appService.blobToData(image_file);
      this.bookForm.patchValue({ image: base64Url });
    } else {
      this.snackBar.open('Upload image of type PNG, JPEG or GIF', '', {
        duration: 2500,
        verticalPosition: 'top',
      });
    }
  }

  submit() {
    const form = this.bookForm.value;
    this.bookId ? this.updateBook(form) : this.addBook(form);
  }

  async addBook(form) {
    this.isSavingBook = true;
    const { title, isbn, description, no_of_pages, image, author, quantity } =
      form;
    const data = {
      title,
      isbn,
      description,
      no_of_pages,
      image,
      quantity,
      books_authors: { data: author.map((author_id) => ({ author_id })) },
    };
    try {
      await this.booksService.addBook(data).toPromise();
      this.router.navigate(['../'], { relativeTo: this.route });
      this.isSavingBook = false;
    } catch (e) {
      console.log({ e });
      this.isSavingBook = false;
      this.snackBar.open('An error occurred while adding book, try again', '', {
        duration: 2500,
        verticalPosition: 'top',
        panelClass: ['error', 'notification'],
      });
    }
  }

  async updateBook(form) {
    const { title, isbn, description, no_of_pages, image, quantity, author } =
      form;
    const savedAuthorIds = this.book.books_authors.map(
      (books_author) => books_author.author.id
    );
    const newAuthors = author.filter(
      (authorId) => !savedAuthorIds.includes(authorId)
    );
    const removedAuthors = savedAuthorIds.filter(
      (authorId) => !author.includes(authorId)
    );
    const newAuthorsData = newAuthors.map((id) => ({
      book_id: this.bookId,
      author_id: id,
    }));
    this.isSavingBook = true;
    try {
      await this.booksService
        .updateBook({
          id: this.bookId,
          set: {
            title,
            isbn,
            description,
            no_of_pages,
            image,
            quantity,
          },
        })
        .toPromise();
      await Promise.all([
        this.booksService.addBookAuthors(newAuthorsData).toPromise(),
        this.booksService
          .deleteBookAuthors({ bookId: this.bookId, authorIds: removedAuthors })
          .toPromise(),
      ]);
      this.isSavingBook = false;
      this.router.navigate(['../../'], { relativeTo: this.route });
    } catch (err) {
      console.log({ err });
      this.isSavingBook = false;
      this.snackBar.open(
        'An error occurred while updating book, try again',
        '',
        {
          duration: 2500,
          verticalPosition: 'top',
          panelClass: ['error', 'notification'],
        }
      );
    }
  }

  getBook() {
    if (this.bookId) {
      this.booksService
        .getBookById(this.bookId)
        .toPromise()
        .then((res: ApolloQueryResult<{ books_by_pk: Book }>) => {
          const book = res.data.books_by_pk;
          this.book = book;
          this.bookForm.patchValue(book);
          this.bookForm.patchValue({
            author: book.books_authors.map(
              (book_author) => book_author.author.id
            ),
          });
        });
    }
  }
}
