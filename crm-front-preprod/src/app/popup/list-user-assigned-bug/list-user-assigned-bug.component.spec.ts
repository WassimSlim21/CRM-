import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserAssignedBugComponent } from './list-user-assigned-bug.component';

describe('ListUserAssignedBugComponent', () => {
  let component: ListUserAssignedBugComponent;
  let fixture: ComponentFixture<ListUserAssignedBugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserAssignedBugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserAssignedBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
