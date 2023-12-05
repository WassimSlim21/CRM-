import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource, PageEvent, MatDialog } from '@angular/material';
import * as moment from 'moment';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import { SocialAccount } from 'src/app/core/models/social_account';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { SocialAccountDetailsComponent } from 'src/app/popup/social-account-details/social-account-details.component';


@Component({
  selector: 'app-social-accounts',
  templateUrl: './social-accounts.component.html',
  styleUrls: ['./social-accounts.component.scss']
})
export class SocialAccountsComponent implements OnInit {
  isLoading = false;
  filterForm: FormGroup = new FormGroup({
    name: new FormControl(),
    tagCtrl: new FormControl()
  });
  displayedColumns: string[] = ['cover', 'remote_id',  'title', 'provider', 'flagged_at', 'flagged_cause', 'created_at', 'updated_at'];
  dataSource: any;
  socialAccounts: SocialAccount[] = [];

  selectedOption: string;
  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number;
  pageSize = 5;
  length: number;
  pageSizeOptions: number[] = [5, 10];
  moment = moment;
  socialAccountId: any;

  /* -------------tag auto complete variables ------------*/

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: any[] = [];


  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto',  {static: false}) matAutocomplete: MatAutocomplete;
  constructor(private socialAccountService: ApiService, private router: Router, public dialog: MatDialog, private fb: FormBuilder) {
   }

  ngOnInit() {
    this.getAllTags();
    this.getSocialAccounts(1);







    this.filterForm.valueChanges.subscribe(value => {

      this.getFilteredSocialAccounts({name: value.name, tags : this.tags});

    });
  }
  getFilteredSocialAccounts(value: any) {
    this.socialAccountService.apiPost('socialAccount/search', value).subscribe(
      (data: any) => {
        if (data) {
          this.isLoading = false;

          this.socialAccounts = data ;
          console.log(data);
          this.dataSource = new MatTableDataSource<SocialAccount>(this.socialAccounts);
          console.log('social_accounts', this.socialAccounts);
        }
      },
    error => {
      console.log(error);
    });

  }


   getAllTags() {
    this.socialAccountService.apiGetAll('tag/all').subscribe(
      (data: any) => {
        if (data) {
        data.forEach(tag => {
           this.allTags.push(tag.name);
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

  getSocialAccounts(page) {

    this.socialAccountService.apiGetAll('socialAccount?pageNo=' + page + '&size=' + this.pageSize).subscribe(
      (data: any) => {
        if (data) {
          this.isLoading = false;
          this.length = data.total;
          this.pageIndex = data.pageIndex;
          this.socialAccounts = data.social_accounts;
          this.dataSource = new MatTableDataSource<SocialAccount>(this.socialAccounts);
          console.log('social_accounts', this.socialAccounts);
        }
      },
    error => {
      console.log(error);
    });
  }




  // Pagination Methods
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  onPaginateChange(event?: PageEvent) {
    this.pageSize = event.pageSize;
    if (event.pageIndex < 1) {
      event.pageIndex = event.pageIndex + 1;
    }
    this.getSocialAccounts(event.pageIndex);
  }

  openDialog(id): void {
    this.socialAccountId = id;
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
    /* ----------------------- Tag input Autocomplete ------------------ */
    add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.tags.push(value.trim());
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
      this.tags.push(event.option.viewValue);
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


}
