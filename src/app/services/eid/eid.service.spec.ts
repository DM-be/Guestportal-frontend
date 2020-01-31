import { TestBed } from '@angular/core/testing';

import { EidService } from './eid.service';

describe('EidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EidService = TestBed.get(EidService);
    expect(service).toBeTruthy();
  });
});
