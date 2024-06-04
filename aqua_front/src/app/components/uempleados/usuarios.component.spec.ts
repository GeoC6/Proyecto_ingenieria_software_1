import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UempleadosComponent } from './usuarios.component';

describe('UempleadosComponent', () => {
  let component: UempleadosComponent;
  let fixture: ComponentFixture<UempleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UempleadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UempleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
