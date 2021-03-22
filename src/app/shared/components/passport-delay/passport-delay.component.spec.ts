import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportDelayComponent } from './passport-delay.component';

describe('PassportDelayComponent', () => {
  let component: PassportDelayComponent;
  let fixture: ComponentFixture<PassportDelayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassportDelayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassportDelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
