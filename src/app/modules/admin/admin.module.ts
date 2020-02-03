import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SocketsModule } from "../sockets/sockets.module";
import { AdminComponent } from "src/app/admin/admin.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { EidReaderSocket } from "../sockets/EidReaderSocket";
import { GuestUsersSocket } from "../sockets/GuestUsersSocket";
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { TopToolbarComponent } from 'src/app/top-toolbar/top-toolbar.component';
import { LayoutModule } from '../layout/layout/layout.module';
import { GuestUsersService } from 'src/app/services/guest-users/guest-users.service';

@NgModule({
  declarations: [AdminComponent],
  providers: [GuestUsersSocket, EidReaderSocket, GuestUsersService],
  imports: [CommonModule, AdminRoutingModule, AngularMaterialModule, LayoutModule],
})
export class AdminModule {}
