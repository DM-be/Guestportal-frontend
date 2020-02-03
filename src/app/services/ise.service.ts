import { Injectable } from "@angular/core";
import Axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { ActiveDirectoryUser } from "../models/ActiveDirectoryUser";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: "root"
})
export class IseService {
  constructor() {}

  public async getActiveDirectoryUsers(): Promise<ActiveDirectoryUser[]> {
    try {
      const url = `${environment.backend_url}/ad/`;
      const axiosResponse: AxiosResponse = await Axios.get(url); // 204
      return axiosResponse.data as ActiveDirectoryUser[];
    } catch (error) {
      console.log("could not get activedirectory users ", error);
    }
  }
}
