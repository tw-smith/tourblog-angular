import { TestBed } from '@angular/core/testing';

import { BlogIndexService } from './blog-index.service';

describe('BlogIndexService', () => {
  let service: BlogIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
