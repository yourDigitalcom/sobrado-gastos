import { TestBed } from '@angular/core/testing';

import { DiskService } from './service.service';

describe('ServiceService', () => {
  let service: DiskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
