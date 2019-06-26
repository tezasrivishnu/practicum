/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthserService } from './authser.service';

describe('Service: Authser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthserService]
    });
  });

  it('should ...', inject([AuthserService], (service: AuthserService) => {
    expect(service).toBeTruthy();
  }));
});
