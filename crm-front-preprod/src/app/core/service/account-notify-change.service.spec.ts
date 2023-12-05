import { TestBed } from '@angular/core/testing';

import { AccountNotifyChangeService } from './account-notify-change.service';

describe('AccountNotifyChangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountNotifyChangeService = TestBed.get(AccountNotifyChangeService);
    expect(service).toBeTruthy();
  });
});
