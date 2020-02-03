import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { SelfRegisterComponent } from './self-register/self-register.component';
import { LoginComponent } from './login/login.component';
import { AuthguardGuard } from './guards/authguard.guard';


const routes: Routes = [
  { path: 'admin', canActivate: [AuthguardGuard], loadChildren: () => import('../app/modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'self-register', component: SelfRegisterComponent },
  { path: "login", component: LoginComponent },
  { path: '',
    redirectTo: '/self-register',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
