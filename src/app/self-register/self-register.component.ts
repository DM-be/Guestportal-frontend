import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActiveDirectoryUser } from "../models/ActiveDirectoryUser";
import { Observable } from "rxjs";

import { map, startWith } from "rxjs/operators";
import { EidUser } from "../models/EidUser";
import { IseService, WebSocketService } from "../services";

@Component({
  selector: "app-self-register",
  templateUrl: "./self-register.component.html",
  styleUrls: ["./self-register.component.css"]
})
export class SelfRegisterComponent implements OnInit {
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  title = "Self registration";
  activeDirectoryUsersFormControl = new FormControl();

  activeDirectoryUsers: ActiveDirectoryUser[];

  filteredActiveDirectoryUsers: Observable<ActiveDirectoryUser[]>;

  constructor(
    private webSocketService: WebSocketService,
    private iseService: IseService
  ) {}

  async ngOnInit() {
    this.activeDirectoryUsers = await this.iseService.getActiveDirectoryUsers();
    this.pipeFilteredActiveDirectoryUsers();
  }

  private pipeFilteredActiveDirectoryUsers() {
    this.filteredActiveDirectoryUsers = this.activeDirectoryUsersFormControl.valueChanges.pipe(
      startWith(""),
      map(user =>
        user
          ? this.filterActiveDirectoryUsers(user)
          : this.activeDirectoryUsers.slice()
      )
    );
    this.webSocketService
      .listenToEidUserEvent()
      .subscribe((eidUser: EidUser) => {
        console.log(eidUser as EidUser);
      });
  }

  private filterActiveDirectoryUsers(value: string): ActiveDirectoryUser[] {
    const filterValue = value.toLowerCase();
    this.activeDirectoryUsers;
    return this.activeDirectoryUsers.filter(
      (adUser: ActiveDirectoryUser) =>
        adUser.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
