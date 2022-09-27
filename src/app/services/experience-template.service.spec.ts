import { TestBed, inject } from '@angular/core/testing';

import { ExperienceTemplateService } from './experience-template.service';

describe('ExperienceTemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExperienceTemplateService]
    });
  });

  it('should be created', inject([ExperienceTemplateService], (service: ExperienceTemplateService) => {
    expect(service).toBeTruthy();
  }));
});
