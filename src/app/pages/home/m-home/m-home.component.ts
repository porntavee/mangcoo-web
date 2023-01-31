import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { interval, Subscription } from 'rxjs';
import { DownloadDialogComponent } from 'src/app/popups/download-dialog/download-dialog.component';
import { MainDialogComponent } from 'src/app/popups/main-dialog/main-dialog.component';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'app-m-home',
  templateUrl: './m-home.component.html',
  styleUrls: ['./m-home.component.css']
})
export class MHomeComponent implements OnInit {
  topTrendingModel: any = [];
  flashSaleModel: any = [];
  criteriaModelGoods: any = {};
  code: string = '';
  listProduct: any = [];
  modelShopShowAll: any = [];
  ShopShowAll: any = '';
  shopShowAllLength: any = {};
  bannerModel: any = [];
  importantModel: any = [];
  centerModel: any = [];

  limit: number = 10;
  selectedIndex: number = 0;
  currentMonth: any = '';
  images = [
    // {path: 'https://mdbootstrap.com/img/Photos/Slides/img%20(9).jpg'},
    // {path: 'https://mdbootstrap.com/img/Photos/Slides/img%20(88).jpg'},
    // {path: 'https://mdbootstrap.com/img/Photos/Slides/img%20(121).jpg'},
    // {path: 'https://mdbootstrap.com/img/Photos/Slides/img%20(31).jpg'},
    // {path: 'https://mdbootstrap.com/img/Photos/Slides/img%20(31).jpg'},
  ]

  centers = [{
    "code": "001",
    "text": "ศูนย์การศึกษาต่อเนื่องทางสัตวแพทย์",
    "title": "CE"
  },
  {
    "code": "002",
    "text": "ศูนย์ประเมินความรู้ความสามารถขั้นพื้นฐานของการประกอบวิชาชีพการสัตวแพทย์ (CVCA)",
    "title": "CVCA"
  }]

  items = [
    {
      title: "1 slide label",
      summery: "1 slide label summery",
      url: "https://via.placeholder.com/200?text=first"
    },
    {
      title: "2 slide label",
      summery: "2 slide label summery",
      url: "https://via.placeholder.com/200?text=second"
    },
    {
      title: "3 slide label",
      summery: "3 slide label summery",
      url: "https://via.placeholder.com/200?text=third"
    }
  ];

  categoryListMonth: any = [
    { 'title': 'มกราคม', 'value': '01' },
    { 'title': 'กุมภาพันธ์', 'value': '02' },
    { 'title': 'มีนาคม', 'value': '03' },
    { 'title': 'เมษายน', 'value': '04' },
    { 'title': 'พฤษภาคม', 'value': '05' },
    { 'title': 'มิถุนายน', 'value': '06' },
    { 'title': 'กรกฎาคม', 'value': '07' },
    { 'title': 'สิงหาคม', 'value': '08' },
    { 'title': 'กันยายน', 'value': '09' },
    { 'title': 'ตุลาคม', 'value': '10' },
    { 'title': 'พฤศจิกายน', 'value': '11' },
    { 'title': 'ธันวาคม', 'value': '12' },
    { 'title': '', 'value': '' },
  ];

  isBannerAvailable = false;
  model: any;
  shopList: any = [];
  shortcutModel = [];
  listCategoryLv1 = [];
  listCategoryLv2 = [];
  modelNews: any = [];
  modelEventCalendar: any = [];
  modelKnowledgeVet: any = [];
  modelImageEvent: any = [];
  modelVetEnews: any = [];

  constructor(
    public serviceProviderService: ServiceProviderService,
    public dialog: MatDialog,
    private activetedRoute: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceDetectorService,
    private utilities: Utilities
  ) {
    // this.bannerModel.push({
    //   'code': 1,
    //   'imageUrl': './assets/img/background_vet1.png',
    // },
    //   {
    //     'code': 2,
    //     'imageUrl': './assets/img/background_vet.png',
    //   },
    //   {
    //     'code': 3,
    //     'imageUrl': './assets/img/background_vet2.png',
    //   },
    //   {
    //     'code': 3,
    //     'imageUrl': './assets/img/background_vet3.png',
    //   },
    //   {
    //     'code': 3,
    //     'imageUrl': './assets/img/background_vet4.png',
    //   });

    // this.callCheckSeq();
    this.readBanner();
    // this.readBannerNew();
    // this.readMainPopup();
    this.activetedRoute.queryParams.subscribe(params => {
      let flashSaleModel: any = this.activetedRoute.snapshot.params;
      this.code = params.code;
    });
    this.readCenter();
    this.readNews();
    this.readEventCalendar();
    this.readKnowledgeVet();
    this.readImportant();
    this.readImageEvent();
    this.readVetEnews();

    // this.callReadProduct();
    // this.callReadCategoryLv1();
    // auto next slide carousel.
    setInterval(() => {
      this.setIndex('next', this.selectedIndex);
    }, 4000);
  }

