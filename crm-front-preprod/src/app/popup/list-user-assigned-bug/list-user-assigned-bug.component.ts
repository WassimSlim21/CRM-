import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'src/app/core/service/api.service';
import { Account } from 'src/app/core/models/account';
import { Bug } from 'src/app/core/models/bug';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user-assigned-bug',
  templateUrl: './list-user-assigned-bug.component.html',
  styleUrls: ['./list-user-assigned-bug.component.scss']
})
export class ListUserAssignedBugComponent implements OnInit {
  accounts: Account[];
  bug: Bug;
  constructor(private apiService: ApiService, private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ListUserAssignedBugComponent>,
              public router: Router,

              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getAllAccounts();
    this.bug = this.data.bug;
  }
  getAllAccounts() {
    this.apiService.apiGetAll('account/get').subscribe(
      (response: any) => {
        if (response) {
          this.accounts = response;
          console.log(this.accounts);
        }
      },
    error => {
      console.log(error);
    });
  }

  /* Update Bug User Assigned */

  UpdateBugAssignedUser(account: any) {
    console.log('aaaaaaaaaaaaaa' , account);
    this.apiService.apiPut(`bug/userAssigned/${this.bug._id}`, { account_assigned_id: account._id }).subscribe(
      (response: any) => {
        this.snackBar.open(JSON.stringify(response.message));
      }
    );
    if (account._id !== JSON.parse(localStorage.getItem('account'))._id) {
      this.apiService.apiPost('notification/',
      {source : JSON.parse(localStorage.getItem('account'))._id,
      route : this.router.url,
      content : `A bug (${this.bug.name}) was assigned to you by ${JSON.parse(localStorage.getItem('account')).userName}`,
      destinations : [account._id]}).subscribe(response => {
        console.log('notifiier :', response);
      });
    }
    const toBeNotified = [];
    this.accounts.forEach(acc => {
      if (acc._id !== account._id && acc._id !== JSON.parse(localStorage.getItem('account'))._id ) {
          toBeNotified.push(acc._id);
      }
    });
    this.apiService.apiPost('notification/',
    {source : JSON.parse(localStorage.getItem('account'))._id,
     route : this.router.url,
     content : `A bug (${this.bug.name}) was assigned to ${account.userName}`,
     destinations : toBeNotified }).subscribe(response => {
      console.log('notifiier :', response);
    });

    this.dialogRef.close();
  }

}
