import { Socket } from "ngx-socket-io";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EidUser } from "src/app/models/EidUser";
import { environment } from 'src/environments/environment';


const READ_CARD_EVENT = "readCardDataEvent";

@Injectable()
export class EidReaderSocket extends Socket {
  constructor() {
    super({ url: environment.WEBSOCKET_EID_URL_PORT, options: {} });
  }

  public readCardEventSubscription(): Observable<EidUser> {
    try {
      return this.fromEvent(READ_CARD_EVENT);
    } catch (error) {
      console.log(error);
    }
  }
}
