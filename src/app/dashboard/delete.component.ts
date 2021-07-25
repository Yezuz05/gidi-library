import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from '../firebase.service';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-delete',
  template: `
    <h2 mat-dialog-title>Delete</h2>
    <mat-dialog-content class="mat-typography">
      <h3>
        Are you sure you want to delete this
        {{ data.type | titlecase }} ?
      </h3>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button cdkFocusInitial (click)="delete()">Delete</button>
    </mat-dialog-actions>
  `,
  styles: [],
})
export class DeleteComponent implements OnInit {
  types = ['book', 'student'];

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private booksService: BooksService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  async delete() {
    switch (this.data.type) {
      case 'book':
        try {
          await this.booksService
            .updateBook({
              id: this.data.id,
              set: { is_deleted: true },
            })
            .toPromise();
          this.dialogRef.close(true);
        } catch (err) {
          console.log({ err });
          this.dialogRef.close();
          this.snackBar.open(
            `An error occurred while deleting ${this.data.type}`,
            '',
            {
              duration: 2500,
              verticalPosition: 'top',
              panelClass: ['error', 'notification'],
            }
          );
        }
        break;
      default:
        break;
    }
  }
}
