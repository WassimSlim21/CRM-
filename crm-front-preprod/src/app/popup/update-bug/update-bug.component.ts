import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from 'src/app/core/models/account';

@Component({
  selector: 'app-update-bug',
  templateUrl: './update-bug.component.html',
  styleUrls: ['./update-bug.component.scss']
})
export class UpdateBugComponent implements OnInit {
  updateBugForm: FormGroup;
  accounts: Account[];
  compte: Account = new Account();
  selected: any;

  constructor(public dialogRef: MatDialogRef<UpdateBugComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private apiService: ApiService, private router: Router,
              private snackBar: MatSnackBar, public dialog: MatDialog) {

                this.updateBugForm = new FormGroup({
                  name: new FormControl(this.data.bugs.name, Validators.required),
                  description: new FormControl(this.data.bugs.description, [, Validators.required]),
                  type: new FormControl(this.data.bugs.type, [Validators.required]),
                  account_assigned_id: new FormControl(null),
                  info: new FormControl(this.data.bugs.info)
                });
                if (this.data.bugs.account_assigned_id) {
                 this.updateBugForm.setControl('account_assigned_id', new FormControl(this.data.bugs.account_assigned_id._id));

                }
              }

  ngOnInit(): void {

    this.getAllAccounts();
    this.selected = this.data.bugs.account_assigned_id;
    console.log('selected', this.selected._id);

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

  updateBug() {
    this.apiService.apiPut(`bug/updateBug/${this.data.bugs._id}`, this.updateBugForm.value).subscribe(
      (response: any) => {
        this.snackBar.open(JSON.stringify(response.message));
      }
    );
    this.dialogRef.close();
  }


  close() {
    this.dialogRef.close();
  }
}
