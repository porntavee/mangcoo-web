import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Location } from '@angular/common'
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'category-shop',
  templateUrl: './category-shop.component.html',
  styleUrls: ['./category-shop.component.css']
})
export class CategoryShopComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  @Input() code: string = '';
  @Input() categoryList: any = [];
  
  model: any = [];
  categorySelected: string = '';
  lvShopSelected: string = 'lv1Shop';
  loading: boolean = false;

  constructor(
    private router: Router,
    private serviceProviderService: ServiceProviderService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private utilities:Utilities
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let model: any = this.activatedRoute.snapshot.params;
      if (model.code.length > 5) //temporary
        this.code = model.code;

      this.callRead();
    });
  }

  callRead() {
    let criteria = {
      'referenceShopCode': this.code,
      [this.lvShopSelected]: this.categorySelected,
    }
    this.loading = true;
    this.serviceProviderService.post(this.utilities.curDevice() + 'shop/goods/read', criteria).subscribe(response => {
      var data: any = response;
      this.model = data.objectData;
      this.loading = false;
    }, err => {
    });
  }

  setCategorySelected(categoryCode: string, lv: string) {
    this.categorySelected = categoryCode;
    this.lvShopSelected = lv;
    this.callRead();
  }

  back(): void {
    this.location.back()
  }
}
