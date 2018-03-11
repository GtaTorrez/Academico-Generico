import { TestBed, inject } from '@angular/core/testing';

import { LoadersService } from './loaders.service';

describe('LoadersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadersService]
    });
  });

  it('should be created', inject([LoadersService], (service: LoadersService) => {
    expect(service).toBeTruthy();
  }));
});
