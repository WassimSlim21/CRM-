import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { Account } from 'src/app/core/models/account';
import { ApiService } from 'src/app/core/service/api.service';
import { ComfirmDialogComponent, ConfirmDialogModel } from 'src/app/popup/comfirm-dialog/comfirm-dialog.component';
import { UpdateAccountRoleComponent } from 'src/app/popup/update-account-role/update-account-role.component';
import { Router } from '@angular/router';
import { AddAccountComponent } from 'src/app/popup/add-account/add-account.component';

declare interface Role {
  id: string;
  role: string;
}
export const Roles: Role[] = [
  { id: '1', role: 'admin' },
  { id: '2', role: 'super-admin' }
];
@Component({
  selector: 'app-espace-administarteur',
  templateUrl: './espace-administarteur.component.html',
  styleUrls: ['./espace-administarteur.component.scss']
})
export class EspaceAdministarteurComponent implements OnInit {
  isLoading = true;
  menuRoles: any[];
  displayedColumns: string[] = ['user_id', 'userName', 'role', 'email', 'star'];
  dataSource: MatTableDataSource<Account>;
  accounts: Account[];
  selectedRole: string;
  result: any;
  myAccount = JSON.parse(localStorage.getItem('account'));

  constructor(private apiService: ApiService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ComfirmDialogComponent>,
    public router: Router) { }

  ngOnInit(): void {

    let account = JSON.parse(localStorage.getItem('account'));
    if (account.role != "super-admin") {
      this.router
    }
    this.menuRoles = Roles.filter(menuItem => menuItem);

    this.getAllAccounts();
  }

  comfirmDialog(element: any): void {
    const message = `Are you sure you want to do this?`;
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result === true) {
        this.apiService.apiDelete(`account/${element._id}`).subscribe(
          (response: any) => {
            console.log('delete' + response);
            this.snackBar.open(JSON.stringify(response.message));
            this.getAllAccounts();
          }
        );
        this.dialogRef.close();
      }
    });
  }
  addNewAccountDialog() {
    const dialogRef = this.dialog.open(AddAccountComponent, {
      disableClose: false,

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllAccounts();
    });

  }
  getAllAccounts() {
    this.apiService.apiGetAll('account/get').subscribe(
      (response: any) => {
        if (response) {
          this.accounts = response;
          console.log(this.accounts);
          this.dataSource = new MatTableDataSource<Account>(this.accounts);

          this.isLoading = false;
        }
      },
      error => {
        console.log(error);
      });
  }

  openDialog(compte): void {
    const dialogRef = this.dialog.open(UpdateAccountRoleComponent, {
      disableClose: false,
      data: {
        account: compte
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllAccounts();
    });
  }


}
