import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorOfficeComponent } from './collector-office.component';

describe('CollectorOfficeComponent', () => {
  let component: CollectorOfficeComponent;
  let fixture: ComponentFixture<CollectorOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectorOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
