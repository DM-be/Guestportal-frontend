import { Injectable } from "@angular/core";
import Axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { ActiveDirectoryUser } from "../models/ActiveDirectoryUser";

const BASE_URL = "http://localhost:5000";

@Injectable({
  providedIn: "root"
})
export class IseService {
  constructor() {}

  public async getActiveDirectoryUsers(): Promise<ActiveDirectoryUser[]> {
    try {
      const url = `${BASE_URL}/ad/`;
      const axiosResponse: AxiosResponse = await Axios.get(url); // 204
      return axiosResponse.data as ActiveDirectoryUser[];
    } catch (error) {
      console.log("could not get activedirectory users ", error);
    }
  }
}
