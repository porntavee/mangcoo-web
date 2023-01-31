import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAddressComponent } from './m-address.component';

describe('MAddressComponent', () => {
  let component: MAddressComponent;
  let fixture: ComponentFixture<MAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
