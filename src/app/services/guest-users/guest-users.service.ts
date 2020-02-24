import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GuestUserModel } from "../../models/GuestUserModel";
import { GuestUsersSocket } from "src/app/modules/sockets/GuestUsersSocket";
import Axios, { AxiosResponse } from "axios";
import { CreateGuestUserDto } from "src/app/models/CreateGuestUserDto";
import { environment } from "src/environments/environment";

@Injectable()
export class GuestUsersService {
  public guestUsers$: BehaviorSubject<GuestUserModel[]>;

  constructor(private socket: GuestUsersSocket) {
    this.initializeGuestUsers$();
    this.socket
      .databaseChangesSubscription()
      .subscribe((guestUserModels: GuestUserModel[]) => {
        if (guestUserModels) {
          this.guestUsers$.next(guestUserModels);
        }
      });
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
      const url = `${environment.BACKEND_URL_PORT}/guest-user/`;
      let axiosResponse: AxiosResponse = await Axios.get(url);
      return axiosResponse.data as GuestUserModel[];
    } catch (error) {
      console.log("could not get guestusers users ", error);
    }
  }
}
