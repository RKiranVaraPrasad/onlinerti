import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalSecretaryComponent } from './principal-secretary.component';

describe('PrincipalSecretaryComponent', () => {
  let component: PrincipalSecretaryComponent;
  let fixture: ComponentFixture<PrincipalSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalSecretaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
