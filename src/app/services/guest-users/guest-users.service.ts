import { Injectable } from "@angular/core";

import { Observable, BehaviorSubject } from "rxjs";
import { GuestUserModel } from "../../models/GuestUserModel";
import { GuestUsersSocket } from "src/app/modules/sockets/GuestUsersSocket";
import Axios, { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:5000";

@Injectable({
  providedIn: "root"
})
export class GuestUsersService {
  public guestUsers$: BehaviorSubject<GuestUserModel[]>;

  constructor(private socket: GuestUsersSocket) {
    this.initializeGuestUsers$();
    this.socket
      .databaseChangesSubscription()
      .subscribe((guestUserModels: GuestUserModel[]) => {
        if (guestUserModels) {
          console.log(guestUserModels);
          this.guestUsers$.next(guestUserModels);
        }
      });
  }

  public async removeGuestUser(guestUserModel: GuestUserModel) {
    try {
      await this.socket.removeGuestUser({
        emailAddress: guestUserModel.emailAddress
      });
    } catch (error) {
      console.log(error);
    }
  }

  private async initializeGuestUsers$(): Promise<void> {
    try {
      this.guestUsers$ = new BehaviorSubject([]);
      this.guestUsers$.next(await this.getGuestUsers());
      console.log(this.guestUsers$.value);
    } catch (error) {
      console.log(error);
    }
  }

  private async getGuestUsers(): Promise<GuestUserModel[]> {
    try {
      const url = `${BASE_URL}/guest-user/`;
      let axiosResponse: AxiosResponse = await Axios.get(url);
      return axiosResponse.data as GuestUserModel[];
    } catch (error) {
      console.log("could not get guestusers users ", error);
    }
  }
}
