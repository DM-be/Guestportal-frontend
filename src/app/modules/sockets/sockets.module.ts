import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule } from 'ngx-socket-io';
import { GuestUsersSocket } from './GuestUsersSocket';
import { EidReaderSocket } from './EidReaderSocket';


@NgModule({
  declarations: [],
  imports: [
    SocketIoModule
  ],
  providers: [GuestUsersSocket, EidReaderSocket]
})
export class SocketsModule { }
