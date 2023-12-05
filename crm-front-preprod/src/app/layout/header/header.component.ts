import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EditProfilepopupComponent } from 'src/app/popup/editprofile/edit-profilepopup.component';
import { ApiService } from 'src/app/core/service/api.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ROUTES } from '../sidebar/sidebar.component';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client';
import * as moment from 'moment';
declare interface Notification {
  content: any;
  created_at: any;
  destinations: any [];
  seen: any;
  source_id: any;
  _id: any;
  route;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  moment = moment ;
  loadedSeen = false ;
  private listTitles: any[];
  socket: any;
  notifications: Notification[];
  location: Location;
  // tslint:disable-next-line: variable-name
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  constructor(location: Location,
              public apiService: ApiService,
              private router: Router,
              public dialog: MatDialog,
              private authService: ApiService,
              private element: ElementRef) {

  }
  ngOnInit() {
    this.setupSocketNotifHandler();
    this.loadNotifications();
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      const $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });

  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(() => {
      toggleButton.classList.add('toggled');
    }, 500);


    this.sidebarVisible = true;
  }


  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  }

  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    const $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName('body')[0];

    if (this.mobile_menu_visible === 1) {
      // $('html').removeClass('nav-open');
      body.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(() => {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(() => {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');


      if (body.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (body.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
      }

      setTimeout(() => {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function () { // asign a function
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(() => {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      body.classList.add('nav-open');
      this.mobile_menu_visible = 1;

    }
  }



  openDialog(): void {
    this.sidebarClose();
    const dialogRef = this.dialog.open(EditProfilepopupComponent, {
      disableClose: false,
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }




  logout(): void {
    this.authService.setLoggedOut();
    this.router.navigate(['/login']);
  }


  setupSocketNotifHandler() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('Notification', (data: any) => {
      this.notifications = [];
      this.loadNotifications();
    });
  }

  loadNotifications() {
    this.notifications = [];
    this.apiService.apiGetAll('notification/' +  JSON.parse(localStorage.getItem('account'))._id).subscribe(
      (response: any) => {
      if (response) {
      this.notifications = response ;
      this.loadedSeen = false ;
      }
     },
     error => {
       console.log(error);
     }
      );
  }
  loadSeenNotifications() {
    this.apiService.apiGetAll('notification/seen/' +  JSON.parse(localStorage.getItem('account'))._id).subscribe((response: any) => {
      this.notifications = response ;
      this.loadedSeen = true ;
     } );
  }

  notificationsOpened() {
      if (this.notifications.length > 0) {
        this.notifications.forEach(notif => {
          notif.seen = true;
          this.apiService.apiPut(`notification/${notif._id}`, { userId: JSON.parse(localStorage.getItem('account'))._id })
            .subscribe((response: any) => {
            //  this.notifications = response;
           //      console.log('notifications', this.notifications);
            });
        });
      }


  }


}
