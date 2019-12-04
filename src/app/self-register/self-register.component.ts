import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
  }

}
