import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styleUrls: ['./add-reader.component.scss']
})
export class AddReaderComponent implements OnInit {

  readerForm = this.fb.group({
    name: [null, Validators.required],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    address: [null, Validators.required]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
