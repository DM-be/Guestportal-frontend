import { TestBed } from '@angular/core/testing';

import { Pkcs11Service } from './pkcs11.service';

describe('Pkcs11Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Pkcs11Service = TestBed.get(Pkcs11Service);
    expect(service).toBeTruthy();
  });
});
