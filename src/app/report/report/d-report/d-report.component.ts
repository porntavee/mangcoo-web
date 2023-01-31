import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PdfService } from 'src/app/shares/pdf.service';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-d-report',
  templateUrl: './d-report.component.html',
  styleUrls: ['./d-report.component.css']
})
export class DReportComponent implements OnInit {
  topTrendingModel: any = [];
  flashSaleModel: any = [];
  criteriaModelGoods: any = {};
  code: string = '';
  listProduct: any = [];
  modelShopShowAll: any = [];
  ShopShowAll: any = '';
  shopShowAllLength: any = {};

  limit: number = 10;

  images = [
    // {path: 'https://mdbootstrap.com/img/Photos/Slides/img%20(9).jpg'},
    // {path: 'https://mdbootstrap.com/img/Photos/Slides/img%20(88).jpg'},
    // {path: 'https://mdbootstrap.com/img/Photos/Slides/img%20(121).jpg'},
    // {path: 'https://mdbootstrap.com/img/Photos/Slides/img%20(31).jpg'},
    // {path: 'https://mdbootstrap.com/img/Photos/Slides/img%20(31).jpg'},
  ]
  isBannerAvailable = false;
  model: any;
  shopList: any = [];
  shortcutModel = [];
  listCategoryLv1 = [];
  listCategoryLv2 = [];

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  // value = 'https://ssp.we-builds.com/#/';
  // valueBarCodeTop = '620063022983';
  // valueBarCodeTable = '210720DEA2P8PF';

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
    // {
    //   "barcodetop": "620063022985",
    //   "nameFrom": "Smile Meow",
    //   "addFrom": "5/10 ซอยอนามัยงามเจริญ25 แยก2-2 แขวงท่าข้าม,เขตบางขุนเทียน,จังหวัด กรุงเพทมหานคร 10150",
    //   "phone": "66886047613",
    //   "nameTo": "K.สิริธนกร ''พัสหย่อนหน้าบ้านได้เลยถ้ามีCODโทรก่อนส่งนะคะ''",
    //   "addTo": "บ้านเลขที่52/57 มบ.เทพราชนิเวศน์ ซ.3/1 ถ.นเรวศวร28 ต.เขาสามยอด,อำเภอเมืองลพบุรี,จังหวัดลพบุรี 15000",
    //   "charges": "572",
    //   "barcodeTable": "210720DEA2P8PF",
    //   "orderNo": "210720DEA2P8PF",
    //   "pickdate": "",
    //   "shipbydate": "22-07-2021",
    //   "note": "",
    //   "delivery1": "",
    //   "delivery2": "",
    //   "district": "อำเภอเมืองลพบุรี",
    //   "districten": "H1-LRI0106-011",
    //   "qrcode": "https://ssp.we-builds.com/#/",
    //   "items": [
    //     {
    //       "name": "หนังสือ",
    //       "des": "",
    //       "number": "1",
    //     },
    //     {
    //       "name": "ปากกา",
    //       "des": "",
    //       "number": "10",
    //     },
    //     {
    //       "name": "ดินสอ",
    //       "des": "",
    //       "number": "2",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     }
    //     ,
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     }
    //     ,
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     }, {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     }, {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     }, {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     }, {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //   ],
    // },
    // {
    //   "barcodetop": "620063022983",
    //   "nameFrom": "Smile Meow",
    //   "addFrom": "5/10 ซอยอนามัยงามเจริญ25 แยก2-2 แขวงท่าข้าม,เขตบางขุนเทียน,จังหวัด กรุงเพทมหานคร 10150",
    //   "phone": "66886047613",
    //   "nameTo": "K.สิริธนกร ''พัสหย่อนหน้าบ้านได้เลยถ้ามีCODโทรก่อนส่งนะคะ''",
    //   "addTo": "บ้านเลขที่52/57 มบ.เทพราชนิเวศน์ ซ.3/1 ถ.นเรวศวร28 ต.เขาสามยอด,อำเภอเมืองลพบุรี,จังหวัดลพบุรี 15000",
    //   "charges": "512",
    //   "barcodeTable": "210720DEA2P8PF",
    //   "orderNo": "210720DEA2P8PF",
    //   "pickdate": "",
    //   "shipbydate": "22-07-2021",
    //   "note": "",
    //   "delivery1": "",
    //   "delivery2": "",
    //   "district": "อำเภอเมืองลพบุรี",
    //   "districten": "H1-LRI0106-011",
    //   "qrcode": "https://ssp.we-builds.com/#/",
    //   "items": [
    //     {
    //       "name": "หนังสือ",
    //       "des": "",
    //       "number": "1",
    //     },
    //     {
    //       "name": "ปากกา",
    //       "des": "",
    //       "number": "10",
    //     },
    //     {
    //       "name": "ดินสอ",
    //       "des": "",
    //       "number": "2",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     }
    //     ,
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     }
    //     ,
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     }, {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     }, {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     }, {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     }, {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //   ],
    // }, {
    //   "barcodetop": "620063022999",
    //   "nameFrom": "Smile Meow",
    //   "addFrom": "5/10 ซอยอนามัยงามเจริญ25 แยก2-2 แขวงท่าข้าม,เขตบางขุนเทียน,จังหวัด กรุงเพทมหานคร 10150",
    //   "phone": "66886047613",
    //   "nameTo": "K.สิริธนกร ''พัสหย่อนหน้าบ้านได้เลยถ้ามีCODโทรก่อนส่งนะคะ''",
    //   "addTo": "บ้านเลขที่52/57 มบ.เทพราชนิเวศน์ ซ.3/1 ถ.นเรวศวร28 ต.เขาสามยอด,อำเภอเมืองลพบุรี,จังหวัดลพบุรี 15000",
    //   "charges": "512",
    //   "barcodeTable": "210720DEA2P8PF",
    //   "orderNo": "210720DEA2P8PF",
    //   "pickdate": "",
    //   "shipbydate": "22-07-2021",
    //   "note": "",
    //   "delivery1": "",
    //   "delivery2": "",
    //   "district": "อำเภอเมืองลพบุรี",
    //   "districten": "H1-LRI0106-011",
    //   "qrcode": "https://ssp.we-builds.com/#/",
    //   "items": [
    //     {
    //       "name": "หนังสือ",
    //       "des": "",
    //       "number": "1",
    //     },
    //     {
    //       "name": "ปากกา",
    //       "des": "",
    //       "number": "10",
    //     },
    //     {
    //       "name": "ดินสอ",
    //       "des": "",
    //       "number": "2",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     }
    //     ,
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     }
    //     ,
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //     {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     }, {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     }, {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     }, {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     }, {
    //       "name": "ยางลบ",
    //       "des": "",
    //       "number": "4",
    //     },
    //   ],
    // }
  ];

  items: any = [
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
  ];

  @ViewChild('contentToConvert') myDiv: ElementRef;

  constructor(
    private serviceProviderService: ServiceProviderService,
    public dialog: MatDialog,
    private activetedRoute: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceDetectorService,
    private utilities: Utilities,
    private pdfService: PdfService
  ) {
    this.activetedRoute.queryParams.subscribe(params => {
      let flashSaleModel: any = this.activetedRoute.snapshot.params;
      this.code = params.code;
    });
  }

  ngOnInit(): void {

  }

  openPDF() {
    this.serviceProviderService.postReport('reportTest/reportTest', this.header).subscribe(data => {
      let blob = new Blob([data], { type: "application/pdf"});
      let url = window.URL.createObjectURL(blob);
      let pwa = window.open(url);
      if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
          alert( 'Please disable your Pop-up blocker and try again.');
      }

      // console.log("shopShowAllLength",this.shopShowAllLength);
    }, err => {
    });
    // let data = document.getElementById('contentToConvert');
    // this.pdfService.generatePdf(data, "openPDF", "OPEN");
  }

  downloadPDF() {
    let data = document.getElementById('contentToConvert');
    this.pdfService.generatePdf(data, "DownloadPDF", "Download");
  }
  downloadAndOpenPDF() {
    let data = document.getElementById('contentToConvert');
    this.pdfService.generatePdf(data, "DownloadAndOpenPDF");
  }

}