import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PdfService } from 'src/app/shares/pdf.service';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-m-report',
  templateUrl: './m-report.component.html',
  styleUrls: ['./m-report.component.css']
})
export class MReportComponent implements OnInit {
  // @Input() isaction:any = false;

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
      "barcodetop": "620063022983",
      "namwFrom": "Smile Meow",
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
      "namwFrom": "Smile Meow",
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
    }
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

  openPDF(params) {
    this.pdfService.generatePdf(params, "openPDF", "OPEN");
  }

  downloadPDF(params) {
    this.pdfService.generatePdf(params, "DownloadPDF", "Download");
  }
  downloadAndOpenPDF(params) {
    this.pdfService.generatePdf(params, "DownloadAndOpenPDF");
  }
}