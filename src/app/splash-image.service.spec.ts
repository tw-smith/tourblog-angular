import { TestBed } from '@angular/core/testing';

import { SplashImageService } from './splash-image.service';

describe('SplashImageService', () => {
  let service: SplashImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SplashImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
