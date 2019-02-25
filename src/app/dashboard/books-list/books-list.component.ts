import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Book } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  searchControl = this.fb.control(null);
  filterControl = this.fb.control('all');
  private booksCollection: AngularFirestoreCollection<Book>;
  books: Observable<Book[]>;

  constructor(private fb: FormBuilder,
              private afs: AngularFirestore) {
                this.booksCollection = afs.collection<Book>('books');
                this.books = this.booksCollection
                              .snapshotChanges().pipe(
                                map(actions => actions.map(a => {
                                  const data = a.payload.doc.data() as Book;
                                  const id = a.payload.doc.id;
                                  return { id, ...data};
                                }))
                              )
              }

  ngOnInit() {
  }

}
