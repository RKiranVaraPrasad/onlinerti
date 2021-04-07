import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionApplicationComponent } from './pension-application.component';

describe('PensionApplicationComponent', () => {
  let component: PensionApplicationComponent;
  let fixture: ComponentFixture<PensionApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PensionApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
