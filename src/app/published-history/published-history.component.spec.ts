import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedHistoryComponent } from './published-history.component';

describe('PublishedHistoryComponent', () => {
  let component: PublishedHistoryComponent;
  let fixture: ComponentFixture<PublishedHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishedHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
