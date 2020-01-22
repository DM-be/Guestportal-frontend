import { Injectable } from "@angular/core";
import { LoginUserDto } from "src/app/models/LoginUser.dto";
import Axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { AdminUser } from "src/app/models/AdminUser.dto";
import { BehaviorSubject } from "rxjs";
const BASE_URL = "http://localhost:5000";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public adminUser: AdminUser;
  constructor() {
    this.adminUser = this.getAdminUserFromLocalStorage();
  }

  public async authenticateUser(loginUserDto: LoginUserDto) {
    try {
      const adminUser = await this.login(loginUserDto);
      this.saveAdminUserToLocalStorage(adminUser);
    } catch (error) {
      console.log("error in authenticating admin user", error);
    }
  }

  private saveAdminUserToLocalStorage(adminUser: AdminUser) {
    try {
      localStorage.setItem("AdminUser", JSON.stringify(adminUser));
    } catch (error) {
      console.log(error);
    }
  }

  public getAdminUserFromLocalStorage(): AdminUser {
    try {
      const stringifiedAdminUser = localStorage.getItem("AdminUser");
      if (stringifiedAdminUser) {
        return JSON.parse(stringifiedAdminUser) as AdminUser;
      }
      return undefined;
    } catch (error) {
      console.log("error in getting admin user from local storage", error);
    }
  }

  private async login(loginUserDto: LoginUserDto): Promise<AdminUser> {
    try {
      const url = `${BASE_URL}/auth/`;
      let axiosResponse: AxiosResponse = await Axios.post(url, loginUserDto); // 204
      return axiosResponse.data as AdminUser;
    } catch (error) {
      console.log(error);
    }
  }
}
