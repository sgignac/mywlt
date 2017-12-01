import { NgModule } from '@angular/core';
import { 
  MatButtonModule,
  MatCardModule,
  MatTabsModule,
  MatToolbarModule,
  MatIconModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatSidenavModule,
  MatListModule,
  MatChipsModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatChipsModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatChipsModule
  ]
})
export class MaterialModule { }
