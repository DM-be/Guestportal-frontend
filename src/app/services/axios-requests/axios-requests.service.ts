import { Injectable } from "@angular/core";
import { CreateGuestUserDto } from "src/app/models/CreateGuestUserDto";
import Axios, { AxiosResponse } from "axios";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AxiosRequestsService {
  constructor() {}

  public async createGuestUser(
    createGuestUserDto: CreateGuestUserDto
  ): Promise<void> {
    try {
      const url = `${environment.backend_url}/guest-user/`;
      const axiosResponse: AxiosResponse = await Axios.post(
        url,
        createGuestUserDto
      );
    } catch (error) {
      console.log(error);
    }
  }
}