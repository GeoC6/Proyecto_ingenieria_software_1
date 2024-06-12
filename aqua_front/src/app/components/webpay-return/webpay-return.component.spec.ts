import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpayReturnComponent } from './webpay-return.component';

describe('WebpayReturnComponent', () => {
  let component: WebpayReturnComponent;
  let fixture: ComponentFixture<WebpayReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebpayReturnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebpayReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
