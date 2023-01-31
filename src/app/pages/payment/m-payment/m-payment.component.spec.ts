import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MPaymentComponent } from './m-payment.component';

describe('MPaymentComponent', () => {
  let component: MPaymentComponent;
  let fixture: ComponentFixture<MPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
