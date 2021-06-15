import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityOfficesComponent } from './electricity-offices.component';

describe('ElectricityOfficesComponent', () => {
  let component: ElectricityOfficesComponent;
  let fixture: ComponentFixture<ElectricityOfficesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricityOfficesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricityOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
