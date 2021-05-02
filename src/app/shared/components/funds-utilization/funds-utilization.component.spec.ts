import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsUtilizationComponent } from './funds-utilization.component';

describe('FundsUtilizationComponent', () => {
  let component: FundsUtilizationComponent;
  let fixture: ComponentFixture<FundsUtilizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundsUtilizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundsUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
