import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class Pkcs11Service {

  constructor(private socket: Socket) {



   }

   getUserEidData(){
    return this.socket.fromEvent('eidUser');
  }

}
