import { TestBed } from '@angular/core/testing';

import { RamMainService } from './ram-main.service';

describe('RamMainService', () => {
  let service: RamMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RamMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
