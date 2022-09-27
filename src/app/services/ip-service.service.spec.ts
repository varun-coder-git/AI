import { TestBed, inject } from '@angular/core/testing';

import { IpServiceService } from './ip-service.service';

describe('IpServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IpServiceService]
    });
  });

  it('should be created', inject([IpServiceService], (service: IpServiceService) => {
    expect(service).toBeTruthy();
  }));
});
