import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DTestPaymentQrComponent } from './d-test-payment-qr.component';

describe('DTestPaymentQrComponent', () => {
  let component: DTestPaymentQrComponent;
  let fixture: ComponentFixture<DTestPaymentQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DTestPaymentQrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DTestPaymentQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
