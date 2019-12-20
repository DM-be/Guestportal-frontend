import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { SelfRegisterComponent } from './self-register/self-register.component';


const Routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'self-register', component: SelfRegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '',
    redirectTo: '/self-register',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(Routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
