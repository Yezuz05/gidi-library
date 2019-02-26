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
    this.afs
  }

  addBook(book) {
    return this.afs.collection('books').add(book);
  }
}
