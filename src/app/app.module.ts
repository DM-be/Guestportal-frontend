import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./login/login.component";
import { SelfRegisterComponent } from "./self-register/self-register.component";
import { AngularMaterialModule } from "./angular-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SocketIoModule } from "ngx-socket-io";
import { GuestUsersSocket } from "./modules/sockets/GuestUsersSocket";
import { LayoutModule } from "./modules/layout/layout/layout.module";
import { TermsConditionsDialogComponent } from "./terms-conditions-dialog/terms-conditions-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SelfRegisterComponent,
    TermsConditionsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule,
    LayoutModule
  ],
  providers: [GuestUsersSocket],
  entryComponents: [TermsConditionsDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
