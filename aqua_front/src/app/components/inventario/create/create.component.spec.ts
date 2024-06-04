import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioCreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: InventarioCreateComponent;
  let fixture: ComponentFixture<InventarioCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
