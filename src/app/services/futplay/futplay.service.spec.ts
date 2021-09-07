import { TestBed } from '@angular/core/testing';

import { FutplayService } from './futplay.service';

describe('FutplayService', () => {
  let service: FutplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FutplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
