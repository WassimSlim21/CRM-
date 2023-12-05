import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAccountRoleComponent } from './update-account-role.component';

describe('UpdateAccountRoleComponent', () => {
  let component: UpdateAccountRoleComponent;
  let fixture: ComponentFixture<UpdateAccountRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAccountRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAccountRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
