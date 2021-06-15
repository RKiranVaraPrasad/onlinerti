import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMattersComponent } from './service-matters.component';

describe('ServiceMattersComponent', () => {
  let component: ServiceMattersComponent;
  let fixture: ComponentFixture<ServiceMattersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceMattersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceMattersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
