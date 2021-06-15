import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalOfficesComponent } from './municipal-offices.component';

describe('MunicipalOfficesComponent', () => {
  let component: MunicipalOfficesComponent;
  let fixture: ComponentFixture<MunicipalOfficesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunicipalOfficesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipalOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
