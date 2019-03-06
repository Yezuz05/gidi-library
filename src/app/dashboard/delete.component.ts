import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-delete',
  template: `
  <h2 mat-dialog-title>Delete</h2>
  <mat-dialog-content class="mat-typography">
    <h3>Are you sure you want to delete this {{ types[data.type] | titlecase }} ?</h3>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-button cdkFocusInitial (click)="delete()">Delete</button>
  </mat-dialog-actions>
  `,
  styles: []
})
export class DeleteComponent implements OnInit {

  types = ['book', 'reader']

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fireService: FirebaseService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  delete() {
    this.fireService.delete(`${this.types[this.data.type]}s/${this.data.id}`)
    .then((res) => {
    })
    .catch(err => {
      this.snackBar.open(err.message, '', {
        duration: 2500,
        verticalPosition: 'top'
      });
    })
    this.dialogRef.close();
  }

}
