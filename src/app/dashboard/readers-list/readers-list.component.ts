import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-readers-list',
  templateUrl: './readers-list.component.html',
  styleUrls: ['./readers-list.component.scss']
})
export class ReadersListComponent implements OnInit {

  searchControl= this.fb.control(null);

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
