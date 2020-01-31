import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActiveDirectoryUser } from "../models/ActiveDirectoryUser";
import { Observable } from "rxjs";

import { map, startWith } from "rxjs/operators";
import { EidUser } from "../models/EidUser";
import { IseService } from "../services/ise.service";
import { CreateGuestUserDto } from "../models/CreateGuestUserDto";
import { BackendService } from "../services/backend/backend.service";
import { EidService } from "../services/eid/eid.service";
import { NotificationService } from "../services/notification.service";
import { MatStepper } from "@angular/material";

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

  enterManually = false;
  showManualButton = true;

  @ViewChild("namesStep", undefined) private namesStep: MatStepper;

  nameFormControl = new FormControl();

  private createGuestUserDto: CreateGuestUserDto;

  activeDirectoryUsersFormControl = new FormControl("", [Validators.required]);
  firstNameFormControl = new FormControl("", [Validators.required]);
  lastNameFormControl = new FormControl("", [Validators.required]);
  passwordFormControl = new FormControl("", [Validators.required]);
  reasonForVisitFormControl = new FormControl("", [Validators.required]);

  activeDirectoryUsers: ActiveDirectoryUser[];
  filteredActiveDirectoryUsers: Observable<ActiveDirectoryUser[]>;

  constructor(
    private iseService: IseService,
    private backendService: BackendService,
    private eidService: EidService,
    private notificationService: NotificationService
  ) {}

  async ngOnInit() {
    this.activeDirectoryUsers = await this.iseService.getActiveDirectoryUsers();
    this.pipeFilteredActiveDirectoryUsers();
    this.createGuestUserDto = new CreateGuestUserDto();
    this.listenToEidEvents();
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
  }

  private filterActiveDirectoryUsers(value: string): ActiveDirectoryUser[] {
    const filterValue = value.toLowerCase();
    this.activeDirectoryUsers;
    return this.activeDirectoryUsers.filter(
      (adUser: ActiveDirectoryUser) =>
        adUser.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  public toggleManualButton() {
    this.enterManually = !this.enterManually;
    this.showManualButton = false;
  }

  private listenToEidEvents() {
    this.eidService.eidUserSubject.subscribe((eidUser: EidUser) => {
      if (eidUser) {
        this.firstNameFormControl.setValue(eidUser.firstNames[0]);
        this.lastNameFormControl.setValue(eidUser.surName);
        this.showSuccessEidNotification();
        this.goForwardAfterNamesEidEvent();
      }
    });
  }

  private goForwardAfterNamesEidEvent() {
    try {
      this.namesStep.next();
    } catch (error) {
      console.log(error);
    }
  }

  public async showSuccessEidNotification() {
    try {
      //TODO: better text
      await this.notificationService.showNotification(
        `Thanks ${this.firstNameFormControl.value}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  requestGuestAccess() {
    //TODO: formatting email/name in form?

    const createGuestUserDto: CreateGuestUserDto = {
      firstName: this.firstNameFormControl.value,
      surName: this.lastNameFormControl.value,
      personBeingVisited: this.activeDirectoryUsersFormControl.value,
      password: this.passwordFormControl.value,
      reasonForVisit: this.reasonForVisitFormControl.value,
      emailAddress: this.emailFormControl.value
    };

    // send dto to backend api
  }
}
