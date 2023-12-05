import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-company-users',
  templateUrl: './company-users.component.html',
  styleUrls: ['./company-users.component.scss']
})
export class CompanyUsersComponent implements OnInit {
  users: any[] ;
  constructor(
    private Api: ApiService, public dialogRef: MatDialogRef<CompanyUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog) {

    }
  ngOnInit() {
    this.Api.apiGetAll('company/' + this.data.id).subscribe(
      (users: any) => {
        console.log('users : ' + users);
        if (users) {
          this.users = users;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      disableClose: false,
      height : '100%' ,
      position: { right: '0'},
      data: {
        userId: id
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
