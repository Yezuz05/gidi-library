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

@NgModule({
  declarations: [DashboardComponent, AddBookComponent, BooksListComponent, ReadersListComponent, AddReaderComponent, DeleteComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents: [DeleteComponent]
})
export class DashboardModule { }
