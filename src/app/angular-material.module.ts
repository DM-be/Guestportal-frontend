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
   MatProgressSpinnerModule,
   MatCardModule,
   MatStepperModule
} from '@angular/material';

@NgModule({
   imports: [
      CommonModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatProgressSpinnerModule,
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
      MatCardModule,
      MatTooltipModule,
      MatTableModule,
      MatPaginatorModule,
      MatMenuModule,
      MatAutocompleteModule,
      MatStepperModule
   ],
   exports: [
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatBadgeModule,
      MatListModule,
      MatGridListModule,
      MatProgressSpinnerModule,
      MatInputModule,
      MatCardModule,
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
      MatStepperModule
   ],
   providers: [
      MatDatepickerModule,
   ]
})

export class AngularMaterialModule { }
