import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/firebase.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-readers-list',
  templateUrl: './readers-list.component.html',
  styleUrls: ['./readers-list.component.scss']
})
export class ReadersListComponent implements OnInit {

  searchControl= this.fb.control(null);
  readersSource = [];
  readers = [];

  constructor(private fb: FormBuilder,
              private fireService: FirebaseService) { }

  ngOnInit() {
    this.getReaders();
  }

  getReaders() {
    this.fireService.getReaders().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
      ).subscribe(result =>{
        this.readersSource = result;
        this.readers = this.readersSource;
      })
  }

}
