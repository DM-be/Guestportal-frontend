import { TestBed } from '@angular/core/testing';

import { GuestUsersService } from './guest-users.service';

describe('GuestUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuestUsersService = TestBed.get(GuestUsersService);
    expect(service).toBeTruthy();
  });
});
