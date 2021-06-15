import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GramPanchayatOfficesComponent } from './gram-panchayat-offices.component';

describe('GramPanchayatOfficesComponent', () => {
  let component: GramPanchayatOfficesComponent;
  let fixture: ComponentFixture<GramPanchayatOfficesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GramPanchayatOfficesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GramPanchayatOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
