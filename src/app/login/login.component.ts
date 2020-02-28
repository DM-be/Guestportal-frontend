import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/authentication/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "../services/notification.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public email: string = "";
  public password: string = "";

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")
  ]);

  passwordFormControl = new FormControl(undefined, Validators.required);

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  public async login() {
    try {
      const loginResult = await this.authService.authenticateUser({
        email: this.email,
        password: this.password
      });

      if (this.authService.instanceOfAdminUser(loginResult)) {
        await this.router.navigate(["/admin"]);
      } else {
        await this.notificationService.showNotification(
          loginResult.message,
          false
        );
      }
    } catch (error) {}
  }
}
