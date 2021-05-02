import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentHostelsComponent } from './government-hostels.component';

describe('GovernmentHostelsComponent', () => {
  let component: GovernmentHostelsComponent;
  let fixture: ComponentFixture<GovernmentHostelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentHostelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentHostelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
