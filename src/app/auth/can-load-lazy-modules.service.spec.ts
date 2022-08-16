import { TestBed } from '@angular/core/testing';

import { CanLoadLazyModulesService } from './can-load-lazy-modules.service';

describe('CanLoadLazyModulesService', () => {
  let service: CanLoadLazyModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanLoadLazyModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
