import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackUserListComponent } from './pack-user-list.component';

describe('PackUserListComponent', () => {
  let component: PackUserListComponent;
  let fixture: ComponentFixture<PackUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
