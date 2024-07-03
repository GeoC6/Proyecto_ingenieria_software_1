import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginClienteComponent2 } from './logincliente2.component';

describe('LoginComponent', () => {
  let component: LoginClienteComponent2;
  let fixture: ComponentFixture<LoginClienteComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginClienteComponent2 ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginClienteComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
