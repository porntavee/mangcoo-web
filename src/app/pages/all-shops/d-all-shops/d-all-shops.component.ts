import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-d-all-shops',
  templateUrl: './d-all-shops.component.html',
  styleUrls: ['./d-all-shops.component.css']
})
export class DAllShopsComponent implements OnInit {

  modelShopShowAll: any = [];
  shopShowAllLength: any = {};
  limit: number = 10;

  constructor(
    private serviceProviderService: ServiceProviderService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.readShopShowAll();
  }

  readShopShowAll() {
    this.serviceProviderService.post('m/shop/read', { 'limit': this.limit }).subscribe(data => {
      let modelShopShowAll: any = [];
      modelShopShowAll = data;
      this.modelShopShowAll = modelShopShowAll.objectData;
      // this.shopShowAllLength = modelShopShowAll.totalData;
      console.log("modelShopShowAll",this.modelShopShowAll);
      // console.log("shopShowAllLength",this.shopShowAllLength);
    }, err => {
    });
  }

  navToShop(shop) {
    this.router.navigate(['shop/' + shop]);
  }

  onScrollDown() {
    console.log("scrolled down!!");
    this.limit += 10;
    this.readShopShowAll();
  }

}
