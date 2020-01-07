import { AuthGuard } from "./helpers/auth.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { LoginComponent } from "./login/login.component";
import { SelfRegisterComponent } from "./self-register/self-register.component";

const routes: Routes = [
  { path: "admin", component: AdminComponent, canActivate: [AuthGuard] },
  { path: "self-register", component: SelfRegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/self-register", pathMatch: "full" },
  { path: "**", component: SelfRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
