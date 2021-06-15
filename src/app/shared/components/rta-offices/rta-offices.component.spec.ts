import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtaOfficesComponent } from './rta-offices.component';

describe('RtaOfficesComponent', () => {
  let component: RtaOfficesComponent;
  let fixture: ComponentFixture<RtaOfficesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtaOfficesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtaOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
