import { Injectable } from "@angular/core";
import { CreateGuestUserDto } from "src/app/models/CreateGuestUserDto";
import Axios, { AxiosResponse } from "axios";
import { environment } from "src/environments/environment";
import { RemoveGuestUserDto } from "src/app/models/RemoveGuestUserDto";

@Injectable({
  providedIn: "root"
})
export class AxiosRequestsService {
  constructor() {}

  public async createGuestUser(
    createGuestUserDto: CreateGuestUserDto
  ): Promise<void> {
    try {
      const url = `${environment.BACKEND_URL_PORT}/guest-user/`;
      const axiosResponse: AxiosResponse = await Axios.post(
        url,
        createGuestUserDto
      );
    } catch (error) {
      console.log(error);
    }
  }

  public async removeGuestUser(emailAddress: string) {
    try {
      const url = `${environment.BACKEND_URL_PORT}/guest-user/${emailAddress}`;
      console.log('calling')
      await Axios.delete(url);
    } catch (error) {
      console.log(error);
    }
  }
}
