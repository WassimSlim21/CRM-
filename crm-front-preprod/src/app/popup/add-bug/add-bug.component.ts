import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from 'src/app/core/models/account';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bug',
  templateUrl: './add-bug.component.html',
  styleUrls: ['./add-bug.component.scss']
})

export class AddBugComponent implements OnInit {
  addBugForm: FormGroup;
  socket: any;
  accounts: Account[];
  compte: Account = new Account();
  constructor(private apiService: ApiService, private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<AddBugComponent>,
              public router: Router) {
    this.addBugForm = new FormGroup({
      name: new FormControl('', Validators.required),
      account_id: new FormControl((JSON.parse(localStorage.getItem('account'))._id)),
      description: new FormControl('', [, Validators.required]),
      type: new FormControl('', [Validators.required]),
      account_assigned_id: new FormControl(null),
      info: new FormControl('')
    });
}


getAllAccounts() {
  this.apiService.apiGetAll('account/get').subscribe(
    (response: any) => {
      if (response) {
        this.accounts = response;
        this.accounts.push(this.compte);
        console.log(this.accounts);
      }
    },
  error => {
    console.log(error);
  });
}

addBug() {

  if (this.addBugForm.invalid) {
    this.snackBar.open('please verify the form');
  } else {
  console.log(this.addBugForm.value);
  this.apiService.apiPost('bug/add', this.addBugForm.value).subscribe(response => {
    console.log(response);
  });
  this.dialogRef.close();

  this.apiService.apiPost('notification/',
  {source_id : JSON.parse(localStorage.getItem('account'))._id,
  route : this.router.url,
  content : `A bug (${this.addBugForm.value.name}) was created by ${JSON.parse(localStorage.getItem('account')).userName}`})
  .subscribe(response => {
    console.log('notifiier :', response);
    this.socket.emit('bug', JSON.parse(localStorage.getItem('account'))._id);

  });

  }

}

  ngOnInit() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.getAllAccounts();
  }
  onReset() {
    this.dialogRef.close();
   }
}
