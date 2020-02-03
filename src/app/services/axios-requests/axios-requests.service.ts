import { Injectable } from '@angular/core';
import { CreateGuestUserDto } from 'src/app/models/CreateGuestUserDto';
import Axios, { AxiosResponse } from 'axios';


const BASE_URL = "http://localhost:5000";

@Injectable({
  providedIn: 'root'
})
export class AxiosRequestsService {

  constructor() { }

  public async createGuestUser(
    createGuestUserDto: CreateGuestUserDto
  ): Promise<void> {
    try {
      const url = `${BASE_URL}/guest-user/`;
      const axiosResponse: AxiosResponse = await Axios.post(
        url,
        createGuestUserDto
      );
    } catch (error) {
      console.log(error);
    }
  }
}
