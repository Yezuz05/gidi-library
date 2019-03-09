import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule,
         MatFormFieldModule,
         MatInputModule,
         MatButtonModule,
         MatIconModule,
         MatSidenavModule ,
         MatToolbarModule,
         MatListModule,
         MatDividerModule,
         MatSelectModule,
         MatSnackBarModule,
         MatProgressBarModule,
         MatDialogModule,
         MatAutocompleteModule} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDialogModule,
    MatAutocompleteModule
  ]
})
export class MaterialModule { }
