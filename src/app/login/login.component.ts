import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  })

  constructor(private fb: FormBuilder,
              private fireService: FirebaseService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  submit() {
    const form = this.loginForm.value;
    this.fireService.login(form)
      .then((res) => {
        this.router.navigate(['/dashboard/books']);
      })
      .catch((err) =>{
        this.snackBar.open(err.message, '', {
          duration: 2000,
          verticalPosition: 'top'
        });
      })
  }

}
