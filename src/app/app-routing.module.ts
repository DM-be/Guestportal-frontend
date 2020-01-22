import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { SelfRegisterComponent } from './self-register/self-register.component';
import { LoginComponent } from './login/login.component';
import { AuthguardGuard } from './guards/authguard.guard';


const Routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthguardGuard] },
  { path: 'self-register', component: SelfRegisterComponent },
  { path: "login", component: LoginComponent },
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
