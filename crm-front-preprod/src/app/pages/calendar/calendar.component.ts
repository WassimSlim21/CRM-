import {
  Component, OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import * as moment from 'moment';
import { ApiService } from 'src/app/core/service/api.service';
import { MatDialog } from '@angular/material';
import { EventDetailsComponent } from 'src/app/popup/event-details/event-details.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  myAccountId = JSON.parse(localStorage.getItem('account'))._id ;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  state = 'Upcoming';
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  // Actions
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
    //    this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
    //    this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();
  dateTest: any = new Date().toISOString().split('Z')[0];


  // Events
  events: any[] = [
  ];
  activeDayIsOpen = true;

  constructor(private modal: NgbModal, private apiService: ApiService,public dialog: MatDialog, public router: Router) {}
  ngOnInit(): void {
    console.log(this.router.url);
    this.loadEvents();
  }
/* On Day Click*/
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

/** Time change */

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {


        iEvent.stringStart =  moment((newStart) ).seconds(0).milliseconds(0).toISOString().split('Z')[0];
        iEvent.stringEnd =  moment((newEnd)).seconds(0).milliseconds(0).toISOString().split('Z')[0];
        this.updateEvent({
          ...event,
          start: newStart,
          end: newEnd,
        });
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
   // this.handleEvent('Dropped or resized', event);

  }
  openDialog(event): void {
    const dialogRef = this.dialog.open(EventDetailsComponent, {
      disableClose: false,
      panelClass: 'app-full-bleed-dialog',
      height : 'auto' ,
      width : 'auto',
      data: {
        event
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
    console.log(event);
    this.openDialog(event);
  }

  addEvent(): void {
    const newEvent: any = {
      state: 'Upcoming',
      account_id: JSON.parse(localStorage.getItem('account'))._id,
      title: 'New event',
      description : 'add description',
      stringStart: moment((new Date())).seconds(0).milliseconds(0).toISOString().split('Z')[0],
      stringEnd: moment(addDays(new Date(), 1)).seconds(0).milliseconds(0).toISOString().split('Z')[0],
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    };
    newEvent.start = new Date(newEvent.stringStart);
    newEvent.end = new Date(newEvent.stringEnd);

    this.state = 'Upcoming';
    this.refresh.next();

    this.apiService.apiPost('event', newEvent ).subscribe((reponse: any) => {
      console.log(reponse);
      newEvent._id = reponse.event._id ;
      newEvent.account_id = JSON.parse(localStorage.getItem('account')) ;
      this.events = [
        newEvent,
        ...this.events,

      ];
      this.apiService.apiPost('notification/',
      {source_id : JSON.parse(localStorage.getItem('account'))._id,
       route : this.router.url,
       content : `New Event created by ${JSON.parse(localStorage.getItem('account')).userName}`})
       .subscribe(rep => {
        console.log('notifiier :', rep);
      });
    });
  }

  deleteEvent(eventToDelete: any) {

    this.apiService.apiDelete(`event/${eventToDelete._id}`).subscribe(reponse => {
      console.log('reponse', reponse);
    });
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }



  dateChanged(event: any, e  ) {

    if  (event.start > event.end) {
      event.end = event.start ;
      event.stringEnd = moment(event.end).toISOString().split('Z')[0];
      (document.activeElement as HTMLElement).blur();
      return false ;
     } else {
     event.start = new Date(event.stringStart);
     event.end = new Date(event.stringEnd);
     this.refresh.next();
     this.updateEvent(event);
  }
  }


  loadEvents() {
    this.apiService.apiGetAll('event').subscribe((reponse: any) => {
      reponse.forEach(evnt => {
        evnt.stringStart = moment(evnt.start).toISOString().split('Z')[0],
        evnt.stringEnd = moment(evnt.end).toISOString().split('Z')[0],
        evnt.start = new Date(evnt.stringStart);
        evnt.end = new Date(evnt.stringEnd);
        this.events.push(evnt);
        this.refresh.next();
        if (evnt.account_id._id !== JSON.parse(localStorage.getItem('account'))._id ) {
          evnt.resizable.beforeStart = false;
          evnt.resizable.afterEnd = false;
          evnt.draggable = false ;
          }
        if (evnt.end < Date.now()) {
            evnt.state = 'Previous';
            evnt.resizable.beforeStart = false;
            evnt.resizable.afterEnd = false;
            evnt.draggable = false ;
          } else
        if (evnt.start > Date.now()) {
          evnt.state = 'Upcoming' ;
        } else
        {
          evnt.state = 'Ongoing' ;

        }


      });
    });
  }


  updateEvent(newEvent: any) {
    this.apiService.apiPut(`event/${newEvent._id}`, newEvent).subscribe((reponse: any) => {
     console.log(reponse);
    });

  }


  remind(event: any) {
    this.apiService.apiPost('notification/',
    {source_id : JSON.parse(localStorage.getItem('account'))._id,
     route : this.router.url,
     content : `Event (${event.title})  ${moment(event.start).fromNow()}`})
     .subscribe(rep => {
       console.log(rep);
       event.reminded = true ;

    });
  }

}
