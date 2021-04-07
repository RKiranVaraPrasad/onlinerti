import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerCopyComponent } from './answer-copy.component';

describe('AnswerCopyComponent', () => {
  let component: AnswerCopyComponent;
  let fixture: ComponentFixture<AnswerCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerCopyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
