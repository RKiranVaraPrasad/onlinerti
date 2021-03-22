import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksheetVerificationComponent } from './marksheet-verification.component';

describe('MarksheetVerificationComponent', () => {
  let component: MarksheetVerificationComponent;
  let fixture: ComponentFixture<MarksheetVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarksheetVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksheetVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
