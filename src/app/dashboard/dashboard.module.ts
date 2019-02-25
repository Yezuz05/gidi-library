import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material.module';
import { AddBookComponent } from './add-book/add-book.component';
import { BooksListComponent } from './books-list/books-list.component';

@NgModule({
  declarations: [DashboardComponent, AddBookComponent, BooksListComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
