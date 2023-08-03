import { TestBed } from '@angular/core/testing';

import { ReverseGeocodingServiceService } from './reverse-geocoding-service.service';

describe('ReverseGeocodingServiceService', () => {
  let service: ReverseGeocodingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReverseGeocodingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
