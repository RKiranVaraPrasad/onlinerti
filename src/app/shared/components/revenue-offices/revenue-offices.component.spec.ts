import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueOfficesComponent } from './revenue-offices.component';

describe('RevenueOfficesComponent', () => {
  let component: RevenueOfficesComponent;
  let fixture: ComponentFixture<RevenueOfficesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueOfficesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
