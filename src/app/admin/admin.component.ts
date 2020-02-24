import { Component, OnInit, ViewChild } from "@angular/core";
import { GuestUsersService } from "../services/guest-users/guest-users.service";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { GuestUserModel } from "../models/GuestUserModel";
import { Observable } from "rxjs";
import { DataSource } from "@angular/cdk/table";
import * as moment from "moment";
import { AxiosRequestsService } from "../services/axios-requests/axios-requests.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent {
  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "email",
    "visiting",
    "from",
    "to",
    "actions"
  ];
  dataSource: GuestUserDataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private guestUsersService: GuestUsersService,
    private axiosRequestService: AxiosRequestsService
  ) {
    this.dataSource = new GuestUserDataSource(this.guestUsersService);
  }

  async removeUser(guestUser: GuestUserModel): Promise<void> {
    try {
      await this.axiosRequestService.removeGuestUser(guestUser.userName);
    } catch (error) {
      console.log(error);
    }
  }

  public formatDateStringFrom(guestUser: GuestUserModel) {
    return moment(guestUser.fromDate).fromNow();
  }

  public formatDateStringTo(guestUser: GuestUserModel) {
    return moment(guestUser.toDate).fromNow();
  }
}

export class GuestUserDataSource extends DataSource<any> {
  constructor(private guestUsersService: GuestUsersService) {
    super();
  }
  connect(): Observable<GuestUserModel[]> {
    return this.guestUsersService.guestUsers$.asObservable();
  }
  disconnect() {}
}
