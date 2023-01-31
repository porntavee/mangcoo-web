import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'product-circle',
  templateUrl: './product-circle.component.html',
  styleUrls: ['./product-circle.component.css']
})
export class ProductCircleComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  @Input() model:any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
