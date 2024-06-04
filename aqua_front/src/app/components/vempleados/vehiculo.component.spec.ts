import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VempleadosComponent } from './vehiculo.component';

describe('VempleadosComponent', () => {
  let component: VempleadosComponent;
  let fixture: ComponentFixture<VempleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VempleadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VempleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
