import { ServiceProviderService } from './../../../shares/service-provider.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilities } from './../../../shares/utilities';

@Component({
  selector: 'app-d-cart',
  templateUrl: './d-cart.component.html',
  styleUrls: ['./d-cart.component.css']
})
export class DCartComponent implements OnInit {
  itemSelected: boolean = false;
  isOpenedDownload: boolean = false;
  totalPrice: number = 0;
  userData: any = {};
  totalQty: number = 0;
  imageTemp: String = 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
  model: any = [];
  sameProduct = [
    { imageUrl: this.imageTemp, title: 'รองเท้าไนกี้ เพกาสัส38 เพกาสัส38 เพกาสัส38 รุ่นลิมิเตต*' },
    { imageUrl: this.imageTemp, title: 'รองเท้าไนกี้ เพกาสัส38 รุ่นลิมิเตต' },
    { imageUrl: this.imageTemp, title: 'รองเท้าไนกี้ เพกาสัส38 รุ่นลิมิเตต' },
    { imageUrl: this.imageTemp, title: 'รองเท้าไนกี้ เพกาสัส38 รุ่นลิมิเตต' },
    { imageUrl: this.imageTemp, title: 'รองเท้าไนกี้ เพกาสัส38 รุ่นลิมิเตต' },
    { imageUrl: this.imageTemp, title: 'รองเท้าไนกี้ เพกาสัส38 รุ่นลิมิเตต' },
  ];

  constructor(private router: Router, private serviceProviderService: ServiceProviderService, private utilities: Utilities) { }


  ngOnInit(): void {
    if (this.utilities.getUserLocalStorage().profileCode != '' && this.utilities.getUserLocalStorage().profileCode != null) {
      this.userData = this.utilities.getUserLocalStorage();
    } else {
      this.goTo('login');
    }
    this.callRead();
  }

  callRead() {
    this.serviceProviderService.post('m/cart/v2/read', {}).subscribe(response => {
      var data: any = response;

      this.model = data.objectData[0];
      console.log(data.objectData);
      this.model.forEach(shop => shop.isSelected = false);
      console.log(this.model);

    }, err => {
    });
  }

  formatPrice(param) {
    return this.utilities.cf(param);
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
      case 'confirm-order':
        this.router.navigate(['confirm-order']);
        break;

      default:
        break;
    }
  }

  checkUncheckAll() {
    this.itemSelected = !this.itemSelected;
    this.model.forEach(e => {
      e.isSelected = this.itemSelected;
      e.items.forEach(item => {
        item.isSelected = this.itemSelected;
      })
    });
    console.log(this.model);

    this.setTotalPrice();
  }

  checkUncheckShop(indexShop) {
    // if (this.model[indexShop].isSelected == undefined) {
    //   this.model[indexShop].isSelected = true;
    //   this.model[indexShop].items.forEach(item => {
    //     item.isSelected = true;
    //   })
    // }
    // else {
    //   this.model[indexShop].isSelected = !this.model[indexShop].isSelected;
    //   this.model[indexShop].items.forEach(item => {
    //     item.isSelected = this.model[indexShop].isSelected;
    //   })
    //   let check = this.model.indexOf(shop => shop.isSelected == false);
    //   if (check > 0) this.itemSelected = true;
    //   else this.itemSelected = false;
    //   console.log('===', this.itemSelected);
    // }
    this.model[indexShop].isSelected = !this.model[indexShop].isSelected;
    this.model[indexShop].items.forEach(item => {
      item.isSelected = this.model[indexShop].isSelected;
    })
    let check = this.model.indexOf(shop => shop.isSelected = false);
    if (check > 0) this.itemSelected = true;
    else this.itemSelected = false;

    this.setTotalPrice();
  }

  checkUncheckItem(indexShop, indexItem) {
    if (this.model[indexShop].items[indexItem].isSelected == undefined) this.model[indexShop].items[indexItem].isSelected = true;
    else {
      this.model[indexShop].items[indexItem].isSelected = !this.model[indexShop].items[indexItem].isSelected;
      if (this.model[indexShop].items[indexItem].isSelected == false) this.model[indexShop].isSelected = false;
    }
    this.setTotalPrice();
  }

  removeSelected() {
    this.model.forEach(c => {
      c.isSelected = false;
      c.items.forEach(item => item.isSelected = false);
    });
    this.setTotalPrice();
  }

  setTotalPrice() {
    this.totalPrice = 0;
    this.totalQty = 0;
    this.model.forEach(c => {
      c.items.forEach(item => {
        if (item.isSelected) {
          this.totalQty += 1;
          this.totalPrice += (item.qty * item.netPrice);
        }
      });
    });
  }

  updateQty(action, idxShop, idxItem) {
    if (action == 0) {
      if (this.model[idxShop].items[idxItem].qty == 1) { return; }
      this.model[idxShop].items[idxItem].qty = this.model[idxShop].items[idxItem].qty - 1;
    } else {
      this.model[idxShop].items[idxItem].qty = this.model[idxShop].items[idxItem].qty + 1;
    }

    this.serviceProviderService.post('m/cart/update/qty', { "code": this.model[idxShop].items[idxItem].code, 'qty': this.model[idxShop].items[idxItem].qty }).subscribe(response => {
      this.setTotalPrice();
    }, err => {
      // if error 
    if (action == 0) {
      if (this.model[idxShop].items[idxItem].qty == 1) { return; }
      this.model[idxShop].items[idxItem].qty = this.model[idxShop].items[idxItem].qty + 1;
    } else {
      this.model[idxShop].items[idxItem].qty = this.model[idxShop].items[idxItem].qty - 1;
    }
    });

  }

  confirm() {

    let data = [];
    this.model.forEach(e => {
      if (e.isSelected) data.push(e);
      else {
        let s: any = {};
        s = e;
        s.items = e.items.filter(item => item.isSelected == true);

        if (s.items.length > 0) data.push(s);
      }
    });
    let strData = JSON.stringify(data);

    this.router.navigate(['confirm-order', { 'data': strData }]);
  }

  sum(netPrice, qty) {
    let a;
    a = this.formatPrice(netPrice * qty);
    console.log(a);

    return a;
  }

  logout() {
    localStorage.clear();
    this.userData.profileCode = '';
    this.router.navigate(['']);
  }
}
