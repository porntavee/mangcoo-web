import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-m-all-shops',
  templateUrl: './m-all-shops.component.html',
  styleUrls: ['./m-all-shops.component.css']
})
export class MAllShopsComponent implements OnInit {

  modelShopShowAll: any = [];
  shopShowAllLength: any = {};
  limit: number = 10;

  constructor(
    private serviceProviderService: ServiceProviderService,
    private router: Router,
    private _location: Location
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
      // console.log("modelShopShowAll",this.modelShopShowAll);
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

  navTo(param) {
    switch (param) {
      case 'notification':
        this.router.navigate(['notification']);
        break;
      case 'contactHelp':
        this.router.navigate(['m']);
        break;
      case 'register':
        this.router.navigate(['m/register']);
        break;
      case 'login':
        this.router.navigate(['m/login']);
        break;
      case 'profile':
        this.router.navigate(['m/profile']);
        break;
      case 'confirm-order':
        this.router.navigate(['m/confirm-order']);
        break;
      case 'all-shop':
        this.router.navigate(['m/all-shop']);
        break;

      default:
        this.router.navigate(['m']);
        break;
    }
  }

  backClicked() {
    this._location.back();
  }
}
