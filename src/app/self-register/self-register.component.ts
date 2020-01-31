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
import { MatStepper, MatStepperNext } from "@angular/material";
import { GuestUsersService } from "../services/guest-users/guest-users.service";

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

  @ViewChild("namesStep", undefined) private namesStep: MatStepperNext;

  @ViewChild("stepper", undefined) private stepper: MatStepper;

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
    private notificationService: NotificationService,
    private guestUserService: GuestUsersService
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
      this.namesStep._stepper.next();
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

  private async sendGuestAccessNotification() {
    try {
      await this.notificationService.showNotification(
        `You now have access to the guest network ${this.firstNameFormControl.value}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  public async requestGuestAccess() {
    //TODO: formatting email/name in form?
    //TODO: extra validation, restrict only to list?

    const createGuestUserDto: CreateGuestUserDto = {
      firstName: this.firstNameFormControl.value,
      surName: this.lastNameFormControl.value,
      personBeingVisited: this.activeDirectoryUsersFormControl.value,
      password: this.passwordFormControl.value,
      reasonForVisit: this.reasonForVisitFormControl.value,
      emailAddress: this.emailFormControl.value
    };
    try {
      //     await this.guestUserService.createGuestUser(createGuestUserDto);
      await this.sendGuestAccessNotification();
      this.resetForm();
    } catch (error) {
      console.log(error);
    }
  }

  private resetForm() {
    this.firstNameFormControl.setValue("");
    this.lastNameFormControl.setValue("");
    this.activeDirectoryUsersFormControl.setValue("");
    this.passwordFormControl.setValue("");
    this.reasonForVisitFormControl.setValue("");
    this.emailFormControl.setValue("");
    this.enterManually = false;
    this.showManualButton = true;
    this.stepper.reset();
  }
}
