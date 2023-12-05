import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersStatsPopupComponent } from './users-stats-popup.component';

describe('UsersStatsPopupComponent', () => {
  let component: UsersStatsPopupComponent;
  let fixture: ComponentFixture<UsersStatsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersStatsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersStatsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
