import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss'],
})
export class AddAuthorComponent implements OnInit {
  authorId = null;
  author = null;
  authorForm = this.fb.group({
    name: [null, Validators.required],
    bio: [null],
  });
  isSavingAuthor = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authorsService: AuthorsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.authorId = params.get('id');
      if (this.authorId) {
        this.getAuthor();
      }
    });
  }

  getAuthor() {
    this.authorsService
      .getAuthorById(this.authorId)
      .subscribe((res: ApolloQueryResult<{ authors_by_pk: any }>) => {
        this.author = res.data.authors_by_pk;
        this.authorForm.patchValue({ ...this.author });
      });
  }

  submit() {
    const form = this.authorForm.value;
    this.authorId ? this.updateAuthor(form) : this.addAuthor(form);
  }

  async updateAuthor(form) {
    this.isSavingAuthor = true;
    try {
      await this.authorsService
        .updateAuthor({ id: this.authorId, set: { ...form } })
        .toPromise();
      this.isSavingAuthor = false;
      this.router.navigate(['../../'], { relativeTo: this.route });
    } catch (e) {
      console.log({ e });
      this.isSavingAuthor = false;
      this.snackBar.open(
        'An error occurred while updating author, try again',
        '',
        {
          duration: 2500,
          verticalPosition: 'top',
          panelClass: ['error', 'notification'],
        }
      );
    }
  }

  async addAuthor(form) {
    this.isSavingAuthor = true;
    try {
      await this.authorsService.addAuthor({ ...form }).toPromise();
      this.isSavingAuthor = false;
      this.router.navigate(['../'], { relativeTo: this.route });
    } catch (e) {
      console.log({ e });
      this.isSavingAuthor = false;
      this.snackBar.open(
        'An error occurred while adding author, try again',
        '',
        {
          duration: 2500,
          verticalPosition: 'top',
          panelClass: ['error', 'notification'],
        }
      );
    }
  }
}
