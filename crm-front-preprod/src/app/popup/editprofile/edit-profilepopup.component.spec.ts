import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilepopupComponent } from './edit-profilepopup.component';

describe('EditProfilepopupComponent', () => {
  let component: EditProfilepopupComponent;
  let fixture: ComponentFixture<EditProfilepopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfilepopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
