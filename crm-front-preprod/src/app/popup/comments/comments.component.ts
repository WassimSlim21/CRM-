import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import { Account } from 'src/app/core/models/account';
import * as moment from 'moment';
import 'emoji-mart/css/emoji-mart.css';
import { ComfirmDialogComponent, ConfirmDialogModel } from '../comfirm-dialog/comfirm-dialog.component';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
@Component({
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})

export class CommentsComponent implements OnInit {
  socket: any;

  account: Account;
  file: any;
  comments: any;
  moment = moment ;
  myText: any = '';
  body: any;
  account_id: string;
  result: any;
  content: string;

  constructor(private apiService: ApiService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              public router : Router ,
              public dialogRef: MatDialogRef<ComfirmDialogComponent>,
  ) { }

  ngOnInit() {
    console.log(this.data.fileId);
    this.getFiles(this.data.fileId);
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on('comment', (UpdatedfileId: string) => {
      if (UpdatedfileId === this.data.fileId) {
       this.getFiles(this.data.fileId);
      }
    });


  }


  getFiles(id) {
    this.apiService.apiGetAll(`file/own/${id}`).subscribe((response: any) => {
      this.file = response.file;
      this.account = response.file.account_id;
      this.comments = response.file.comments;
      this.comments.forEach(element => {
        if (element.account_id) {
        if ( element.account_id._id === (JSON.parse(localStorage.getItem('account'))._id)) {
            element.deletable = true ;
         } else {
          element.deletable = false ;
         }
        }
      });
      console.log('File : ', this.file);
      console.log('Comments : ', this.comments);
      console.log('Account : ', this.account);
  });
}

socketIoNotification() {

  this.apiService.apiPost('notification/',
  {source_id : JSON.parse(localStorage.getItem('account'))._id,
   route : this.router.url,
   content : `your file ${this.file.name} was commented by ${JSON.parse(localStorage.getItem('account')).userName}`,
   destinations : [this.file.account_id._id]}).subscribe(response => {
    console.log('notifiier :', response);
  });
  const destinations = [];
      // for each comment zid el id fil destination
  this.comments.forEach(element => {
    if (element.account_id) {
      if (element.account_id._id !== (JSON.parse(localStorage.getItem('account'))._id)) {
      if (element.account_id._id !== this.file.account_id._id) {
        if (destinations.indexOf(element.account_id._id) === -1) {
          destinations.push(element.account_id._id);
        }
      }
    }
  }
  });
  if (destinations.length > 0) {
  this.apiService.apiPost('notification/',
  {source_id : JSON.parse(localStorage.getItem('account'))._id,
   route : this.router.url,
   content : `File ${this.file.name} was commented by ${JSON.parse(localStorage.getItem('account')).userName}`,
   destinations}).subscribe(response => {
    console.log('notifiier :', response);
  });
  }

}
addComment() {
  this.content = this.myText;
  this.account_id = JSON.parse(localStorage.getItem('account'))._id;
  this.apiService.apiPost(`file/comment/` + this.data.fileId,
  {account_id: this.account_id, content: this.content}).subscribe((response: any) => {
    this.socket.emit('comment', this.data.fileId);
    console.log(response);
    this.myText = '';
    this.getFiles(this.data.fileId);
  });
  this.socketIoNotification();
}



comfirmDialog(id_comment: any): void {
  const message = `Are you sure you want to do this?`;
  const dialogData = new ConfirmDialogModel('Confirm Action', message);
  const dialogRef = this.dialog.open(ComfirmDialogComponent, {
    maxWidth: '400px',
    data: dialogData
  });
  dialogRef.afterClosed().subscribe(dialogResult => {
    this.result = dialogResult;
    if (this.result === true) {
      this.apiService.apiPut(`file/comment/${this.file._id}`, {comment_id : id_comment}).subscribe(
        (response: any) => {
          this.socket.emit('comment', this.data.fileId);
          console.log('delete' + response);
          this.snackBar.open('Comment Deleted!');
          this.getFiles(this.data.fileId);
        }
      );
    }
  });
}

}
