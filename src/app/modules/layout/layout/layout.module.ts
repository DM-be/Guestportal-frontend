import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopToolbarComponent } from 'src/app/top-toolbar/top-toolbar.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/footer/footer.component';



@NgModule({
  declarations: [TopToolbarComponent, FooterComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ],
  exports: [TopToolbarComponent, FooterComponent]
})
export class LayoutModule { }
