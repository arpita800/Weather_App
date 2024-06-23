import { TestBed } from '@angular/core/testing';

import { SunriseSunsetServiceTsService } from './sunrise-sunset.service.ts.service';

describe('SunriseSunsetServiceTsService', () => {
  let service: SunriseSunsetServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SunriseSunsetServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
