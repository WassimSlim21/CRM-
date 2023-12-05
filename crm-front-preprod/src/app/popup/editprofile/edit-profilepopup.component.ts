import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ApiService } from 'src/app/core/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/core/models/account';
import { AccountNotifyChangeService } from 'src/app/core/service/account-notify-change.service';
@Component({
  selector: 'app-edit-profilepopup',
  templateUrl: './edit-profilepopup.component.html',
  styleUrls: ['./edit-profilepopup.component.scss']
})
export class EditProfilepopupComponent implements OnInit {
  updateForm: FormGroup;
  submitted = false;
  // isShow = true;
  // toggleDisplay() {
  //   this.isShow = !this.isShow;
  // }


  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditProfilepopupComponent>, private accountService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountNotifyChangeService: AccountNotifyChangeService,
    private formBuilder: FormBuilder) {
    }




  ngOnInit() {


    this.updateForm = this.formBuilder.group({
      userName: [JSON.parse(localStorage.getItem('account')).userName, Validators.required],

      email: [JSON.parse(localStorage.getItem('account')).email, [Validators.required, Validators.email]],

  });
    this.updateForm.valueChanges.subscribe(value => {
    console.log('value', value);


  });
  }
  get f() { return this.updateForm.controls; }



  updateUser() {
    if (this.updateForm.invalid) {
      this.snackBar.open('please verify the form');
      return ;

}
    // console.log(this.updateForm.controls.value);
    this.submitted = true;
    const data = this.updateForm.value;



/*
    this.accountService.update(this.updateForm.value).subscribe(
      res => {
        this.snackBar.open('account succefully updated');
        this.accountNotifyChangeService.announceChange();
        this.dialogRef.close();
      }
      ,
      error => {
        console.log(error);
        this.snackBar.open('Failed to update ' + JSON.stringify(error));
      },
      );
      */
    const account = {
      userName : this.updateForm.controls.userName.value ,
      email : this.updateForm.controls.email.value ,
      _id : JSON.parse(localStorage.getItem('account'))._id,
      role : JSON.parse(localStorage.getItem('account')).role};
    this.accountService.update(account)
    .subscribe((reponse: any) => { // sends post request to the apiService
      this.snackBar.open(JSON.stringify(reponse.message));
      this.dialogRef.close();
      localStorage.removeItem('account');
      localStorage.setItem('account', JSON.stringify(account));

     });

}
onReset() {
 this.dialogRef.close();
}
}



