import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";
import { GuestUserModel } from "src/app/models/GuestUserModel";
import { AuthService } from "src/app/services/authentication/auth.service";
import { environment } from "src/environments/environment";

// const URL = "http://localhost:5002";
const DATABASECHANGES = "guestUserDatabaseChange";

@Injectable()
export class GuestUsersSocket extends Socket {
  constructor(private authService: AuthService) {
    super({
      url: environment.WEBSOCKET_GUEST_URL_PORT,
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
}
