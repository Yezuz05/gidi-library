import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
  adminForm = this.fb.group({
    name: [null, Validators.required],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.required],
  });
  isSavingAdmin = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  submit() {
    this.isSavingAdmin = true;
    const data = this.adminForm.value;
    this.authService.createUser({ ...data }).subscribe(
      (res) => {
        this.isSavingAdmin = false;
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      (error) => {
        this.isSavingAdmin = false;
        this.snackBar.open(
          'An error occurred while adding admin, try again',
          '',
          {
            duration: 2500,
            verticalPosition: 'top',
            panelClass: ['error', 'notification'],
          }
        );
      }
    );
  }
}
