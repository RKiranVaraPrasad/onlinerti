import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateGovernmentOfficesComponent } from './state-government-offices.component';

describe('StateGovernmentOfficesComponent', () => {
  let component: StateGovernmentOfficesComponent;
  let fixture: ComponentFixture<StateGovernmentOfficesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateGovernmentOfficesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateGovernmentOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
