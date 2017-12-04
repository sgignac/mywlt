import { NgModule } from '@angular/core';
import { 
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class MaterialModule { }
