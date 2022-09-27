import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageSubscriptionManagementComponent } from './storage-subscription-management.component';

describe('StorageSubscriptionManagementComponent', () => {
  let component: StorageSubscriptionManagementComponent;
  let fixture: ComponentFixture<StorageSubscriptionManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageSubscriptionManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageSubscriptionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
