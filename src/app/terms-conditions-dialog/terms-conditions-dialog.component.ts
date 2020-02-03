import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-terms-conditions-dialog',
  templateUrl: './terms-conditions-dialog.component.html',
  styleUrls: ['./terms-conditions-dialog.component.css']
})
export class TermsConditionsDialogComponent {

  constructor(public dialog: MatDialog) { }



}
