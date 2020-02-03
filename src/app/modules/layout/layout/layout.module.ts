import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopToolbarComponent } from 'src/app/top-toolbar/top-toolbar.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TopToolbarComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ],
  exports: [TopToolbarComponent]
})
export class LayoutModule { }
