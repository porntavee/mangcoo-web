import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-m-shop',
  templateUrl: './m-shop.component.html',
  styleUrls: ['./m-shop.component.css']
})
export class MShopComponent implements OnInit {
  code: string = '';
  limit: number = 10;
  loading: boolean = true;
  shopInfo: any = {};
  model: any = [];
  categoryList: any = [];
  isOpenedOtherCategory: boolean = false;
  categorySelected: any = { 'lv': '', code: '', title: 'ทั้งหมด' };

  constructor(
    private router: Router,
    private serviceProviderService: ServiceProviderService,
    private activatedRoute: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let model: any = this.activatedRoute.snapshot.params;
      if (model.code.length > 5) //temporary
        this.code = model.code;

      window.scroll(0, 0);
      this.callRead();
      this.callReadShop();
      this.callReadPromotion();
      this.callReadCategory();
    });
  }

  callRead() {
    this.serviceProviderService.post('m/shop/goods/read', { 'referenceShopCode': this.code, 'limit': this.limit, [this.categorySelected.lv]: this.categorySelected.code }).subscribe(response => {
      var data: any = response;
      this.model = data.objectData;
      this.loading = false;
    }, err => {
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
    this.serviceProviderService.post('m/shop/goods/read', { 'referenceShopCode': this.code, 'limit': 6 }).subscribe(response => {
      var data: any = response;
      this.model = data.objectData;
      this.loading = false;
    }, err => {
    });
  }

  callReadCategory() {
    this.serviceProviderService.post('m/shop/category/read', { 'code': this.code }).subscribe(response => {
      var data: any = response;
      this.categoryList = [{ 'code': '', 'title': 'ทั้งหมด' }, ...data.objectData];

    }, err => {
    });
  }

  navTo(param) {
    this.router.navigate(['shop/search/' + this.code + '&' + param.code + '&' + param.lv]);
  }

  backClicked() {
    this._location.back();
  }


  onScrollDown() {
    console.log("scrolled down!!");
    this.limit += 10;
    this.callRead();
  }

  fCategorySelected(param) {
    this.categorySelected = param;
    this.callRead();
  }

  filter() {
    
  }
}
