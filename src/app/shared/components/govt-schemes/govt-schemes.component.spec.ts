import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovtSchemesComponent } from './govt-schemes.component';

describe('GovtSchemesComponent', () => {
  let component: GovtSchemesComponent;
  let fixture: ComponentFixture<GovtSchemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovtSchemesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovtSchemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
