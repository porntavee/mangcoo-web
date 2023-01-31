import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-d-my-sell',
  templateUrl: './d-my-sell.component.html',
  styleUrls: ['./d-my-sell.component.css']
})
export class DMySellComponent implements OnInit {
  itemSelected: boolean = false;
  menuSubActive = '';
  statusModel: string = '';
  modelAll: any = [];
  modelWaitPending: any = [];
  modelPending: any = [];
  modelSuccess: any = [];
  modelCancel: any = [];

  constructor(private router: Router,
    private serviceProviderService: ServiceProviderService,
    private utilities: Utilities,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    if (this.utilities.getUserLocalStorage().referenceShopCode == '' || this.utilities.getUserLocalStorage().referenceShopCode == null) {
      this.router.navigate(['profile']);
    }
    this.callRead();
  }

  callRead() {
    this.serviceProviderService.post('m/cart/v2/order/shop/read', { referenceShopCode: this.utilities.getUserLocalStorage().referenceShopCode }).subscribe(response => {
      var data: any = response;
      this.modelAll = data.objectData;
      console.log(this.modelAll);

    }, err => {
    });
  }

  formatPrice(param) {
    return this.utilities.cf(param);
  }

  formatStatus(status) {
    let text = '';

    switch (status) {
      case "A":
        text = 'เสร็จสิ้น';

        break;
      case "P":
        text = 'อยู่ระหว่างการจัดส่ง';
        break;
      case "V":
        text = 'รอชำระเงิน';
        break;
      case "W":
        text = 'รอการจัดส่ง';
        break;
      case "R":
        text = 'ยกเลิก';
        break;
      default:
        text = '';
    }
    return text;
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

  goTo(path, param) {
    switch (path) {
      case 'qr-payment':
        this.router.navigate(['qr-payment'], { queryParams: { code: param } });
        break;
      case 'profile':
        this.router.navigate(['profile']);
        break;

      default:
        break;
    }
  }

  printOut() {
    let obj = [];
    this.modelAll.forEach(e => {
      e.items.forEach(item => {
        if (item.isSelected)
          obj.push(item);
      })
    });
    if (obj.length <= 0) {
      this.toastr.warning('กรุณาเลือกสินค้าที่ต้องการออกเอกสาร', 'แจ้งเตือนระบบ', { timeOut: 1000 });
     }
    else {
      this.spinner.show();
      this.serviceProviderService.postReport('printOut/printOut', obj).subscribe(data => {
        this.spinner.hide();
        let blob = new Blob([data], { type: "application/pdf" });
        let url = window.URL.createObjectURL(blob);
        let pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
          alert('Please disable your Pop-up blocker and try again.');
        }
        // console.log("shopShowAllLength",this.shopShowAllLength);
      }, err => {
        this.spinner.hide();
      });
    }
  }

  checkUncheckAll() {
    this.itemSelected = !this.itemSelected;
    this.modelAll.forEach(e => {
      e.items.forEach(item => {
        item.isSelected = this.itemSelected;
      })
    });
  }

  checkUncheckShop(indexShop, indexItem) {
    this.modelAll[indexShop].items[indexItem].isSelected = !this.modelAll[indexShop].items[indexItem].isSelected;

    let check = this.modelAll.filter(c => c.items.filter(f => (f.isSelected ?? false) == false).length > 0).length;
    if (check > 0) this.itemSelected = false;
    else this.itemSelected = true;

  }
}
