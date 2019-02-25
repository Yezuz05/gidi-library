import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { BooksListComponent } from './books-list/books-list.component';
import { AddBookComponent } from './add-book/add-book.component';

const dashboardRoutes: Routes = [
  { path: 'dashboard',  component: DashboardComponent,
     children: [
        {path: '', redirectTo: 'books', pathMatch: 'full'},
        {path: 'books', component: BooksListComponent},
        {path: 'books/add-book', component: AddBookComponent},
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