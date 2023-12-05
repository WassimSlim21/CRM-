import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, MatDialog,
  MatChipInputEvent, MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import { Router } from '@angular/router';
import { UserDetailsComponent } from '../user-details/user-details.component';
import * as moment from 'moment';
import { TagDetailsComponent } from '../tag-details/tag-details.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-social-account-details',
  templateUrl: './social-account-details.component.html',
  styleUrls: ['./social-account-details.component.scss']
})
export class SocialAccountDetailsComponent implements OnInit {
  socialAccount: any;
  users: any;
  tag: any;
  tags: any[];
  benchmarks: any;
  moment = moment;

   /* -------------tag auto complete variables ------------*/

   visible = true;
   selectable = true;
   removable = true;
   separatorKeysCodes: number[] = [ENTER, COMMA];
   filteredTags: Observable<any[]>;
   allTags: any[] = [];
   allTagObjects: any[] = [] ;


   @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
   @ViewChild('auto',  {static: false}) matAutocomplete: MatAutocomplete;
  filterForm: FormGroup = new FormGroup({
    tagCtrl: new FormControl()
  });



  constructor(public dialogRef: MatDialogRef<SocialAccountDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private Api: ApiService, private router: Router,
              private snackBar: MatSnackBar, public dialog: MatDialog) { }


  ngOnInit() {
    this.loadSocialAccount(this.data.id);
    this.getAllTags();
  }

  // TagDetails


  openDialogTagDetails(tag): void {
    this.tag = tag;
    const dialogRef = this.dialog.open(TagDetailsComponent, {
      disableClose: false,
      height : 'auto' ,
      width : 'auto',

      data: {
        tag: this.tag
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // Get Social Account By Id
  loadSocialAccount(id): void {
    this.Api.apiGetAll('socialAccount/' + id).subscribe(
      (socialAccount: any) => {
        if (socialAccount) {
          this.socialAccount = socialAccount.social_account;
          this.users = socialAccount.users;
          this.tags = socialAccount.social_account.tags;
          this.benchmarks = socialAccount.benchmarks;
          this.tags.forEach(element => {
            if (element.synonyms) {
              element.synonyms = element.synonyms.split(',');
               } else {
                element.synonyms = [];
               }
              });
          console.log('All', socialAccount);
          console.log('socialAccount', this.socialAccount);
          console.log('users', this.users);

        }
      }
    );
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      disableClose: false,
      height: '90%',
      position: { right: '10' },
      data: {
        userId: id
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }




  getAllTags() {
    this.Api.apiGetAll('tag/all').subscribe(
      (data: any) => {
        if (data) {
        data.forEach(tag => {
           this.allTags.push(tag.name);
           this.allTagObjects.push(tag);
         });
        this.filteredTags = this.filterForm.controls.tagCtrl.valueChanges.pipe(
      //  startWith(null),
        map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));

        }
      },
    error => {
      console.log(error);
    });

  }
    /* ----------------------- Tag input Autocomplete ------------------ */
    add(event: MatChipInputEvent): void {

      const input = event.input;
      const value = event.value;
      // Add our fruit
      if ((value || '').trim()) {
        this.tags.push(this.allTagObjects.find(e => e.name === (value.trim())));
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }


      this.filterForm.controls.tagCtrl.setValue(null);
    }


    remove(tag: string): void {
      const index = this.tags.indexOf(tag);

      if (index >= 0) {
        this.tags.splice(index, 1);
      }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
      this.tags.push(this.allTagObjects.find(e => e.name === (event.option.viewValue)));
      this.tagInput.nativeElement.value = '';
      this.filterForm.controls.tagCtrl.setValue(null);
    }


    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();


      return this.allTags.filter( (element) => {
        if (element) {
        return element.toLowerCase().indexOf(filterValue) === 0;
        }
        return false ;
      });
    }

    updateSocialAccount() {
      this.Api.apiPut(`socialAccount/${this.socialAccount._id}`, this.tags).subscribe((response: any) => {
        this.snackBar.open(response.message);
      });
    }




}
