import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { ApiService } from 'src/app/core/service/api.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-account-role',
  templateUrl: './update-account-role.component.html',
  styleUrls: ['./update-account-role.component.scss']
})
export class UpdateAccountRoleComponent implements OnInit {
  roles: any[] = [
    { value: 0, name: 'admin' },
    { value: 1, name: 'super-admin' }
  ];
  selected: any = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<UpdateAccountRoleComponent>,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              public apiService: ApiService

  ) { }

  ngOnInit(): void {
  }
  updateRole() {
    this.apiService.apiPut(`account/update/${this.data.account._id}`, { role : this.selected}).subscribe(
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
