import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  searchControl = this.fb.control(null);
  filterControl = this.fb.control('all');

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
