import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog, } from '@angular/material';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import { ComfirmDialogComponent } from '../comfirm-dialog/comfirm-dialog.component' ;
import { ConfirmDialogModel } from '../comfirm-dialog/comfirm-dialog.component' ;


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent implements OnInit {
  user: any ;
  userId: any;
  image: any ;
  packs: any ;
  selectedPack: string;
  result: any;



  constructor(
    private Api: ApiService, private router: Router,   private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog) {

    }

  ngOnInit() {
    this.loadUser();
    this.loadPacks();
    console.log(this.user);

  }

  loadUser(): void {
    this.userId = this.data.userId ;
    this.Api.getUserAllData(this.userId).subscribe(
      user => {
        this.user = user ;
        this.user.data = user.data;
     //   this.user.actions = JSON.parse(user.actions);
        this.image = 'https://graph.facebook.com/961482093939704/picture?height=150&width=150' ;
        this.user.dashboards.forEach(element => {
        if ( element.type === 'SocialAccount') {
          element.color = 'primary';
         } else if (element.type === 'Benchmark') {
         element.color = 'accent' ;
        }
        });
        console.log(this.user);
      },
      error => {
        console.log(error);
        this.snackBar.open('Failed to load user with Id' + this.userId);
      }
    );
}


loadPacks(): void {
this.Api.apiGetAll('pack').subscribe(
  packs => {
    this.packs = packs ;
  },
  error => {
    console.log(error);
    this.snackBar.open('Failed to load packs');
  }
);
}





updateUserPack(): void {
  this.user.pack = this.selectedPack ;
  console.log(this.user);
  this.Api.apiPut(`user/${this.user._id}`, {pack: this.user.pack}).subscribe(
      (response: any) => {
        this.snackBar.open(JSON.stringify(response.message));
      }
  );
  this.loadUser();

}


comfirmDialog(): void {
  const message = `Are you sure you want to do this?`;

  const dialogData = new ConfirmDialogModel('Confirm Action', message);

  const dialogRef = this.dialog.open(ComfirmDialogComponent, {
    maxWidth: '400px',
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    this.result = dialogResult;
    if ( this.result === true) {
      this.Api.apiDelete(`user/${this.user._id}`).subscribe(
        (response: any) => {
          console.log('delete' + response);
          this.snackBar.open(JSON.stringify(response.message));
        }
    );
      const url = `https://api.kpeiz.digital/delete/user/${this.user._id}`;
    //  const fenetre = window.open(url, '_blank');
     // setTimeout( () => { fenetre.close(); }, 100 );

      this.dialogRef.close();
  }
  });
}



}


