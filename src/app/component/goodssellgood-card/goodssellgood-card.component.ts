import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'goodssellgood-card',
  templateUrl: './goodssellgood-card.component.html',
  styleUrls: ['./goodssellgood-card.component.css']
})
export class GoodsSellGoodComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  @Input() model:any = {};

  constructor(private utilities: Utilities,private router:Router) { }

  ngOnInit(): void {
  }

  formatPrice(param) {
   return this.utilities.cf(param);
  }

  selected(param) {
    this.callback.emit(param); // false == cancel, true == confirm.
    // this.router.navigate(['product'],{ queryParams: { code: param } });
  }

}
