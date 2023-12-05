import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePackComponent } from './update-pack.component';

describe('UpdatePackComponent', () => {
  let component: UpdatePackComponent;
  let fixture: ComponentFixture<UpdatePackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
