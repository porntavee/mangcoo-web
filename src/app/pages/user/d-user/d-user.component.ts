import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-d-user',
  templateUrl: './d-user.component.html',
  styleUrls: ['./d-user.component.css']
})
export class DUserComponent implements OnInit {
  @Input() menuActive: String = '';
  menuSubActive = 'all';
  userData: any = {};

  isShop: boolean = false;

  isdownload: boolean = false;
  header: any = [
    {
      "barcodetop": "620063022984",
      "nameFrom": "Smile Meow",
      "addFrom": "5/10 ซอยอนามัยงามเจริญ25 แยก2-2 แขวงท่าข้าม,เขตบางขุนเทียน,จังหวัด กรุงเพทมหานคร 10150",
      "phone": "66886047613",
      "nameTo": "K.สิริธนกร ''พัสหย่อนหน้าบ้านได้เลยถ้ามีCODโทรก่อนส่งนะคะ''",
      "addTo": "บ้านเลขที่52/57 มบ.เทพราชนิเวศน์ ซ.3/1 ถ.นเรวศวร28 ต.เขาสามยอด,อำเภอเมืองลพบุรี,จังหวัดลพบุรี 15000",
      "charges": "572",
      "barcodeTable": "210720DEA2P8PF",
      "orderNo": "210720DEA2P8PF",
      "pickdate": "",
      "shipbydate": "22-07-2021",
      "note": "",
      "delivery1": "",
      "delivery2": "",
      "district": "อำเภอเมืองลพบุรี",
      "districten": "H1-LRI0106-011",
      "qrcode": "https://ssp.we-builds.com/#/",
      "items": [
        {
          "name": "หนังสือ",
          "des": "",
          "number": "1",
        },
        {
          "name": "ปากกา",
          "des": "",
          "number": "10",
        },
        {
          "name": "ดินสอ",
          "des": "",
          "number": "2",
        },
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        }
        ,
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        }
        ,
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        },
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        },
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        },
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        },
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        },
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        },
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        },
      ],
    },
    {
      "barcodetop": "620063022985",
      "nameFrom": "Smile Meow",
      "addFrom": "5/10 ซอยอนามัยงามเจริญ25 แยก2-2 แขวงท่าข้าม,เขตบางขุนเทียน,จังหวัด กรุงเพทมหานคร 10150",
      "phone": "66886047613",
      "nameTo": "K.สิริธนกร ''พัสหย่อนหน้าบ้านได้เลยถ้ามีCODโทรก่อนส่งนะคะ''",
      "addTo": "บ้านเลขที่52/57 มบ.เทพราชนิเวศน์ ซ.3/1 ถ.นเรวศวร28 ต.เขาสามยอด,อำเภอเมืองลพบุรี,จังหวัดลพบุรี 15000",
      "charges": "572",
      "barcodeTable": "210720DEA2P8PF",
      "orderNo": "210720DEA2P8PF",
      "pickdate": "",
      "shipbydate": "22-07-2021",
      "note": "",
      "delivery1": "",
      "delivery2": "",
      "district": "อำเภอเมืองลพบุรี",
      "districten": "H1-LRI0106-011",
      "qrcode": "https://ssp.we-builds.com/#/",
      "items": [
        {
          "name": "หนังสือ",
          "des": "",
          "number": "1",
        },
        {
          "name": "ปากกา",
          "des": "",
          "number": "10",
        },
        {
          "name": "ดินสอ",
          "des": "",
          "number": "2",
        },
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        }
        ,
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        }
        ,
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        },
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        },
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        },
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        },
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        },
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        },
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        },
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        }, {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        }, {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        }, {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        }, {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        },
      ],
    },
    {
      "barcodetop": "620063022983",
      "nameFrom": "Smile Meow",
      "addFrom": "5/10 ซอยอนามัยงามเจริญ25 แยก2-2 แขวงท่าข้าม,เขตบางขุนเทียน,จังหวัด กรุงเพทมหานคร 10150",
      "phone": "66886047613",
      "nameTo": "K.สิริธนกร ''พัสหย่อนหน้าบ้านได้เลยถ้ามีCODโทรก่อนส่งนะคะ''",
      "addTo": "บ้านเลขที่52/57 มบ.เทพราชนิเวศน์ ซ.3/1 ถ.นเรวศวร28 ต.เขาสามยอด,อำเภอเมืองลพบุรี,จังหวัดลพบุรี 15000",
      "charges": "572",
      "barcodeTable": "210720DEA2P8PF",
      "orderNo": "210720DEA2P8PF",
      "pickdate": "",
      "shipbydate": "22-07-2021",
      "note": "",
      "delivery1": "",
      "delivery2": "",
      "district": "อำเภอเมืองลพบุรี",
      "districten": "H1-LRI0106-011",
      "qrcode": "https://ssp.we-builds.com/#/",
      "items": [
        {
          "name": "หนังสือ",
          "des": "",
          "number": "1",
        },
        {
          "name": "ปากกา",
          "des": "",
          "number": "10",
        },
        {
          "name": "ดินสอ",
          "des": "",
          "number": "2",
        },
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        }
        ,
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        }
        ,
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        },
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        },
        {
          "name": "ยางลบ",
          "des": "",
          "number": "4",
        }
      ],
    },
  ];

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      // inside
    } else {
      // outside
    }
  }

  constructor(
    private serviceProviderService: ServiceProviderService,
    private router: Router,
    private eRef: ElementRef,
    private utilities: Utilities,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    if (this.utilities.getUserLocalStorage().referenceShopCode == '' || this.utilities.getUserLocalStorage().referenceShopCode == null) {
      this.isShop = false;
    } else {
      this.isShop = true;
    }
    this.userData = this.utilities.getUserLocalStorage();
  }

  navTo(param) {
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
      case 'confirm-order':
        this.menuActive = 'confirm-order';
        this.router.navigate(['confirm-order']);
        break;
      case 'profile':
        this.menuActive = 'profile';
        this.router.navigate(['profile']);
        break;
      case 'payment':
        this.menuActive = 'payment';
        this.router.navigate(['payment']);
        break;
      case 'address':
        this.menuActive = 'address';
        this.router.navigate(['address']);
        break;
      case 'password':
        this.menuActive = 'password';
        this.router.navigate(['password']);
        break;
      case 'mypurchase':
        this.menuActive = 'mypurchase';
        this.router.navigate(['mypurchase']);
        break;
      case 'mySell':
        this.menuActive = 'mySell';
        this.router.navigate(['my-sell']);
        break;

      default:
        this.router.navigate(['']);
        break;
    }
  }

  checkThisAccount() {
    if (this.menuActive == 'profile' ||
      this.menuActive == 'password' ||
      this.menuActive == 'address' ||
      this.menuActive == 'payment'
    ) {
      return true;
    } else
      return false;
  }

  setPage(page: String) {
    this.menuActive = page;
  }

  downloadPDF() {
    this.spinner.show();
    if (!this.isdownload) {
      this.isdownload = true;
      this.serviceProviderService.postReport('reportTest/reportTest', this.header).subscribe(data => {
        this.spinner.hide();
        let blob = new Blob([data], { type: "application/pdf" });
        let url = window.URL.createObjectURL(blob);
        let pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
          alert('Please disable your Pop-up blocker and try again.');
        }
        this.isdownload = false;
        // console.log("shopShowAllLength",this.shopShowAllLength);
      }, err => {
        this.spinner.hide();
      });
    }
  }
}
