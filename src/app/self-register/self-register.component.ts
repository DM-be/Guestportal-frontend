import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActiveDirectoryUser } from "../models/ActiveDirectoryUser";
import { Observable } from "rxjs";

import { map, startWith } from "rxjs/operators";
import { WebSocketService } from "../services/web-socket.service";
import { EidUser } from "../models/EidUser";
import { IseService } from "../services/ise.service";
import { CreateGuestUserDto } from "../models/CreateGuestUserDto";

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

  private createGuestUserDto: CreateGuestUserDto;

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
    this.createGuestUserDto = new CreateGuestUserDto();
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
        this.createGuestUserDto.firstName = eidUser.firstNames[0];
        this.createGuestUserDto.surName = eidUser.surName;
      });
  }


  public sendCreatUserDto() {
      this.createGuestUserDto.password = "" // formcontrol password
      this.createGuestUserDto.personBeingVisited = "";
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
