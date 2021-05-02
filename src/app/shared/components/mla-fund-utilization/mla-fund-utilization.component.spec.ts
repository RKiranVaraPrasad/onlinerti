import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MlaFundUtilizationComponent } from './mla-fund-utilization.component';

describe('MlaFundUtilizationComponent', () => {
  let component: MlaFundUtilizationComponent;
  let fixture: ComponentFixture<MlaFundUtilizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MlaFundUtilizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MlaFundUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
