import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPackComponent } from './add-pack.component';

describe('AddPackComponent', () => {
  let component: AddPackComponent;
  let fixture: ComponentFixture<AddPackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
