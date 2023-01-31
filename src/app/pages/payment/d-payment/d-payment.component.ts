import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-d-payment',
  templateUrl: './d-payment.component.html',
  styleUrls: ['./d-payment.component.css']
})
export class DPaymentComponent implements OnInit {

  menuActive = 'profile';
  menuSubActive = 'all';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
}
