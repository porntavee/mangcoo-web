import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-d-shop',
  templateUrl: './d-shop.component.html',
  styleUrls: ['./d-shop.component.css']
})
export class DShopComponent implements OnInit {
  code: string = '';
  loading: boolean = true;
  shopInfo: any = {};
  promotionList: any = [];
  categoryList:any = [];
  isOpenedOtherCategory: boolean = false;

  constructor(
    private router: Router,
    private serviceProviderService: ServiceProviderService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.activatedRoute.queryParams.subscribe(params => {
      let model: any = this.activatedRoute.snapshot.params;
      if (model.code.length > 5) //temporary
        this.code = model.code;

      this.callReadShop();
      this.callReadPromotion();
      this.callReadCategory();
    });
  }

  callReadShop() {
    this.serviceProviderService.post('m/shop/read', { 'code': this.code }).subscribe(response => {
      var data: any = response;
      this.shopInfo = data.objectData[0];
      this.loading = false;
    }, err => {
    });
  }

  callReadPromotion() {
    this.serviceProviderService.post('m/shop/goods/read', { 'referenceShopCode': this.code ,'limit': 6}).subscribe(response => {
      var data: any = response;
      this.promotionList = data.objectData;
      this.loading = false;
    }, err => {
    });
  }

  callReadCategory() {
    this.serviceProviderService.post('m/shop/category/read', { 'code': this.code }).subscribe(response => {
      var data: any = response;
      this.categoryList = data.objectData;
    }, err => {
    });
  }

  navTo(param) {
    this.router.navigate(['shop/search/' + this.code + '&' + param.code + '&' + param.lv]);
  }
}
