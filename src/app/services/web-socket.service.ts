import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { EidUser } from '../models/EidUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(private socket: Socket) {
  }

  public listenToEidUserEvent(): Observable<EidUser>{
   return this.socket.fromEvent('eidUser');
 }
}
