import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./login/login.component";
import { SelfRegisterComponent } from "./self-register/self-register.component";
import { AdminComponent } from "./admin/admin.component";
import { AngularMaterialModule } from "./angular-material.module";
import { TopToolbarComponent } from "./top-toolbar/top-toolbar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SocketsModule } from "./modules/sockets/sockets.module";
import { SocketIoModule } from 'ngx-socket-io';
import { EidReaderSocket } from './modules/sockets/EidReaderSocket';
import { GuestUsersSocket } from './modules/sockets/GuestUsersSocket';
import { LayoutModule } from './modules/layout/layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SelfRegisterComponent,
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
  providers: [GuestUsersSocket, EidReaderSocket],
  bootstrap: [AppComponent]
})
export class AppModule {}
