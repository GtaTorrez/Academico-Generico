import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { LayoutModule }       from '@angular/cdk/layout';
import {
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatDialogModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatTableModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatSortModule
}                             from '@angular/material';

import { MatMomentDateModule} from '@angular/material-moment-adapter'

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTableModule,
    MatExpansionModule
  ],
  exports: [
    LayoutModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTableModule,
    MatExpansionModule
  ]
})
export class MaterialModule { }
