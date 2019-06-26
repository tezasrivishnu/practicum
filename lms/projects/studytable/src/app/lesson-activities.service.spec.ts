import { TestBed } from '@angular/core/testing';

import { LessonActivitiesService } from './lesson-activities.service';

describe('LessonActivitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LessonActivitiesService = TestBed.get(LessonActivitiesService);
    expect(service).toBeTruthy();
  });
});
