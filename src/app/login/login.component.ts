import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.required],
  });
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  submit() {
    this.isSubmitting = true;
    const form = this.loginForm.value;
    this.authService
      .login(form)
      .toPromise()
      .then((res) => {
        this.isSubmitting = false;
        this.authService.setUser({ ...res });
        this.router.navigate(['/dashboard/books']);
      })
      .catch((err) => {
        this.isSubmitting = false;
        this.snackBar.open(err.message, '', {
          duration: 2000,
          verticalPosition: 'top',
        });
      });
  }
}
