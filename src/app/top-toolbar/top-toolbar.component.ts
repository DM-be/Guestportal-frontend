import { Component, OnInit, Input } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { AdminUser } from "../models/AdminUser";
import { Router } from "@angular/router";
@Component({
  selector: "app-top-toolbar",
  templateUrl: "./top-toolbar.component.html",
  styleUrls: ["./top-toolbar.component.css"]
})
export class TopToolbarComponent implements OnInit {
  currentUser: AdminUser;
  @Input() title: string;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit() {}

  logout() {
    this.authenticationService.logout();
  }
}
