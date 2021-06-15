import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralGovernmentOfficesComponent } from './central-government-offices.component';

describe('CentralGovernmentOfficesComponent', () => {
  let component: CentralGovernmentOfficesComponent;
  let fixture: ComponentFixture<CentralGovernmentOfficesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentralGovernmentOfficesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralGovernmentOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
