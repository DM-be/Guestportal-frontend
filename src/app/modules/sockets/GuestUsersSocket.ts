import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";
import { GuestUserModel } from "src/app/models/GuestUserModel";
const GUEST_USER_OPTIONS = {
  query: {
    token: "testtoken!"
  }
};
const URL = "http://localhost:3002";
const DATABASECHANGES = "guestUserDatabaseChange";
const REMOVE_GUEST_USER = "removeUser";

@Injectable()
export class GuestUsersSocket extends Socket {
  constructor() {
    super({ url: URL, options: GUEST_USER_OPTIONS });
  }

  public databaseChangesSubscription(): Observable<GuestUserModel[]> {
    return this.fromEvent(DATABASECHANGES);
  }

  public async removeGuestUser(removeGuestDto: Object): Promise<void> {
    try {
      await this.emit(REMOVE_GUEST_USER, removeGuestDto, () => {
        console.log("removed user");
      });
    } catch (error) {
      console.log(error);
    }
  }
}
