import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) { }

  login(user) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
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

  filter(value) {
    return this.afs.collection('books', ref => ref.where('is_borrowed', '==', value)).snapshotChanges();
  }
}
