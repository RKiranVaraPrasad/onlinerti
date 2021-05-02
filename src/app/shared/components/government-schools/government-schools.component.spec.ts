import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentSchoolsComponent } from './government-schools.component';

describe('GovernmentSchoolsComponent', () => {
  let component: GovernmentSchoolsComponent;
  let fixture: ComponentFixture<GovernmentSchoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentSchoolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
