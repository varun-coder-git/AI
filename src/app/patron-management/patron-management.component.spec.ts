import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronManagementComponent } from './patron-management.component';

describe('PatronManagementComponent', () => {
  let component: PatronManagementComponent;
  let fixture: ComponentFixture<PatronManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatronManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatronManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
