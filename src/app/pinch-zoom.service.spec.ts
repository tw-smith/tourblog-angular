import { TestBed } from '@angular/core/testing';

import { PinchZoomService } from './pinch-zoom.service';

describe('PinchZoomService', () => {
  let service: PinchZoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinchZoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
