import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/firebase.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styleUrls: ['./add-reader.component.scss']
})
export class AddReaderComponent implements OnInit {

  readerForm = this.fb.group({
    name: [null, Validators.required],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    address: [null, Validators.required],
    image_url: [null, Validators.required]
  });
  fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
  isUploadingFile = false;
  readerId: string;

  constructor(private fb: FormBuilder,
    private storage: AngularFireStorage,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private fireService: FirebaseService) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      this.readerId = params.get('id');
      this.getReader();
    })
  }

  upload(event) {
    const image_file: File = event.target.files[0];
    if (this.fileTypes.includes(image_file.type)) {
      this.isUploadingFile = true;
      const filePath = `${image_file.name}-${new Date().toISOString()}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, image_file);
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL()
            .subscribe(url => {
              this.readerForm.patchValue({ image_url: url })
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
    const form = this.readerForm.value;
    this.readerId ? this.updateReader(form) : this.addReader(form);
  }

  addReader(form) {
    this.fireService.addReader({...form, books_borrowed: []})
      .then(res => {
        this.router.navigate(['../'], { relativeTo: this.route })
      })
      .catch(err => {
        this.snackBar.open(err.message, '', {
          duration: 2500,
          verticalPosition: 'top'
        });
      })
  }

  updateReader(form) {
    this.fireService.updateReader(form, this.readerId)
    .then((res) =>{
      this.router.navigate(['../../'], { relativeTo: this.route });
    })
    .catch(err => {
      this.snackBar.open(err.message, '', {
        duration: 2500,
        verticalPosition: 'top'
      });
    })
  }

  getReader() {
    if (this.readerId) {
      this.fireService.getReader(this.readerId)
        .subscribe(res => {  
          this.readerForm.patchValue(res.payload.data());
        })
    }
  }

}
