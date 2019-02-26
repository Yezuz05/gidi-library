import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FirebaseService } from 'src/app/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    description: [null, Validators.required],
    image_url: [null, Validators.required]
  });
  fileTypes = [ 'image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
  isUploadingFile = false;
  uploadProgress: Observable<number>;

  constructor(private fb: FormBuilder,
              private storage: AngularFireStorage,
              private snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute,
              private fireService: FirebaseService) { }

  ngOnInit() {
  }

  upload(event) {
    const image_file:File = event.target.files[0];
    if (this.fileTypes.includes(image_file.type)) {
      this.isUploadingFile = true;
      const filePath = `${image_file.name}-${new Date().toISOString()}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, image_file);
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL()
            .subscribe(url =>{
              this.bookForm.patchValue({image_url: url})
              this.isUploadingFile = false;
            })
        })
      )
      .subscribe()
    } else {
      this.snackBar.open('Upload image of type PNG, JPEG or GIF', '', {
        duration: 2500,
        verticalPosition: 'top'
      });
    }
  }

  submit() {
    const form = this.bookForm.value;
    this.fireService.addBook(form)
      .then(res => {
        this.router.navigate(['../'], {relativeTo: this.route})
      })
      .catch(err => {
        this.snackBar.open(err.message, '', {
          duration: 2500,
          verticalPosition: 'top'
        });
      })
  }

}
