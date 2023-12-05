import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceAdministarteurComponent } from './espace-administarteur.component';

describe('EspaceAdministarteurComponent', () => {
  let component: EspaceAdministarteurComponent;
  let fixture: ComponentFixture<EspaceAdministarteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceAdministarteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceAdministarteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
