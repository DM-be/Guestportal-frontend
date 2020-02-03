import { TestBed } from '@angular/core/testing';

import { AxiosRequestsService } from './axios-requests.service';

describe('AxiosRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AxiosRequestsService = TestBed.get(AxiosRequestsService);
    expect(service).toBeTruthy();
  });
});
