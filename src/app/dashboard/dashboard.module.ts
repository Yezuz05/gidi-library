import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material.module';
import { AddBookComponent } from './add-book/add-book.component';
import { BooksListComponent } from './books-list/books-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReadersListComponent } from './readers-list/readers-list.component';
import { AddReaderComponent } from './add-reader/add-reader.component';
import { DeleteComponent } from './delete.component';
import { LendBookComponent } from './lend-book.component';
import { ViewReaderComponent } from './view-reader/view-reader.component';
import { MomentModule } from 'ngx-moment';
import { AuthorsListComponent } from './authors-list/authors-list.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { AdminsListComponent } from './admins-list/admins-list.component';
import { AddAdminComponent } from './add-admin/add-admin.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AddBookComponent,
    BooksListComponent,
    ReadersListComponent,
    AddReaderComponent,
    DeleteComponent,
    LendBookComponent,
    ViewReaderComponent,
    AuthorsListComponent,
    AddAuthorComponent,
    AdminsListComponent,
    AddAdminComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentModule,
  ],
  entryComponents: [DeleteComponent, LendBookComponent],
})
export class DashboardModule {}