  ngOnInit(): void {
    // const isMobile = this.deviceService.isMobile();
    // const isTablet = this.deviceService.isTablet();
    // const isDesktopDevice = this.deviceService.isDesktop();
    // if (isMobile) {
    //   this.router.navigate(['m']);
    // }
    // else if (isTablet) {
    //   this.router.navigate(['m']);
    // } else {
    // this.router.navigate(['']);
    // }


  }

  setIndex(type: string, index: number) {

    // if (type === 'previous') {
    //   index -= 1;
    //   if (index < 0) {
    //     index = this.bannerModel.length - 1;
    //   }
    // } else {
    if (type == "next") {
      index += 1;
      if (index == this.bannerModel.length) {
        index = 0;
      }
    }

    // }

    this.selectedIndex = index;
  }

  readBanner() {
    this.serviceProviderService.post('m/banner/main/read', {}).subscribe(data => {
      this.model = data;
      this.bannerModel = this.model.objectData;
    }, err => {
      // this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  readNews() {
    this.serviceProviderService.post('m/news/read', {}).subscribe(response => {
      let data: any = [];
      data = response;
      data.objectData.forEach(c => {
        if (c.center != "") {
          let centers = this.centerModel.find(x => x.title == c.center);
          c.centertitle = centers?.titleShort;
        }
        else {
          c.centertitle = 'สัตวแพทยสภา';
        }
      });
      this.modelNews = data.objectData;

      // console.log('modelNews -->', this.modelNews);

    })
  }

  readImageEvent() {
    this.serviceProviderService.post('m/imageEvent/read', {}).subscribe(response => {
      let data: any = [];
      data = response;
      data.objectData.forEach(c => {
        if (c.center != "") {
          let centers = this.centerModel.find(x => x.title == c.center);
          c.centertitle = centers?.titleShort;
        }
        else {
          c.centertitle = 'สัตวแพทยสภา';
        }
      });
      this.modelImageEvent = data.objectData;

      // console.log('modelImageEvent -->', this.modelImageEvent);

    })
  }

  readEventCalendar() {
    this.serviceProviderService.post('m/eventcalendar/read', {}).subscribe(response => {
      let data: any = [];
      data = response;
      data.objectData.forEach(c => {
        if (c.center != "") {
          let centers = this.centerModel.find(x => x.title == c.center);
          c.centertitle = centers?.titleShort;
        }
        else {
          c.centertitle = 'สัตวแพทยสภา';
        }
      });
      this.modelEventCalendar = data.objectData;

      let thyear = parseInt(this.modelEventCalendar[0].dateStart.substring(0, 4)) + 543;
      let month = this.modelEventCalendar[0].dateStart.substring(4, 6);
      var result = this.categoryListMonth.find(o => o.value == month);
      this.currentMonth = result.title + ' ' + thyear;

      this.modelEventCalendar = data.objectData;

      // console.log('modelEventCalendar -->', this.modelEventCalendar);
    })
  }

  readKnowledgeVet() {
    this.serviceProviderService.post('m/knowledgeVet/read', {}).subscribe(response => {
      let data: any = [];
      data = response;
      this.modelKnowledgeVet = data.objectData;

    })
  }

  readVetEnews() {
    this.serviceProviderService.post('m/vetEnews/read', {}).subscribe(response => {
      let data: any = [];
      data = response;
      this.modelVetEnews = data.objectData;
      // console.log('modelKnowledge -->', this.modelKnowledge);

    })
  }

  readImportant() {
    this.serviceProviderService.post('m/important/read', {}).subscribe(response => {
      let data: any = [];
      data = response;
      this.importantModel = data.objectData;
      console.log('importantModel -->', this.importantModel);

    })
  }



  // readMainPopup() {
  //   this.serviceProviderService.post('m/MainPopup/read', {}).subscribe(data => {
  //     this.model = data;

  //     let model = [];
  //     this.model.objectData.forEach(element => {
  //       model.push({ path: element.imageUrl });
  //     });
  //     this.openMainDialog(this.model.objectData);

  //     // this.toastr.success('ลบรายการเรียบร้อย', 'แจ้งเตือนระบบ', { timeOut: 2000 });
  //     // this.messageInput.splice(idx, 1);
  //   }, err => {
  //     // this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
  //   });
  // }

  readCenter() {
    this.serviceProviderService.post('center/read', {}).subscribe(data => {
      this.model = data;
      this.centerModel = this.model.objectData;
    }, err => {
      // this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  nav(nav: string) {
    switch (nav) {
      case 'search':
        this.router.navigate(['search']);
        break;
      case 'login':
        this.router.navigate(['login']);
        break;
      case 'login':
        this.router.navigate(['login']);
        break;
      default:
        this.router.navigate(['m']);
        break;
    }
  }

  navToAllEventCalendar() {
    this.router.navigate(['m/eventcalendar']);
  }

  navToDetail(code: string = '') {
    this.router.navigate(['m-news-detail', code]);
  }

  navToImageEventDetail(code: string = '') {
    this.router.navigate(['m/image-event', code]);
  }

  navToBannerDetail(code: string = '') {
    this.router.navigate(['banner', code]);
  }

  navToEventCalendarDetail(code: string = '') {
    this.router.navigate(['m/eventcalendar-detail', code], { queryParams: { "code": code } });
  }

  navToAllNews() {
    this.router.navigate(['m/news']);
  }

  navToAllImportant() {
    this.router.navigate(['m/important']);
  }

  navToImportantDetail(code: string = '') {
    this.router.navigate(['m/important-detail', code]);
  }


  navToAllImageEvent() {
    this.router.navigate(['/image-event']);
  }

  navToAllVetEnews() {
    this.router.navigate(['/vet-enews']);
  }

  navToVetEnewsDetail(code: string = '') {
    this.router.navigate(['m/vet-enews-detail', code]);
  }

  navToAllKnowledgeVet() {
    this.router.navigate(['/knowledge-vet']);
  }

  navToKnowledgeVetDetail(code: string = '') {
    this.router.navigate(['m/knowledge-vet-detail', code]);
  }

  navToCenter(code: string) {
    this.router.navigate(['center'], { queryParams: { code: code } });
  }

  convertToPlain(html) {

    // Create a new div element
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    let txt = tempDivElement.textContent || tempDivElement.innerText || "";

    // Retrieve the text property of the element 
    if (txt != '') {
      return txt.substring(0, 80) + '...';
    }
    else {
      return txt.substring(0, 80);
    }
  }

  convertToPlain2(html) {

    // Create a new div element
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    let txt = tempDivElement.textContent || tempDivElement.innerText || "";

    // Retrieve the text property of the element 
    return txt;
  }

  callReadCategoryLv1() {
    this.serviceProviderService.post('m/mCategory/read', { 'category': 'lv1' }).subscribe(res => {
      let data: any = {};
      data = res;
      // data.objectData = [
      //   {code: '00',title:'we build operate',imageUrl:''},
      //   {code: '00',title:'we build operate',imageUrl:''},
      //   {code: '00',title:'we build operate',imageUrl:''},
      //   {code: '00',title:'we build operate',imageUrl:''},
      //   {code: '00',title:'we build operate',imageUrl:''},
      //   {code: '00',title:'we build operate',imageUrl:''},
      //   {code: '00',title:'we build operate',imageUrl:''}
      // ]
      let count = data.objectData.length;
      if (count > 14) {
        if (count < 16) {
          this.listCategoryLv1 = data.objectData.slice(0, 8);
          this.listCategoryLv2 = data.objectData.slice(8, count);
        } else {
          this.listCategoryLv1 = data.objectData.slice(0, Math.round(count / 2));
          this.listCategoryLv2 = data.objectData.slice(Math.round(count / 2), count);
        }
      } else {
        this.listCategoryLv1 = data.objectData;
      }
    });
  }
}