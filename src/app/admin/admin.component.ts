import { Component, OnInit, ViewChild } from "@angular/core";
import { GuestUsersService } from "../services/guest-users/guest-users.service";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { GuestUserModel } from "../models/GuestUserModel";
import { BehaviorSubject, Observable } from "rxjs";
import { DataSource } from "@angular/cdk/table";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = [
    "first name",
    "last name",
    "from",
    "to",
    "visiting",
    "email",
    "actions"
  ]; //  "from date", "to date", "personBeingVisited"
  dataSource: GuestUserDataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private guestUsersService: GuestUsersService) {
    this.dataSource = new GuestUserDataSource(this.guestUsersService);

    const source = new MatTableDataSource();
  }
  ngOnInit() {}

  async removeUser(guestUser: GuestUserModel) {
    await this.guestUsersService.removeGuestUser(guestUser);
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
