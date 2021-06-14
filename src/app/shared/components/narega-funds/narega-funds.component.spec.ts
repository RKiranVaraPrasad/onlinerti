import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaregaFundsComponent } from './narega-funds.component';

describe('NaregaFundsComponent', () => {
  let component: NaregaFundsComponent;
  let fixture: ComponentFixture<NaregaFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaregaFundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaregaFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
