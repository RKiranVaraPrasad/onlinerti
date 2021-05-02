import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpFundsUtilizationComponent } from './mp-funds-utilization.component';

describe('MpFundsUtilizationComponent', () => {
  let component: MpFundsUtilizationComponent;
  let fixture: ComponentFixture<MpFundsUtilizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpFundsUtilizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpFundsUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
