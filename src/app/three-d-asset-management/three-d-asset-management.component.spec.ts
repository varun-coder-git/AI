import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDAssetManagementComponent } from './three-d-asset-management.component';

describe('ThreeDAssetManagementComponent', () => {
  let component: ThreeDAssetManagementComponent;
  let fixture: ComponentFixture<ThreeDAssetManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeDAssetManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeDAssetManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
