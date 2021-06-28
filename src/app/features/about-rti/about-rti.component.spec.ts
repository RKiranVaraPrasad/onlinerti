import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutRtiComponent } from './about-rti.component';

describe('AboutRtiComponent', () => {
  let component: AboutRtiComponent;
  let fixture: ComponentFixture<AboutRtiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutRtiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutRtiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
