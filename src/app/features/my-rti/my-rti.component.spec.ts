import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRtiComponent } from './my-rti.component';

describe('MyRtiComponent', () => {
  let component: MyRtiComponent;
  let fixture: ComponentFixture<MyRtiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRtiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRtiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
