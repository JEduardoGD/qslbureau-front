import { TestBed } from '@angular/core/testing';

import { ConsolidateSlotsService } from './consolidate-slots.service';

describe('ConsolidateSlotsService', () => {
  let service: ConsolidateSlotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsolidateSlotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
