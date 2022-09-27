import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishAnalyticsComponent } from './publish-analytics.component';

describe('PublishAnalyticsComponent', () => {
  let component: PublishAnalyticsComponent;
  let fixture: ComponentFixture<PublishAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
