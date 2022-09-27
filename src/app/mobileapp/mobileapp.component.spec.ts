import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileappComponent } from './mobileapp.component';

describe('MobileappComponent', () => {
  let component: MobileappComponent;
  let fixture: ComponentFixture<MobileappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
