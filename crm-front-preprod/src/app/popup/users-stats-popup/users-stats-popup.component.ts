import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import * as moment from 'moment';
import { UserDetailsComponent } from '../user-details/user-details.component';
@Component({
  selector: 'app-users-stats-popup',
  templateUrl: './users-stats-popup.component.html',
  styleUrls: ['./users-stats-popup.component.scss']
})
export class UsersStatsPopupComponent implements OnInit {
users: any;

  constructor(public dialogRef: MatDialogRef<UsersStatsPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.users = this.data.users;
    console.log(this.users);

  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      disableClose: false,
      height : '80%' ,
      data: {
        userId: id
      }

    });
  }

}
