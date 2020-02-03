import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from 'src/app/admin/admin.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }