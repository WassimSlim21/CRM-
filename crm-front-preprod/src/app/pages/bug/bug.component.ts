import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { AddBugComponent } from 'src/app/popup/add-bug/add-bug.component';
import { Bug } from 'src/app/core/models/bug';
import * as moment from 'moment';
import { ConfirmDialogModel, ComfirmDialogComponent } from 'src/app/popup/comfirm-dialog/comfirm-dialog.component';
import { log } from 'util';
import { ListUserAssignedBugComponent } from 'src/app/popup/list-user-assigned-bug/list-user-assigned-bug.component';
import { BugDetailsComponent } from 'src/app/popup/bug-details/bug-details.component';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.scss']
})
export class BugComponent implements OnInit {
  socket: any;

  bugs: Bug[];
  moment = moment;
  result: any;
  bug: Bug;
  newBug: Bug[] = [];
  inProgress: Bug[] = [];
  readyForTest: Bug[] = [];
  done: Bug[] = [];
  needInfo: Bug[] = [];
  archived: Bug[] = [];
  showArchived = false ;

  panelOpenState = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BugComponent>
  ) { }

  ngOnInit() {
    this.getAllBugs();
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('bug', (account_id: any) => {
      if (JSON.parse(localStorage.getItem('account'))._id !== account_id){
      this.getAllBugs();}
    });
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      console.log('event data', event.container.data[event.currentIndex]);
      console.log('event container', event.container.element['nativeElement']['id']);
      this.updateBug(event.container.data[event.currentIndex]['_id'], event.container.element['nativeElement']['id']);
      this.apiService.apiPost('notification/',
      {source_id : JSON.parse(localStorage.getItem('account'))._id,
      route : this.router.url,
      content : `A bug(${event.container.data[event.currentIndex]['name']}) state was updated to ${event.container.element['nativeElement']['id']} by ${JSON.parse(localStorage.getItem('account')).userName}`})
      .subscribe(response => {
        console.log('notifiier :', response);
        this.socket.emit('bug', JSON.parse(localStorage.getItem('account'))._id);

      });


      // console.log('event previousIndex', event.previousIndex);
      // console.log('event currentIndex', event.currentIndex);

    }
  }

  /* Popup Add Bug */

  addBugDialog(): void {
    const dialogRef = this.dialog.open(AddBugComponent, {
      disableClose: false,
      height: 'auto',
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllBugs();
    });

  }


  /* Popup Bug Details and Update */
  OpenBugDetailsDialog(id): void {
    const dialogRef = this.dialog.open(BugDetailsComponent, {
      disableClose: false,
      height: 'auto',
      width: 'auto',
      data: {
        bug_id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllBugs();
    });

  }

  /*Get All Bug*/
  getAllBugs() {
    this.newBug = [];
    this.inProgress = [];
    this.readyForTest = [];
    this.bugs = [];
    this.done = [];
    this.needInfo = [];
    this.archived = [];
    this.apiService.apiGetAll('bug').subscribe(
      (response: any) => {
        if (response) {
          this.bugs = response;
          this.bugs.forEach(element => {
            if (element.archived === true) {
              this.archived.push(element);
            } else
            if (element.etat === 'newBug') {
              this.newBug.push(element);
            } else
            if (element.etat === 'inProgress') {
              this.inProgress.push(element);
            } else
            if (element.etat === 'readyForTest') {
              this.readyForTest.push(element);
            } else
            if (element.etat === 'done') {
              this.done.push(element);
            } else
            if (element.etat === 'needInfo') {
              this.needInfo.push(element);
            }
          });
          console.log(this.bugs);
        }
      },
      error => {
        console.log(error);
      });
  }

  /* Update Bug State */

  updateBug(id: any, etat: any) {
    this.apiService.apiPut(`bug/${id}`, { 'etat': etat }).subscribe(
      (response: any) => {
        this.snackBar.open(JSON.stringify(response.message));
      }
    );
  }

  /* Delete Bug */
  comfirmDialog(bug: Bug): void {
    const message = `Are you sure you want to do this?`;
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result === true) {
        this.apiService.apiDelete(`bug/${bug._id}`).subscribe(
          (response: any) => {
            console.log('delete' + response);
            this.snackBar.open(JSON.stringify(response.message));
            this.getAllBugs();

            this.apiService.apiPost('notification/',
            {source_id : JSON.parse(localStorage.getItem('account'))._id,
            content : `A bug (${bug.name}) was deleted by ${JSON.parse(localStorage.getItem('account')).userName}`})
            .subscribe( resp => {
              console.log('notifiier :', resp);
              this.socket.emit('bug', JSON.parse(localStorage.getItem('account'))._id);

            });


          }
        );
        this.dialogRef.close();
      }
    });
  }

  openDialogListUser(bugselected): void {
    const dialogRef = this.dialog.open(ListUserAssignedBugComponent, {
      disableClose: false,
      height: 'auto',
      width: '20%',
        data: {
        bug: bugselected
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllBugs();

    });
  }


  archive( bug: any, state: any) {
    this.apiService.apiPut(`bug/updateBug/${bug._id}`, {archived : state}).subscribe(
      (response: any) => {
        if (state === true ) {
        this.snackBar.open(JSON.stringify('bug archived'));
        const index = this.done.map((e) =>  e._id).indexOf(bug._id);
        if (index > -1) {
           this.done.splice(index, 1);
           this.archived.push(bug);
         }
       } else {
        this.snackBar.open(JSON.stringify('bug unarchived'));
        const index = this.archived.map((e) =>  e._id).indexOf(bug._id);
        if (index > -1) {
           this.archived.splice(index, 1);
           this.done.push(bug);
         }
       }
      }
    );
  }

}
