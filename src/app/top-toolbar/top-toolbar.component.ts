import { Component, OnInit } from '@angular/core';
import {  AuthenticationService} from '../services';
import { User } from '../models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.css']
})
export class TopToolbarComponent implements OnInit {
  currentUser: User;
  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
