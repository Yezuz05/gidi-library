import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  bookForm = this.fb.group({
    name: [null, Validators.required],
    author: [null, Validators.required],
    isbn: [null, Validators.required],
    pages: [null, Validators.required],
    description: [null, Validators.required]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
