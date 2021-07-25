import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApolloQueryResult } from '@apollo/client/core';
import { debounceTime } from 'rxjs/operators';
import { AuthorsService } from 'src/app/services/authors.service';
import { DeleteComponent } from '../delete.component';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss'],
})
export class AuthorsListComponent implements OnInit {
  authors = [];
  authorsSource = [];
  isFetchingAuthors = false;
  searchControl = this.fb.control(null);

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private authorsService: AuthorsService
  ) {}

  ngOnInit(): void {
    this.getAuthors();
    this.searchControl.valueChanges
      .pipe(debounceTime(600))
      .subscribe((searchTerm) => {
        this.searchAuthors(searchTerm);
      });
  }

  getAuthors() {
    this.isFetchingAuthors = true;
    this.authorsService
      .getAuthors()
      .then((res: ApolloQueryResult<{ authors: any[] }>) => {
        this.authorsSource = res.data.authors;
        this.searchAuthors('');
        this.isFetchingAuthors = false;
      });
  }

  searchAuthors(searchTerm: string) {
    this.authors = this.authorsSource.filter((author) =>
      new RegExp(searchTerm.trim(), 'i').test(author.name)
    );
  }

  deleteAuthor(id) {
    const deleteDialogRef = this.dialog.open(DeleteComponent, {
      data: { id, type: 'author' },
    });
    deleteDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAuthors();
      }
    });
  }
}
