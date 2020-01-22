import { Component, OnInit } from "@angular/core";
import { LoginUserDto } from "../models/LoginUser.dto";
import { AuthService } from "../services/authentication/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public loginUserDto: LoginUserDto = {
    email: "",
    password: ""
  };

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  public async login() {
    try {
      await this.authService.authenticateUser(this.loginUserDto);
      if(this.authService.adminUser)
      {
        await this.router.navigate(["/admin"]);
      }
      else {
        console.log('invalid user');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
