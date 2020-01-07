import { Component } from "@angular/core";
import { AdminUser } from "./models/AdminUser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "guest-portal-frontend";
  currentUser: AdminUser;
  constructor() {}
}
