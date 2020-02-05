import { Injectable } from "@angular/core";
import { LoginUserDto } from "src/app/models/LoginUser.dto";
import Axios, { AxiosResponse } from "axios";
import { AdminUser } from "src/app/models/AdminUser.dto";
import { CustomError } from "src/app/models/CustomError";
import { TokenResponse } from "src/app/models/TokenResponse";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public adminUser: AdminUser;
  public jwtHelper: JwtHelperService;
  constructor() {
    this.adminUser = this.getAdminUserFromLocalStorage();
    this.jwtHelper = new JwtHelperService();
  }

  public async authenticateUser(loginUserDto: LoginUserDto) {
    try {
      const adminUser = await this.login(loginUserDto);
      if (this.instanceOfAdminUser(adminUser)) {
        this.saveAdminUserToLocalStorage(adminUser as AdminUser);
        return adminUser;
      }
      return adminUser as CustomError;
    } catch (error) {
      return error as CustomError;
    }
  }

  public logoutUser() {
    try {
      this.clearAdminUserFromLocalStorage();
    } catch (error) {
      console.log(error);
    }
  }

  private saveAdminUserToLocalStorage(adminUser: AdminUser) {
    try {
      localStorage.setItem("AdminUser", JSON.stringify(adminUser));
    } catch (error) {
      console.log(error);
    }
  }

  private clearAdminUserFromLocalStorage() {
    try {
      localStorage.removeItem("AdminUser");
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
      const url = `${environment.backend_url}/auth/`;
      const axiosResponse: AxiosResponse = await Axios.post(url, loginUserDto); // 204
      if (axiosResponse.data.token) {
        const decodedToken: AdminUser = this.decodeToken(axiosResponse.data);

        return {
          email: decodedToken.email,
          tokenResponse: axiosResponse.data
        } as AdminUser;
      }
      return axiosResponse.data as CustomError;
    } catch (error) {
      console.log(error);
    }
  }

  public instanceOfAdminUser(object: any): object is AdminUser {
    return "email" in object;
  }

  private decodeToken(tokenResponse: TokenResponse): AdminUser {
    try {
      return this.jwtHelper.decodeToken(tokenResponse.token) as AdminUser;
    } catch (error) {
      console.log(error);
    }
  }

  public isTokenExpired(): boolean {
    try {
      const adminUser = this.getAdminUserFromLocalStorage();
      if (adminUser) {
        return this.jwtHelper.isTokenExpired(adminUser.tokenResponse.token);
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}
