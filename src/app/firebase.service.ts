import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Book } from './dashboard/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) { }

  login(user) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
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
}
