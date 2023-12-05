import { Component, OnInit, ViewChild, EventEmitter, Output, Input, HostListener } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { MatDialog, MatSliderChange } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Company } from 'src/app/core/models/company';
import { User } from 'src/app/core/models/users';
import { CompanyUsersComponent } from 'src/app/popup/company-users/company-users.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Output() listChange = new EventEmitter<string[]>();

  isLoading = true;
  filterForm: FormGroup;
  displayedColumns: string[] = ['name', 'company_type',  'website', 'users'];
  dataSource: MatTableDataSource<Company>;
  companyType: any[] = [
    { value: 0, name: 'agency' },
    { value: 1, name: 'Brand' },
    { value: 2, name: 'other' }
  ];
  companys: Company[] = [];
  users: User[];
  selectedOption: string;
  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number;
  pageSize = 5;
  length: number;
  pageSizeOptions: number[] = [5, 10];
  moment = moment;
  packs: any;

  @Input() userId: any;
  constructor(private companyService: ApiService, private router: Router, public dialog: MatDialog, private fb: FormBuilder) {
  }
  ngOnInit() {

    this.getCompanys(1);
    console.log("heheheheheh")
    document.body.scrollTo(0, 0);
    this.selectedOption = 'agency';
    this.filterForm = this.fb.group({
      name: new FormControl(),
      type: new FormControl(),
      website: new FormControl(),
    });
    this.filterForm.valueChanges.subscribe(value => {
      this.listChange.emit(value);
      console.log('filter', value);
      this.getFilteredCompany(value);
    });
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }
  onPaginateChange(event?: PageEvent) {
    this.pageSize = event.pageSize;
    if (event.pageIndex < 1) {
      event.pageIndex = event.pageIndex + 1;
    }
    this.getCompanys(event.pageIndex);
  }

  getFilteredCompany(body: any) {

    this.companyService.apiPost('company/search', body).subscribe(
      (companys: any) => {
        console.log('filtered companys : ' + companys);
        if (companys) {
          this.isLoading = false;
          this.companys = companys;
          this.dataSource = new MatTableDataSource<Company>(this.companys);
        }
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }


  getCompanys(page) {

    this.companyService.apiGetAll('company?pageNo=' + page + '&size=' + this.pageSize).subscribe(
      (companys: any) => {
        if (companys) {
          this.isLoading = false;
          this.length = companys.total;
          this.pageIndex = companys.pageIndex;
          this.companys = companys.company;
          this.dataSource = new MatTableDataSource<Company>(this.companys);
          console.log('companies', this.companys);
        }
      },
    error => {
      console.log(error);
    });
  }


  openDialog(id, name): void {
    this.userId = id;
    const dialogRef = this.dialog.open(CompanyUsersComponent, {
      disableClose: false,
      panelClass: 'app-full-bleed-dialog',
      height : '50%' ,
      width : '50%',
      data: {
        id,
        name

      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

