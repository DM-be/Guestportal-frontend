import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActiveDirectoryUser } from "../models/ActiveDirectoryUser";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { IseService } from "../services/ise.service";
import { CreateGuestUserDto } from "../models/CreateGuestUserDto";
import { NotificationService } from "../services/notification.service";
import { MatStepper, MatDialog } from "@angular/material";
import { TermsConditionsDialogComponent } from "../terms-conditions-dialog/terms-conditions-dialog.component";
import { AxiosRequestsService } from "../services/axios-requests/axios-requests.service";

@Component({
  selector: "app-self-register",
  templateUrl: "./self-register.component.html",
  styleUrls: ["./self-register.component.css"]
})
export class SelfRegisterComponent implements OnInit {
  emailFormControl = new FormControl(undefined, [
    Validators.required,
    Validators.email
  ]);

  enterManually = false;
  showManualButton = true;
  checkedTerms = false;

  @ViewChild("stepper", undefined) private stepper: MatStepper;

  nameFormControl = new FormControl();

  activeDirectoryUsersFormControl = new FormControl(undefined, [
    Validators.required
  ]);
  firstNameFormControl = new FormControl(undefined, [Validators.required]);
  lastNameFormControl = new FormControl(undefined, [Validators.required]);
  passwordFormControl = new FormControl(undefined, [Validators.required]);
  reasonForVisitFormControl = new FormControl(undefined, [Validators.required]);
  activeDirectoryUsers: ActiveDirectoryUser[];
  filteredActiveDirectoryUsers: Observable<ActiveDirectoryUser[]>;

  constructor(
    private iseService: IseService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private axiosRequestService: AxiosRequestsService
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

  private async sendGuestAccessNotification(): Promise<void> {
    try {
      await this.notificationService.showNotification(
        `You now have access to the guest network ${this.firstNameFormControl.value}`,
        true
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
      await this.axiosRequestService.createGuestUser(createGuestUserDto);
      await this.sendGuestAccessNotification();
      this.resetForm();
    } catch (error) {
      console.log(error);
    }
  }

  private resetForm(): void {
    this.firstNameFormControl.reset();
    this.lastNameFormControl.reset();
    this.activeDirectoryUsersFormControl.reset();
    this.passwordFormControl.reset();
    this.reasonForVisitFormControl.reset();
    this.emailFormControl.reset();
    this.enterManually = false;
    this.showManualButton = true;
    this.checkedTerms = false;
    this.stepper.reset();
  }

  public openDialog(): void {
    this.dialog.open(TermsConditionsDialogComponent);
  }

  public updateCheckedTerms(): void {
    this.checkedTerms = !this.checkedTerms;
  }
}
