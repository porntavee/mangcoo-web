import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'app-d-mypurchase',
  templateUrl: './d-mypurchase.component.html',
  styleUrls: ['./d-mypurchase.component.css']
})
export class DMypurchaseComponent implements OnInit {

  menuSubActive = '';
  statusModel:string = '';
  modelAll:any = [];
  modelWaitPending:any = [];
  modelPending:any = [];
  modelSuccess:any = [];
  modelCancel:any = [];

  constructor(private router: Router,
    private serviceProviderService: ServiceProviderService,
    private utilities: Utilities,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.callRead();
  }

  callRead() {

    this.serviceProviderService.post('m/cart/order/read', {status: this.statusModel}).subscribe(response => {
      var data: any = response;

      this.modelAll = data.objectData;
      console.log(this.modelAll);

    }, err => {
    });
  }

  formatPrice(param) {
    return this.utilities.cf(param);
  }

  checkStatus() {

  }

  priceShop(param) {
    let price = 0;
    param.forEach(e => {
     price += e.netPrice * e.qty
    });
    
    return price;
  }

  goToNotification() {
    this.router.navigate(['notification']);
  }

  goToMyPurchase() {
    this.router.navigate(['mypurchase']);
  }

  goTotobepaid() {
    this.menuSubActive = 's';
  }

  goToall() {
    this.menuSubActive = 'all';
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  goTo(path,param) {
    switch (path) {
      case 'qr-payment':
        this.router.navigate(['qr-payment'],{ queryParams: { code: param } });
        break;
      case 'profile':
        this.router.navigate(['profile']);
        break;

      default:
        break;
    }
  }
}
