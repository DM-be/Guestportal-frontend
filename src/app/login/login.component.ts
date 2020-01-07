// Onnodige imports wegdoen
// Onnodige variabelen wegdoen
// ngOnInit() return url is dat nodig
// get f() is dit nodig
// private/public schrijven bij methodes en return type (bv; bij login() moet het leeg promise zijn Promise<void>)
// Is this.submitted nodig
// Is this.loading nodig
// "this.router.navigate(['/admin']);" moet kunnen navigeren zonder reload derachter (met await misschien)

import { CreateUserDTO } from "./../models/CreateUserDTO";
import { FormControl } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { MatDialog } from "@angular/material";
import { AuthenticationService } from "../services";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";
  title = "Login";
  username: string;
  password: string;
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue != null) {
      this.router.navigate(["/admin"]);
    }
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    this.loading = true;
    try {
      let loginUser: CreateUserDTO = {
        email: this.username,
        password: this.password
      };
      this.authenticationService.login(loginUser);
      this.router.navigate(["/admin"]);
      location.reload();
    } catch (error) {
      this.error = error;
      this.loading = false;
      location.reload(); // deze moet weg
    }
  }
}
