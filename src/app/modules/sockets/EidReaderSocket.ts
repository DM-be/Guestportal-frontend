import { Socket } from "ngx-socket-io";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EidUser } from "src/app/models/EidUser";

const URL = "http://localhost:3001";
const READ_CARD_EVENT = "readCardDataEvent";

@Injectable()
export class EidReaderSocket extends Socket {
  constructor() {
    super({ url: URL, options: {} });
  }

  public readCardEventSubscription(): Observable<EidUser> {
    try {
      return this.fromEvent(READ_CARD_EVENT);
    } catch (error) {
      console.log(error);
    }
  }
}
