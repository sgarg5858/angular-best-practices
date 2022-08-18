import { TestBed } from '@angular/core/testing';

import { PreloadFrequentlyUsedModulesService } from './preload-frequently-used-modules.service';

describe('PreloadFrequentlyUsedModulesService', () => {
  let service: PreloadFrequentlyUsedModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreloadFrequentlyUsedModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
