import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-pack-user-list',
  templateUrl: './pack-user-list.component.html',
  styleUrls: ['./pack-user-list.component.scss']
})
export class PackUserListComponent implements OnInit {
  users: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog, private Api: ApiService,
  ) { }

  ngOnInit() {
    this.users = this.data.stat.users;
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      disableClose: false,
      height : '80%' ,
      data: {
        userId: id
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
