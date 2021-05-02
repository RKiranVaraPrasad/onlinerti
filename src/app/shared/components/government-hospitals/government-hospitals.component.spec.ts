import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentHospitalsComponent } from './government-hospitals.component';

describe('GovernmentHospitalsComponent', () => {
  let component: GovernmentHospitalsComponent;
  let fixture: ComponentFixture<GovernmentHospitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentHospitalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentHospitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
