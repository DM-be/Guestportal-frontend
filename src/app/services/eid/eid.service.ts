import { Injectable } from "@angular/core";
import { EidReaderSocket } from "src/app/modules/sockets/EidReaderSocket";
import { BehaviorSubject } from "rxjs";
import { EidUser } from "src/app/models/EidUser";

@Injectable({
  providedIn: "root"
})
export class EidService {
  public eidUserSubject: BehaviorSubject<EidUser>;

  constructor(private eidReaderSocket: EidReaderSocket) {
    this.eidUserSubject = new BehaviorSubject(undefined);
    this.listenToEidUserSubjectEvent();
  }

  private listenToEidUserSubjectEvent() {
    this.eidReaderSocket
      .readCardEventSubscription()
      .subscribe(eidUser => this.eidUserSubject.next(eidUser));
  }
}
