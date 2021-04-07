import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpfStatusComponent } from './epf-status.component';

describe('EpfStatusComponent', () => {
  let component: EpfStatusComponent;
  let fixture: ComponentFixture<EpfStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpfStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpfStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
