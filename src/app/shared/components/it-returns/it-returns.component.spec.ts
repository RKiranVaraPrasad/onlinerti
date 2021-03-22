import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItReturnsComponent } from './it-returns.component';

describe('ItReturnsComponent', () => {
  let component: ItReturnsComponent;
  let fixture: ComponentFixture<ItReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItReturnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
