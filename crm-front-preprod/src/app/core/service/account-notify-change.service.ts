import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountNotifyChangeService {
  private userAnnouncedChange = new Subject<boolean>();

  usreAnnounced = this.userAnnouncedChange.asObservable();

  constructor() { }

  announceChange() {
    this.userAnnouncedChange.next(true);
  }
}
