import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Reader, Book } from './dashboard/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) { }

  login(user) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  getBooks() {
    return this.afs.collection('books').snapshotChanges();
  }

  addBook(book) {
    return this.afs.collection('books').add(book);
  }

  getBook(id) {
    return this.afs.doc(`books/${id}`).snapshotChanges()
  }

  updateBook(book, id) {
    return this.afs.doc(`books/${id}`).update(book)
  }

  delete(path) {
    return this.afs.doc(path).delete();
  }

  filterBooks(value) {
    return this.afs.collection('books', ref => ref.where('is_borrowed', '==', value)).snapshotChanges();
  }

  getReaders() {
    return this.afs.collection('readers').snapshotChanges();
  }

  addReader(reader) {
    return this.afs.collection('readers').add(reader);
  }

  getReader(id) {
    return this.afs.doc(`readers/${id}`).snapshotChanges()
  }

  updateReader(reader, id) {
    return this.afs.doc(`readers/${id}`).update(reader)
  }

  updateBookLog(book: Book, reader: Reader) {
    const book_id = book.id;
    const reader_id = reader.id;
    delete book.id;
    delete reader.id;
    return Promise.all([
      this.afs.doc(`readers/${reader_id}`).update(reader),
      this.afs.doc(`books/${book_id}`).update(book),
    ])
  }
}
