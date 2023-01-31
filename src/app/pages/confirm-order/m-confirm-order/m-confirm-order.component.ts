import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'app-m-confirm-order',
  templateUrl: './m-confirm-order.component.html',
  styleUrls: ['./m-confirm-order.component.css']
})
export class MConfirmOrderComponent implements OnInit {
  address: any = {};
  addressList: any = [];
  isShowAddress: boolean = false;
  showModal: boolean = false;z
  userData: any = {};
  orderNoData: any = {};
  myForm: any = {};
  pymtCustName: string = 'sss';
  ipAddress: string = '';
  codes: string = '';

  @ViewChild('form') form: ElementRef;

  constructor(private router: Router,
    private serviceProviderService: ServiceProviderService,
    private utilities: Utilities,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _location:Location
  ) { }

  model: any = [];
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let model: any = JSON.parse(this.activatedRoute.snapshot.params.data);
      this.model = model;
      this.model.forEach(e => {
        e.items.forEach(o => {
          if (this.codes == '')
            this.codes = o.code;
          else
            this.codes = this.codes + ',' + o.code;
        });
      });
    });
    if (this.utilities.getUserLocalStorage().profileCode != '' && this.utilities.getUserLocalStorage().profileCode != null) {
      this.userData = this.utilities.getUserLocalStorage();
    } else {
      this.goTo('login');
    }
    this.callReadAddress();
    this.getOrderNo();
    this.getIP();
  }

  formatPrice(param) {
    return this.utilities.cf(param);
  }

  backClicked() {
    this._location.back();
  }

  getIP() {
    this.serviceProviderService.getIP().subscribe((res: any) => {
      this.ipAddress = res.ip;
    })
  }

  callRead() {
    this.serviceProviderService.post('m/cart/v2/read', {}).subscribe(response => {
      var data: any = response;

      this.model = data.objectData[0];
      console.log(this.model);

    }, err => {
    });
  }

  callReadAddress() {
    this.serviceProviderService.post('m/manageAddress/read', {}).subscribe(response => {
      var data: any = response;

      if (data.objectData[0] != null) {
        this.addressList = data.objectData;
        this.address = this.addressList.find(c => c.isDefault);
      } else {

      }
      console.log('address => ', this.address);

    }, err => {
    });
  }

  sumPriceShop(param) {
    let result = 0;
    param.items.forEach(e => {
      result += (e.netPrice * e.qty);
    });
    result += 30;
    return result;
  }

  sumQtyShop(param) {
    let result = 0;
    param.items.forEach(e => {
      result += e.qty;
    });
    return result;
  }

  sumQtyTotal() {
    let result = 0;
    this.model.forEach(c => {
      c.items.forEach(e => {
        result += e.qty;
      });
    });
    return result;
  }

  sumPriceTotal() {
    let result = 0;
    this.model.forEach(c => {
      c.items.forEach(e => {
        result += (e.netPrice * e.qty);
      });
    });
    return result;
  }

  resultPrice() {
    return this.sumPriceTotal() + this.sumShippingPrice();
  }

  sumShippingPrice() {
    return this.model.length * 30;
  }

  goTo(param) {
    switch (param) {
      case 'notification':
        this.router.navigate(['m/notification']);
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
      case 'payment-success':
        this.router.navigate(['m/payment-success']);
        break;
      case 'address':
        this.router.navigate(['m/address']);
        break;

      default:
        this.router.navigate(['m']);
        break;
    }
  }

  async getOrderNo() {
    await this.serviceProviderService.getUrl('http://core148.we-builds.com/payment-api/WeMart/Create/' + this.model.length.toString()).subscribe(response => {
      var data: any = response;
      this.orderNoData = data;
      // this.sendData(this.orderNoData);
    }, err => {

    });
  }

  async sendData(orderNo) {
    let data: any = [];
    debugger

    if (orderNo.code == null) return;
    if (this.utilities.isEmpty(this.address)) return;
    await this.model.forEach((shop, index) => {
      shop.items.forEach(e => data.push({
        ...e,
        'paymentType': 'O',
        'orderNo': orderNo.items[index],
        'orderNoReference': orderNo.code,
        'referenceAddress': this.address.code,
        'address': this.address.address,
        'subDistrict': this.address.subDistrictTitle,
        'district': this.address.districtTitle,
        'province': this.address.provinceTitle,
        'postalCode': this.address.postalCode,
        'consigneeName': this.address.title,
        'consigneePhone': this.address.phone,
        'status': "V",
      }))
    });

    await this.serviceProviderService.postList('m/cart/update', data).subscribe(response => {
      var data: any = response;
      // this.router.navigate(['qr-payment'],{ queryParams: { code: orderNo } });
    }, err => {
    });
  }



  selectAddress(param) {
    this.addressList.forEach(e => {
      if (e.code == param.code) {
        e.check = true;
      }
      else e.check = false;
    });
  }

  changeAddress() {
    let index = this.addressList.findIndex(e => e.check == true);
    this.address = this.addressList[index];
    this.isShowAddress = !this.isShowAddress;
  }

  fromModal(param) {
    if (param)
      this.callReadAddress();
    this.showModal = false;
  }

  logout() {
    localStorage.clear();
    this.userData.profileCode = '';
    this.router.navigate(['m']);
  }
}
