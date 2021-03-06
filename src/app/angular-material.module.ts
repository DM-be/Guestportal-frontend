import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
   MatButtonModule,
   MatToolbarModule,
   MatIconModule,
   MatBadgeModule,
   MatSidenavModule,
   MatListModule,
   MatGridListModule,
   MatFormFieldModule,
   MatInputModule,
   MatSelectModule,
   MatRadioModule,
   MatDatepickerModule,
   MatNativeDateModule,
   MatChipsModule,
   MatTooltipModule,
   MatTableModule,
   MatPaginatorModule,
   MatMenuModule,
   MatAutocomplete,
   MatAutocompleteModule,
   MatStepperModule,
   MatSnackBar,
   MatSnackBarModule,
   MatCardModule,
   MatCheckboxModule,
   MatDialogModule
} from '@angular/material';

@NgModule({
   imports: [
      CommonModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatBadgeModule,
      MatListModule,
      MatGridListModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatChipsModule,
      MatTooltipModule,
      MatTableModule,
      MatPaginatorModule,
      MatMenuModule,
      MatAutocompleteModule,
      MatStepperModule,
      MatSnackBarModule,
      MatCardModule,
      MatCheckboxModule,
      MatDialogModule
      
   ],
   exports: [
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatBadgeModule,
      MatListModule,
      MatGridListModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatChipsModule,
      MatTooltipModule,
      MatTableModule,
      MatPaginatorModule,
      MatMenuModule,
      MatAutocompleteModule,
      MatStepperModule,
      MatSnackBarModule,
      MatCardModule,
      MatCheckboxModule,
      MatDialogModule
   ],
   providers: [
      MatDatepickerModule,
   ]
})

export class AngularMaterialModule { }