import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";
import { GuestUserModel } from "src/app/models/GuestUserModel";
import { AuthService } from "src/app/services/authentication/auth.service";

const URL = "http://localhost:5002";
const DATABASECHANGES = "guestUserDatabaseChange";
const REMOVE_GUEST_USER = "removeUser";

@Injectable()
export class GuestUsersSocket extends Socket {
  constructor(private authService: AuthService) {
    super({
      url: URL,
      options: {
        query: {
          token: authService.getAdminUserFromLocalStorage().tokenResponse.token
        },
        transports: ["websocket", "polling"]
      }
    });
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
