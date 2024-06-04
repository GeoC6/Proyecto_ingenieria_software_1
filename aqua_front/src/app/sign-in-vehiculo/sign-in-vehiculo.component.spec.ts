import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInVehiculoComponent } from './sign-in-vehiculo.component';

describe('SignInVehiculoComponent', () => {
  let component: SignInVehiculoComponent;
  let fixture: ComponentFixture<SignInVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInVehiculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
