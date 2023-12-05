import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatChipInputEvent, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { SocialAccountDetailsComponent } from '../social-account-details/social-account-details.component';
@Component({
  selector: 'app-tag-details',
  templateUrl: './tag-details.component.html',
  styleUrls: ['./tag-details.component.scss']
})
export class TagDetailsComponent implements OnInit {
  socialAccount: any;
  removable = true;
  selectable = true;
  isLoading = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(public dialogRef: MatDialogRef<TagDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private Api: ApiService, private router: Router,   private snackBar: MatSnackBar,public dialog: MatDialog
    ) { }

  ngOnInit() {
    console.log(this.data.tag.name, this.data.tag._id);
    this.loadAccount(this.data.tag._id);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  remove(element: any, synonym: any): void {
    const index = element.synonyms.indexOf(synonym);
    if (index >= 0) {
     element.synonyms.splice(index, 1);
    }

    this.Api.apiPut('tag', { id: element._id , synonyms: element.synonyms.join()}).
    subscribe((reponse: any) => { // sends post request to the apiService
      this.snackBar.open(JSON.stringify(reponse.message)); }
      );

  }
  add(event: MatChipInputEvent, element: any): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      element.synonyms.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.Api.apiPut('tag', { id: element._id , synonyms: element.synonyms.join()}).
    subscribe((reponse: any) => { // sends post request to the apiService
      this.snackBar.open(JSON.stringify(reponse.message)); }
      );
      }
  loadAccount(tagId): void {
    this.Api.apiGetAll('socialAccount/tag/' + tagId).subscribe(
      (socialAccount: any) => {
        if (socialAccount) {
          this.isLoading = false;
          this.socialAccount = socialAccount;
          console.log('socialAccount aaaaaa', this.socialAccount);
        }
      },
    error => {
      console.log(error);
    });
}

openDialog(id): void {
  const dialogRef = this.dialog.open(SocialAccountDetailsComponent, {
    disableClose: false,
    panelClass: 'app-full-bleed-dialog',
    height: '90%',
    width: '50%',

    data: {
      id
    }

  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
}
