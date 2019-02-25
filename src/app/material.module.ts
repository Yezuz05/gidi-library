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
         MatDividerModule} from '@angular/material';

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
    MatDividerModule
  ]
})
export class MaterialModule { }
