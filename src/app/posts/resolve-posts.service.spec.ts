import { TestBed } from '@angular/core/testing';

import { ResolvePostsService } from './resolve-posts.service';

describe('ResolvePostsService', () => {
  let service: ResolvePostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResolvePostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
