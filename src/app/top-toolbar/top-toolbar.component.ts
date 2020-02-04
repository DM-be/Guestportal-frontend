import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/authentication/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-top-toolbar",
  templateUrl: "./top-toolbar.component.html",
  styleUrls: ["./top-toolbar.component.css"]
})
export class TopToolbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  isLoggedIn() {
    return (
      this.authService.getAdminUserFromLocalStorage() &&
      !this.authService.isTokenExpired()
    );
  }

  public async logout() {
    try {
      this.authService.logoutUser();
      await this.router.navigate(["/login"]);
    } catch (error) {
      console.log(error);
    }
    
  }
}
