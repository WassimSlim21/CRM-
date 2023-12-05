import { Component, OnInit, ViewChild, EventEmitter, Output, Input, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { MatDialog, MatSliderChange, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ConfirmDialogModel, ComfirmDialogComponent } from 'src/app/popup/comfirm-dialog/comfirm-dialog.component';
import { BenchmarkDetailsComponent } from 'src/app/popup/benchmark-details/benchmark-details.component';
import { element } from 'protractor';

@Component({
  selector: 'app-benchmarks',
  templateUrl: './benchmarks.component.html',
  styleUrls: ['./benchmarks.component.scss']
})
export class BenchmarksComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Output() listChange = new EventEmitter<string[]>();


  isLoading = true;
  filterForm: FormGroup;
  displayedColumns: string[] = ['name', 'type', 'owner', 'tags', 'star'];
  dataSource: MatTableDataSource<any>;
  benchmarkTypes: any[] = [
    { value: 'custom-benchmark	', name: 'custom-benchmark' },
    { value: 'sectorial-benchmark', name: 'sectorial-benchmark' },
    { value: 'regional-benchmark', name: 'regional-benchmark' }
  ];
  benchmarks: any[] ;
  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number;
  pageSize = 5;
  length: number;
  pageSizeOptions: number[] = [5, 10];
  moment = moment;
  result: any;
  constructor(private apiService: ApiService, private router: Router, public dialog: MatDialog, private fb: FormBuilder,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ComfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, ) {
  }
  ngOnInit() {
    this.getBenchmarks(1);
    this.pageEvent.pageIndex = 1;
    this.filterForm = this.fb.group({
      name: new FormControl(),
      type: new FormControl(),
    });

    this.filterForm.valueChanges.subscribe(value => {
      this.listChange.emit(value);
      console.log('filter', value);
      this.getFilteredBenchmarks(value);
    });
  }
  getFilteredBenchmarks(value: any) {
    this.apiService.apiPost('benchmark/search', value).subscribe(
      (response: any) => {
        if (response) {
          this.isLoading = false;
          response.forEach( (elem: any) => {
            console.log('tag', elem);
            elem.tagNames = [];

            elem.tags.forEach((tag: any) => {
              elem.tagNames.push(tag.name);
            });
          });
        //  this.benchmarks.tags =
          this.benchmarks = response;


          this.dataSource = new MatTableDataSource<any>(this.benchmarks);
          this.benchmarks = response;
          this.dataSource = new MatTableDataSource<any>(this.benchmarks);
        }
      },
      error => {
        console.log(error);
      });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  onPaginateChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    if (event.pageIndex < 1) {
      event.pageIndex = event.pageIndex + 1;
    }
    console.log('p',event.previousPageIndex);
    console.log("page Index", event.pageIndex);

    this.getBenchmarks(event.pageIndex);
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(BenchmarkDetailsComponent, {
      disableClose: false,
      height: '70%',
      width: '50%',
      data: {
        id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getBenchmarks(page) {
    this.apiService.apiGetAll('benchmark?pageNo=' + page + '&size=' + this.pageSize).subscribe(
      (benchmarks: any) => {
        if (benchmarks) {
          this.isLoading = false;
          this.length = benchmarks.total;
          this.pageIndex = benchmarks.pageIndex;
          benchmarks.benchmarks.forEach( (elem: any) => {
            console.log('tag', elem);
            elem.tagNames = [];

            elem.tags.forEach((tag: any) => {
              elem.tagNames.push(tag.name);
            });
          });
          this.benchmarks = benchmarks.benchmarks;


          this.dataSource = new MatTableDataSource<any>(this.benchmarks);
        }
      },
      error => {
        console.log(error);
      });
  }

  comfirmDialog(benchmark: any): void {
    const message = `Are you sure you want to do this?`;
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      const index = this.benchmarks.indexOf(benchmark);
      if (this.result === true) {
        this.apiService.apiDelete(`benchmark/${benchmark._id}`).subscribe(
          (response: any) => {
            console.log('delete' + response);
            this.snackBar.open(JSON.stringify(response.message));
            this.getBenchmarks(this.pageIndex);
          }
        );
        this.dialogRef.close();
      }
    });
  }

}
