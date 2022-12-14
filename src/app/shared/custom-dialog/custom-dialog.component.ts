import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.scss']
})
export class CustomDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)public data:string,
    private dialog:MatDialogRef<CustomDialogComponent>) { }

  ngOnInit(): void {
  }
  closeDialog(value:boolean)
  {
    this.dialog.close(value)
  }

}
