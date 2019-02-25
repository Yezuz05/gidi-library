import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { BooksListComponent } from './books-list/books-list.component';
import { AddBookComponent } from './add-book/add-book.component';
import { ReadersListComponent } from './readers-list/readers-list.component';
import { AddReaderComponent } from './add-reader/add-reader.component';

const dashboardRoutes: Routes = [
  { path: 'dashboard',  component: DashboardComponent,
     children: [
        {path: '', redirectTo: 'books', pathMatch: 'full'},
        {path: 'books', component: BooksListComponent},
        {path: 'books/add-book', component: AddBookComponent},
        {path: 'books/edit-book/:id', component: AddBookComponent},
        {path: 'readers', component: ReadersListComponent},
        {path: 'readers/add-reader', component: AddReaderComponent},
        {path: 'readers/edit-reader/:id', component: AddReaderComponent},
    ]
   },
];
 
@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }