import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/firebase.service';
import { finalize } from 'rxjs/operators';
import { StudentsService } from 'src/app/services/students.service';
import { ApolloQueryResult } from '@apollo/client/core';
import { Student } from '../interfaces';

@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styleUrls: ['./add-reader.component.scss'],
})
export class AddReaderComponent implements OnInit {
  readerForm = this.fb.group({
    first_name: [null, Validators.required],
    last_name: [null, Validators.required],
    matric_number: [null, Validators.required],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    home_address: [null, Validators.required],
    telephone: [null, Validators.required],
    hostel_address: [null, Validators.required],
    profile_picture: [null],
  });
  fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
  isUploadingFile = false;
  readerId: string;
  reader: null;
  isSavingStudent = false;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private fireService: FirebaseService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.readerId = params.get('id');
      this.getReader();
    });
  }

  upload(event) {
    const image_file: File = event.target.files[0];
    if (this.fileTypes.includes(image_file.type)) {
      this.isUploadingFile = true;
      const filePath = `${image_file.name}-${new Date().toISOString()}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, image_file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.readerForm.patchValue({ profile_picture: url });
              this.isUploadingFile = false;
            });
          })
        )
        .subscribe();
    } else {
      this.snackBar.open('Upload image of type PNG, JPEG or GIF', '', {
        duration: 2500,
        verticalPosition: 'top',
      });
    }
  }

  submit() {
    const form = { ...this.readerForm.value };
    this.readerId ? this.updateReader(form) : this.addReader(form);
  }

  async addReader(form) {
    this.isSavingStudent = true;
    try {
      await this.studentsService.addStudent(form).toPromise();
      this.router.navigate(['../'], { relativeTo: this.route });
      this.isSavingStudent = false;
    } catch (e) {
      this.isSavingStudent = false;
      console.log({ e });
      this.snackBar.open(`An error occured while adding student`, '', {
        duration: 2500,
        verticalPosition: 'top',
        panelClass: ['error', 'notification'],
      });
    }
  }

  async updateReader(form) {
    this.isSavingStudent = true;
    try {
      await this.studentsService
        .updateStudent({
          id: this.readerId,
          set: { ...form },
        })
        .toPromise();
      this.isSavingStudent = false;
      this.router.navigate(['../../'], { relativeTo: this.route });
    } catch (e) {
      console.log({ e });
      this.isSavingStudent = false;
      this.snackBar.open(`An error occured while adding student`, '', {
        duration: 2500,
        verticalPosition: 'top',
        panelClass: ['error', 'notification'],
      });
    }
  }

  getReader() {
    if (this.readerId) {
      this.studentsService
        .getStudentById(this.readerId)
        .subscribe((res: ApolloQueryResult<{ students_by_pk: Student[] }>) => {
          this.readerForm.patchValue(res.data.students_by_pk);
        });
    }
  }
}
