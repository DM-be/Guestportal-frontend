import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import Axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:3000";
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor() {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public async login(email: string, password: string): Promise<User> {
      try {
        const url = `${BASE_URL}/auth/`;
        let axiosResponse: AxiosResponse = await Axios.post(url,
          {
            email: email,
            password: password
          }
          ); // 204
          // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(axiosResponse.data as User));
                        this.currentUserSubject.next(axiosResponse.data as User);
        return axiosResponse.data as User;
      } catch (error) {
        console.log("could not authenticate user ", error);
      }

    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
