import { TestBed } from '@angular/core/testing';

import { HomeserService } from './homeser.service';

describe('HomeserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeserService = TestBed.get(HomeserService);
    expect(service).toBeTruthy();
  });
});
