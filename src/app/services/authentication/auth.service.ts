import { Injectable } from "@angular/core";
import { LoginUserDto } from "src/app/models/LoginUser.dto";
import Axios, { AxiosResponse } from "axios";
import { AdminUser } from "src/app/models/AdminUser.dto";
import { CustomError } from "src/app/models/CustomError";
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
      console.log(adminUser);
      if ((x): x is AdminUser => x.hasOwnProperty("email")) {
        this.saveAdminUserToLocalStorage(adminUser as AdminUser);
      }
      console.log(adminUser);
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
      if (stringifiedAdminUser !== null) {
        return JSON.parse(stringifiedAdminUser) as AdminUser;
      }
      return undefined;
    } catch (error) {
      console.log("error in getting admin user from local storage", error);
    }
  }

  private async login(
    loginUserDto: LoginUserDto
  ): Promise<AdminUser | CustomError> {
    try {
      const url = `${BASE_URL}/auth/`;
      let axiosResponse: AxiosResponse = await Axios.post(url, loginUserDto); // 204
      if ((x): x is AdminUser => x.hasOwnProperty("email")) {
        return axiosResponse.data as AdminUser;
      }
      return axiosResponse.data as CustomError;
    } catch (error) {
      console.log(error);
    }
  }
}
