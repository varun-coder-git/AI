import { TestBed, inject } from '@angular/core/testing';

import { PipesService } from './pipes.service';

describe('PipesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PipesService]
    });
  });

  it('should be created', inject([PipesService], (service: PipesService) => {
    expect(service).toBeTruthy();
  }));
});
