import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'app-d-confirm-order',
  templateUrl: './d-confirm-order.component.html',
  styleUrls: ['./d-confirm-order.component.css']
})
export class DConfirmOrderComponent implements OnInit {
  imageTemp: String = 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
  address: any = {};
  addressList: any = [];
  isShowAddress: boolean = false;
  showModal: boolean = false;
  userData: any = {};
  orderNoData: any = {};
  myForm: any = {};
  pymtCustName: string = 'sss';
  ipAddress: string = '';
  codes: string = '';
  paymentNumber: string = '';
  paymentType: string = 'TQ';
  serverPayment = '';

  @ViewChild('form') form: ElementRef;

  constructor(private router: Router,
    private serviceProviderService: ServiceProviderService,
    private utilities: Utilities,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  model: any = [];
  ngOnInit(): void {

    this.serverPayment = this.serviceProviderService.serverPayment;

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
    this.getOrderCode();
    this.callReadAddress();
    this.getOrderNo();
    this.getIP();
  }

  formatPrice(param) {
    return this.utilities.cf(param);
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
        this.router.navigate(['notification']);
        break;
      case 'contactHelp':
        this.router.navigate(['']);
        break;
      case 'register':
        this.router.navigate(['register']);
        break;
      case 'login':
        this.router.navigate(['login']);
        break;
      case 'profile':
        this.router.navigate(['profile']);
        break;
      case 'payment-success':
        this.router.navigate(['payment-success']);
        break;
      case 'address':
        this.router.navigate(['address']);
        break;

      default:
        break;
    }
  }

  async getOrderCode() {
    await this.serviceProviderService.post('m/cart/getOrderCode/', {}).subscribe(async response => {
      var data: any = response;
      this.paymentNumber = await data.objectData.code;
      // this.sendData(this.orderNoData);
    }, err => {

    });
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
    this.router.navigate(['']);
  }

  updateData() {
    let obj = {
      code: this.codes,
      paymentNumber: this.paymentNumber,
      paymentType: this.paymentType,
      profileCode: this.userData.profileCode,
      address: this.address.code,
      updateBy: this.userData.profileCode,
    };
    this.serviceProviderService.post('m/cart/order/code/update', obj).subscribe(response => {

    }, err => {

    });
  }

  updateDataOmise() {
    let obj = {
      code: this.codes,
      paymentNumber: this.paymentNumber,
      paymentType: this.paymentType,
      profileCode: this.userData.profileCode,
      address: this.address.code,
      updateBy: this.userData.profileCode,
      price: this.resultPrice(),
      // referenceAddress: this.address.code,
      // address:this.address.address,
      // subDistrict:this.address.subDistrict,
      // district:this.address.district,
      // province:this.address.province,
      // postalCode:this.address.postalCode,
      // consigneeName: this.address.title,
      // consigneePhone: this.address.phone,
    };
    this.serviceProviderService.post('cart/omise/charges/web', obj).subscribe(response => {
      this.router.navigate(['qr-payment'], { queryParams: { code: this.codes } });
    }, err => {

    });
  }
}
