import { CreateUserDTO } from "./../models/CreateUserDTO";
import { environment } from "./../../environments/environment.prod";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
//import { JwtHelper, tokenNotExpired  } from 'angular-jwt';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AdminUser } from "../models/AdminUser";
import Axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:3000";
const jwtHelper = new JwtHelperService();
@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<AdminUser>;
  public currentUser: Observable<AdminUser>;

  constructor(private router: Router) {
    this.currentUserSubject = new BehaviorSubject<AdminUser>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AdminUser {
    if (this.getToken() != null && this.isTokenExpired()) {
      localStorage.removeItem("currentUser");
      this.currentUserSubject = new BehaviorSubject<AdminUser>(
        JSON.parse(localStorage.getItem("currentUser"))
      );
      this.currentUser = this.currentUserSubject.asObservable();
      return null;
      //console.log(JSON.parse(localStorage.getItem('currentUser') ));
      //return JSON.parse(localStorage.getItem('currentUser') ) as AdminUser;
    }

    return this.currentUserSubject.value;
  }

  public async login(loginUser: CreateUserDTO): Promise<AdminUser> {
    try {
      const url = `${BASE_URL}/auth/`;
      let axiosResponse: AxiosResponse = await Axios.post(url, loginUser); // 204
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem(
        "currentUser",
        JSON.stringify(axiosResponse.data as AdminUser)
      );
      this.currentUserSubject.next(axiosResponse.data as AdminUser);
      return axiosResponse.data as AdminUser;
    } catch (error) {
      console.log("could not authenticate user ", error);
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.router.navigate(["/login"]);
  }
  getToken(): string {
    let user: AdminUser = JSON.parse(localStorage.getItem("currentUser"));
    if (user != null) {
      return user.token;
    }
    return null;
  }
  isTokenExpired(): boolean {
    //console.log(this.getToken())
    return jwtHelper.isTokenExpired(this.getToken());
  }
}
