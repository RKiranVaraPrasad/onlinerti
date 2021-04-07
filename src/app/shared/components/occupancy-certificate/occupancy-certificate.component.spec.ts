import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyCertificateComponent } from './occupancy-certificate.component';

describe('OccupancyCertificateComponent', () => {
  let component: OccupancyCertificateComponent;
  let fixture: ComponentFixture<OccupancyCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupancyCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupancyCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
