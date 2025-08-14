import { TestBed } from '@angular/core/testing';

import { SharedCollegeService } from './shared-college.service';

describe('SharedCollegeService', () => {
  let service: SharedCollegeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedCollegeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
