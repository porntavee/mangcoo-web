import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs';
import { DownloadDialogComponent } from 'src/app/popups/download-dialog/download-dialog.component';
import { MainDialogComponent } from 'src/app/popups/main-dialog/main-dialog.component';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';
import * as moment from 'moment';

@Component({
  selector: 'app-d-home',
  templateUrl: './d-home.component.html',
  styleUrls: ['./d-home.component.css']
})
export class DHomeComponent implements OnInit {
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
  highlightModel: any = [{},{},{},{},{},{}];
  modelMainPopup: any = [];
  hidePopup: boolean = true;
  notShowAgain: boolean = false;

  limit: number = 10;
  selectedIndex: number = 0;
  selectedMainPopupIndex: number = 0;
  currentMonth: any = '';
  currentMonthEng: any = '';
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
    { 'title': 'มกราคม', 'value': '01', 'titleEng': 'January' },
    { 'title': 'กุมภาพันธ์', 'value': '02', 'titleEng': 'February' },
    { 'title': 'มีนาคม', 'value': '03', 'titleEng': 'March' },
    { 'title': 'เมษายน', 'value': '04', 'titleEng': 'April' },
    { 'title': 'พฤษภาคม', 'value': '05', 'titleEng': 'May' },
    { 'title': 'มิถุนายน', 'value': '06', 'titleEng': 'June' },
    { 'title': 'กรกฎาคม', 'value': '07', 'titleEng': 'July' },
    { 'title': 'สิงหาคม', 'value': '08', 'titleEng': 'August' },
    { 'title': 'กันยายน', 'value': '09', 'titleEng': 'September' },
    { 'title': 'ตุลาคม', 'value': '10', 'titleEng': 'October' },
    { 'title': 'พฤศจิกายน', 'value': '11', 'titleEng': 'November' },
    { 'title': 'ธันวาคม', 'value': '12', 'titleEng': 'December' },
    { 'title': '', 'value': '' },
  ];
  userData: any = { profileCode: '' };
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
  path:String = '';
  @ViewChild('outMainPopup') droppedYear: ElementRef;
  constructor(
    public serviceProviderService: ServiceProviderService,
    public dialog: MatDialog,
    private activetedRoute: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceDetectorService,
    private utilities: Utilities
  ) {
    this.readMainPopup();
    this.readBanner();
    this.readHighlight();
    // this.activetedRoute.queryParams.subscribe(params => {
    //   let flashSaleModel: any = this.activetedRoute.snapshot.params;
    //   this.code = params.code;
    // });

    // this.readCenter();
    // this.readNews();
    // this.readEventCalendar();
    // this.readKnowledgeVet();
    // this.readImportant();
    // this.readImageEvent();
    // this.readVetEnews();
    // this.callReadProduct();
    // this.callReadCategoryLv1();
    // auto next slide carousel.
    this.serviceProviderService.SendIPAddress("Home");

    setInterval(() => {
      this.setIndex('next', this.selectedIndex);
      this.setIndexMainPopup('next', this.selectedMainPopupIndex);
    }, 4000);
  }

  ngOnInit(): void {
    this.path = window.location.origin + '/';
    // this.checkDateMainPopup();
    if (this.utilities.getUserLocalStorage().profileCode != '' && this.utilities.getUserLocalStorage().profileCode != null) {
      this.userData = this.utilities.getUserLocalStorage();
    }
  }

  async readHighlight() {
    await this.serviceProviderService.post('m/goods/isPopular/true/read', {}).subscribe(data => {
      this.model = data;
      this.highlightModel = this.model.objectData.sort((n1, n2) => n1.code - n2.code);
      // console.log('aaaa', this.centerModel);
    }, err => {
      // this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  goToDownload(param) {
    if (param == 'ios')
    {
      window.open('https://apps.apple.com/us/app/mangcoo/id1584376604');
    }
    else if (param == 'android')
    {
      window.open('https://play.google.com/store/apps/details?id=popoz.tconnect.mangcoo');
    }
  }


  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.hidePopup)
      if ((event.target as Element).className)
        if (!this.droppedYear.nativeElement.contains(event.target))
          this.hidePopup = true;
  }

  async checkDateMainPopup() {
    let datePopup = localStorage.getItem('datePopup');
    var curDate = moment().format('YYYY-MM-DD'); datePopup
    this.hidePopup = await moment(curDate).isSameOrBefore(datePopup);
  }

  setNotShowMainPopup() {
    this.hidePopup = true;
  }

  checkShowAgain(param) {
    if (param) {
      this.notShowAgain = !this.notShowAgain;
      var curDate = moment().format('YYYY-MM-DD');
      localStorage.setItem('datePopup', curDate);
    } else {
      localStorage.removeItem("datePopup");
      console.log('hidden backdrop');
    }
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


  setIndexMainPopup(type: string, index: number) {
    if (type == "next") {
      index += 1;
      if (index == this.modelMainPopup.length) {
        index = 0;
      }
    }
    this.selectedMainPopupIndex = index;
  }

  readBanner() {
    this.serviceProviderService.post('m/banner/main/read', {}).subscribe(data => {
      this.model = data;
      this.bannerModel = this.model.objectData;
    }, err => {
      // this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }


  readMainPopup() {
    this.serviceProviderService.post('m/mainpopup/read', {}).subscribe(response => {
      let data: any = [];
      data = response;
      this.modelMainPopup = data.objectData;
      if (this.modelMainPopup.length > 0) {
        this.checkDateMainPopup();
      }
    })
  }

  readKnowledgeVet() {
    this.serviceProviderService.post('m/knowledgeVet/readMain', {}).subscribe(response => {
      let data: any = [];
      data = response;
      this.modelKnowledgeVet = data.objectData;

    })
  }

  readVetEnews() {
    this.serviceProviderService.post('m/vetEnews/readMain', {}).subscribe(response => {
      let data: any = [];
      data = response;
      this.modelVetEnews = data.objectData;
    })
  }

  readImportant() {
    this.serviceProviderService.post('m/important/readMain', {}).subscribe(response => {
      let data: any = [];
      data = response;
      this.importantModel = data.objectData;
      // console.log('importantModel -->', this.importantModel);

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
        this.router.navigate(['']);
        break;
    }
  }

  openRef(param) {
    // let url = this.modelEventCalendar.linkUrl;

    // window.open("//" + param, '_blank');
    let url = param;
    if (!url.match(/^https?:\/\//i)) {
      url = 'http://' + url;
    }
    window.open(url);
  }

  navToAllEventCalendar() {
    this.router.navigate(['/eventcalendar']);
  }

  navToDetail(code: string = '') {
    this.router.navigate(['/news-detail', code]);
  }

  navToImageEventDetail(code: string = '') {
    this.router.navigate(['image-event-detail', code]);
  }

  navToBannerDetail(code: string = '') {
    this.router.navigate(['banner-detail', code]);
  }

  navToMainPopupDetail(code: string = '') {
    this.router.navigate(['main-popup-detail', code]);
  }

  navToEventCalendarDetail(code: string = '') {
    this.router.navigate(['eventcalendar-detail', code]);
  }

  navToAllNews() {
    this.router.navigate(['/news']);
  }

  navToAllImportant() {
    this.router.navigate(['/important']);
  }

  navToImportantDetail(code: string = '') {
    this.router.navigate(['important-detail', code]);
  }


  navToAllImageEvent() {
    this.router.navigate(['/image-event']);
  }

  navToAllVetEnews() {
    this.router.navigate(['/vet-enews']);
  }

  navToAllKnowledgeVet() {
    this.router.navigate(['/knowledge-vet']);
  }


  navToCenter(code: string) {
    this.router.navigate(['center'], { queryParams: { code: code } });
  }

  navToKnowledgeVetDetail(code: string = '') {
    this.router.navigate(['knowledge-vet-detail', code]);
  }

  navToVetEnewsDetail(code: string = '') {
    this.router.navigate(['vet-enews-detail', code]);
  }

  convertToPlain(html) {

    // Create a new div element
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    // Retrieve the text property of the element 
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }

  @HostListener("window:scroll", []) onWindowScroll() {
    this.scrollFunction();
  }
  // When the user scrolls down 20px from the top of the document, show the button
  scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("go-top").style.display = "block";
    } else {
      document.getElementById("go-top").style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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

  chk = false;
  nextMinaPopup(param) {
    this.chk = !this.chk;
    if (param != undefined) {
      var count = this.modelMainPopup.length;
      if (param == count)
        param = 0;
      else if (param < 0)
        param = (count - 1)
      this.selectedMainPopupIndex = param;
      // this.chk = true;
    }


    // if (param == undefined && this.chk)
    //   this.hidePopup = true

  }
}