import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/firebase.service';
import { map, debounceTime } from 'rxjs/operators';
import { DeleteComponent } from '../delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-readers-list',
  templateUrl: './readers-list.component.html',
  styleUrls: ['./readers-list.component.scss'],
})
export class ReadersListComponent implements OnInit {
  searchControl = this.fb.control(null);
  readersSource = [];
  readers = [];

  constructor(
    private fb: FormBuilder,
    private fireService: FirebaseService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getReaders();
    this.searchControl.valueChanges
      .pipe(debounceTime(600))
      .subscribe((searchTerm) => {
        this.searchReaders(searchTerm);
      });
  }

  getReaders() {
    this.fireService
      .getReaders()
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
        this.readersSource = result;
        this.readers = this.readersSource;
      });
  }

  searchReaders(searchTerm) {
    this.readers = this.readersSource.filter((reader) =>
      new RegExp(searchTerm.trim(), 'i').test(reader.name)
    );
  }

  deleteReader(id) {
    this.dialog.open(DeleteComponent, {
      data: { id, type: 1 },
    });
  }
}
