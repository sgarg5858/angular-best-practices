import { TestBed } from '@angular/core/testing';

import { AddBaseUrlService } from './add-base-url.service';

describe('AddBaseUrlService', () => {
  let service: AddBaseUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddBaseUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
