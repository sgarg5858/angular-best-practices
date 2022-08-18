import { TestBed } from '@angular/core/testing';

import { CanMoveAwayService } from './can-move-away.service';

describe('CanMoveAwayService', () => {
  let service: CanMoveAwayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanMoveAwayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
