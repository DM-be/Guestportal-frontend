import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActiveDirectoryUser } from '../models/ActiveDirectoryUser';
import { Observable } from 'rxjs';

import {map, startWith} from 'rxjs/operators';



@Component({
  selector: 'app-self-register',
  templateUrl: './self-register.component.html',
  styleUrls: ['./self-register.component.css']
})
export class SelfRegisterComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  activeDirectoryUsersFormControl = new FormControl();

  activeDirectoryUsers: ActiveDirectoryUser [] = [
    {
      name: "test user 1"
    },
    {
      name: "test user 1"
    },
    {
      name: "test user 2"
    },
    {
      name: "bla"
    }
  ]

  filteredActiveDirectoryUsers: Observable<ActiveDirectoryUser []>;

  constructor() {
    this.filteredActiveDirectoryUsers = this.activeDirectoryUsersFormControl.valueChanges
    .pipe(
      startWith(''),
      map(user => user ? this.filterActiveDirectoryUsers(user) : this.activeDirectoryUsers.slice())
    );
   }

  ngOnInit() {
  }

  private filterActiveDirectoryUsers(value: string): ActiveDirectoryUser[] {
    const filterValue = value.toLowerCase();
    return this.activeDirectoryUsers.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
