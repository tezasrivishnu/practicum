import { TestBed } from '@angular/core/testing';

import { MentorRequestService } from './mentor-request.service';

describe('MentorRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MentorRequestService = TestBed.get(MentorRequestService);
    expect(service).toBeTruthy();
  });
});
