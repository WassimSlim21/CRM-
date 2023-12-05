import { TestBed } from '@angular/core/testing';

import { ScrollTopService } from './scroll-top.service';

describe('ScrollTopService', () => {
  let service: ScrollTopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
