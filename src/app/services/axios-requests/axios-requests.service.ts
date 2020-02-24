import { Injectable } from "@angular/core";
import { CreateGuestUserDto } from "src/app/models/CreateGuestUserDto";
import Axios, { AxiosResponse } from "axios";
import { environment } from "src/environments/environment";
import { RemoveGuestUserDto } from "src/app/models/RemoveGuestUserDto";
import { AuthService } from "../authentication/auth.service";

@Injectable({
  providedIn: "root"
})
export class AxiosRequestsService {
  constructor(private authService: AuthService) {}

  public async createGuestUser(
    createGuestUserDto: CreateGuestUserDto
  ): Promise<void> {
    try {
      const url = `${environment.BACKEND_URL_PORT}/guest-user/`;
      await Axios.post(url, createGuestUserDto);
    } catch (error) {
      console.log(error);
    }
  }

  public async removeGuestUser(id: string) {
    try {
      const url = `${environment.BACKEND_URL_PORT}/guest-user/${id}`;
      await Axios.delete(url);
    } catch (error) {
      console.log(error);
    }
  }
}
