import { Location } from '@angular/common';
import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'shopall-card',
  templateUrl: './shopall-card.component.html',
  styleUrls: ['./shopall-card.component.css']
})
export class ShopAllCardComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  @Input() model:any = {};

  constructor(
    private utilities: Utilities,
    private router:Router,
    private _location:Location
    ) { }

  ngOnInit(): void {
  }

  formatPrice(param) {
   return this.utilities.cf(param);
  }

  backClicked() {
    this._location.back();
  }

  selected(param) {
    this.router.navigate([this.utilities.curDevice() + 'shop/'+param]);
  }

}
