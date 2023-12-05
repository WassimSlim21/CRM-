import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAccountDetailsComponent } from './social-account-details.component';

describe('SocialAccountDetailsComponent', () => {
  let component: SocialAccountDetailsComponent;
  let fixture: ComponentFixture<SocialAccountDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialAccountDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
