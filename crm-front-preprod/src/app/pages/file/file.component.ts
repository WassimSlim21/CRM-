import { Component, OnInit, ViewChild, EventEmitter, Output, Input, Inject, ElementRef } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { ApiService } from 'src/app/core/service/api.service';
import * as moment from 'moment';
import { HttpHeaders, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { CommentsComponent } from 'src/app/popup/comments/comments.component';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  moment = moment;
  allFiles: any[] = [];
  files: any[] = [];
  extensions: any[] = [];
  isLoadingStats = true;
  filterForm: FormGroup;
  @Output() listChange = new EventEmitter<string[]>();
  filesChoice: string;
  id: any;
  openPopup: Function;
  myText: any = '';
  accounts: any[];

  constructor(private apiService: ApiService, public dialog: MatDialog, private fb: FormBuilder,
              public dialogRef: MatDialogRef<FileComponent>, private snackBar: MatSnackBar,
              public router: Router
              ) { }

  ngOnInit() {
    this.getAllAccounts();
    this.id = JSON.parse(localStorage.getItem('account'))._id;
    this.getAllFiles();
    this.filterForm = this.fb.group({
      name: new FormControl(''),
      type: new FormControl(''),
      account_id: new FormControl(''),
      created_at: new FormControl()
    });
    this.filterForm.valueChanges.subscribe(value => {
      this.listChange.emit(value);
      console.log('filter', value);
      this.getFilteredFile(value);
    });
  }

  getAllAccounts() {
    this.apiService.apiGetAll('account/get').subscribe(
      (response: any) => {
        if (response) {
          this.accounts = response;
          console.log(this.accounts);
        }
      },
    error => {
      console.log(error);
    });
  }

  setPopupAction(fn: any) {
    console.log('setPopupAction');
    this.openPopup = fn;
  }

  /** Filter Files */
  getFilteredFile(value: any) {
    this.apiService.apiPost('file/search', value).subscribe(
      (response: any) => {
        if (response) {
          this.isLoadingStats = false;
          this.allFiles = response;

          this.allFiles.forEach(element => {
            if (element.account_id) {
              if (element.account_id._id === (JSON.parse(localStorage.getItem('account'))._id)) {
                element.deletable = true;
              } else {
                element.deletable = false;
              }
            }
          });

        }
      },
      error => {
        console.log(error);
      });
  }


  getAllFiles() {
    this.apiService.apiGetAll('file').subscribe((response: any) => {
      if (response) {
        this.isLoadingStats = false;
        this.allFiles = response;
        console.log('files,', this.files);

        if (this.allFiles) {
          console.log('files,', this.allFiles);
          this.allFiles.forEach(element => {
            var extension = element.type;

            if (this.extensions.indexOf(extension) === -1) {
              this.extensions.push(extension);
            }
            if (element.account_id) {
              if (element.account_id._id === (JSON.parse(localStorage.getItem('account'))._id)) {
                element.deletable = true;
              } else {
                element.deletable = false;
              }
            }
          });
          console.log('aaaaa', this.extensions);
        }

      }
    },
    error => {
      console.log(error);
      this.isLoadingStats = true;
    });
  }

  getMyFiles() {
    this.apiService.apiGetAll(`file/${this.id}`).subscribe((response: any) => {
      if (response) {
      this.isLoadingStats = true;
      this.allFiles = response;
      if (this.allFiles) {
        this.allFiles.forEach(element => {
          element.deletable = true;
        });
        console.log('the existing files are ', this.allFiles);
      }
    }
    },
    error => {
      console.log(error);
    });
  }

  ChoiceselectionChange(event) {
    console.log(event.value);
    if (event.value === '0') {
      this.isLoadingStats = true;
      this.getAllFiles();
    } else {
      this.isLoadingStats = false;
      this.getMyFiles();
    }
  }


  uploadFile() {
    const formData = new FormData();
    formData.append('account_id', (JSON.parse(localStorage.getItem('account'))._id));
    this.files.forEach(file => {
      formData.append('files', file, file.name);
    });
    console.log('aaaa', formData.getAll('files'));
    this.apiService.apiPostWithOptions('file/add', formData).subscribe(response => {
      console.log(response);
      this.getAllFiles();
      this.apiService.apiPost('notification/',
      {source_id : JSON.parse(localStorage.getItem('account'))._id,
       route : this.router.url,
       content : `New file uploaded by ${JSON.parse(localStorage.getItem('account')).userName}`})
       .subscribe(rep => {
        console.log('notifiier :', rep);
      });
    });
    this.files = [];
    this.getAllFiles();
  }

  /** On Fle Dropped */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(event) {
  // this.files = Object.values( event.target.files);
   this.prepareFilesList(Object.values (event.target.files));
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }



  deleteFileById(file: any) {
    this.apiService.apiDelete(`file/${file._id}`).subscribe((response: any) => {
      console.log(response);

      const index = this.allFiles.indexOf(file, 0);
      if (index > -1) {
        this.allFiles.splice(index, 1);
        this.snackBar.open(JSON.stringify(response.message));
      }
    });

  }


  openDialog(id): void {
    const dialogRef = this.dialog.open(CommentsComponent, {
      disableClose: false,
      height: 'auto',
      width: 'auto',

      data: {
        fileId: id
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



}
