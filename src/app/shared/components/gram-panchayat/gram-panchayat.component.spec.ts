import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GramPanchayatComponent } from './gram-panchayat.component';

describe('GramPanchayatComponent', () => {
  let component: GramPanchayatComponent;
  let fixture: ComponentFixture<GramPanchayatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GramPanchayatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GramPanchayatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
