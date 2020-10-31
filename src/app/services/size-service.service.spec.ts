import { TestBed } from '@angular/core/testing';

import { SizeServiceService } from './size-service.service';

describe('SizeServiceService', () => {
  let service: SizeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SizeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
