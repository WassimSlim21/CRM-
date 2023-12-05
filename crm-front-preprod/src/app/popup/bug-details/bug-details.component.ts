import { Component, OnInit, Inject } from '@angular/core';
import { Account } from 'src/app/core/models/account';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Bug } from 'src/app/core/models/bug';
import { UpdateBugComponent } from '../update-bug/update-bug.component';

@Component({
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.scss']
})
export class BugDetailsComponent implements OnInit {
  bug: Bug;
  moment = moment;
  isLoading = true ;
  constructor(public dialogRef: MatDialogRef<BugDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private Api: ApiService, private router: Router,
              private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadBug(this.data.bug_id);
  }

  updateBugDialog(bug) {
    const dialogRef = this.dialog.open(UpdateBugComponent, {
      disableClose: false,
      height: 'auto',
      width: 'auto',
      data: {
        bugs: bug
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  // Close Dialog Update
  close() {
    this.dialogRef.close();
  }
  loadBug(id): void {
    this.Api.apiGetAll('bug/' + id).subscribe(
      (result: any) => {
        if (result) {
          this.isLoading = false;
          this.bug = result;
          console.log('bug : ', this.bug);
        }
      }
    );
  }
}
