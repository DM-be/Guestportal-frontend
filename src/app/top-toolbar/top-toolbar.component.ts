import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/authentication/auth.service";

@Component({
  selector: "app-top-toolbar",
  templateUrl: "./top-toolbar.component.html",
  styleUrls: ["./top-toolbar.component.css"]
})
export class TopToolbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  isLoggedIn() {
    return (
      this.authService.getAdminUserFromLocalStorage() &&
      !this.authService.isTokenExpired()
    );
  }
}
