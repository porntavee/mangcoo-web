import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'app-d-image-event',
  templateUrl: './d-image-event.component.html',
  styleUrls: ['./d-image-event.component.css']
})
export class DImageEventComponent implements OnInit {
  model: any = [];
  centerList: any = [];
  // categorySelected: any = { code: '', title: '', titleEN: '' };
  categorySelected: any = {}; // { code: '', title: 'สัตวแพทยสภา', titleEN: 'CE' };
  model001: any = [];
  model002: any = [];
  model003: any = [];
  model004: any = [];
  model005: any = [];
  model006: any = [];
  bannerModel: any = [];
  selectedIndex: number = 0;
  limit: number = 8;
  showCenter: boolean = false;
  showCategory: boolean = false;
  showYear: boolean = false;
  yearSelected: any = {};
  yearList: any = [];

  center = "";
  constructor(
    private router: Router,
    public serviceProviderService: ServiceProviderService,
    private spinner: NgxSpinnerService,
    public utilities: Utilities,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.center = params.center;
    });
    setInterval(() => {
      this.setIndex('next', this.selectedIndex);
    }, 4000);
  }

  @ViewChild('droppedCenter') droppedCenter: ElementRef;

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if ((event.target as Element).className != 'div-dropdown') {
      if (!this.droppedCenter.nativeElement.contains(event.target)) this.showCenter = false;
    }
  }

  async ngOnInit(): Promise<void> {
    window.scroll(0, 0);
    this.readBanner();
    this.readCategory();
    await this.readYear();
    this.read();
    this.serviceProviderService.SendIPAddress("ImageEvent " + this.center);
  }

  mockData() {
    for (let index = 0; index < 7; index++) {
      this.model.push({
        'code': index,
        'imageUrl': '../assets/img/news-top-content-main.png',
        'title': 'งานประชุมใหญ่สามัญประจำปีสัตวแพทยสภา 2564',
        'description': "เรื่อง Basic Clinical Animal Behaviour for Veterinary Practitioners",
        'createDate': 'Date 01/02/2021',
        'createBy': 'สัตวแพทยสภา'
      })
    }
  }

  read() {
    // this.spinner.show()
    this.serviceProviderService.post('m/imageEvent/read', { center: this.categorySelected.code, limit: this.limit, currentYear: this.yearSelected.code }).subscribe(response => {
      // this.serviceProviderService.post('m/news/read', { referenceShopCode: this.model.referenceShopCode, center: this.center }).subscribe(response => {
      let data: any = [];
      data = response;
      this.model = data.objectData;
      // this.spinner.hide()
    }, err => {
      // this.spinner.hide();
    });
  }

  onScrollDown() {
    this.limit += 8;
    this.read();
  }

  updateCenter(param) {
    this.serviceProviderService.post('m/imageEvent/read', { center: param, currentYear: this.yearSelected.code }).subscribe(response => {
      let data: any = [];
      data = response;
      switch (param) {
        case '001':
          this.model001 = data.objectData;
          break;
        case '002':
          this.model002 = data.objectData;
          break;
        case '003':
          this.model003 = data.objectData;
          break;
        case '004':
          this.model004 = data.objectData;
          break;
        case '005':
          this.model005 = data.objectData;
          break;
        case '006':
          this.model006 = data.objectData;
          break;

        default:
          break;
      }

    }, err => {
    });
  }

  readCategory() {
    this.serviceProviderService.post('center/read', {}).subscribe(response => {
      let data: any = [];
      data = response;
      this.centerList = data.objectData;
      this.centerList.forEach(e => {
        this.updateCenter(e.code);
      });
      if (this.center)
        this.categorySelected = this.centerList.find(f => f.code == this.center);
      else
        this.categorySelected = this.centerList.find(f => f.code == "");
      this.centerList = data.objectData.sort((n1, n2) => n1.code - n2.code);;
    })
  }

  // async readYear() {
  //   try {
  //     let data = await this.serviceProviderService.post('m/imageEvent/currentyear/read', { center: this.center, category: (this.categorySelected?.code ?? "") }).toPromise();
  //     let model: any = data;
  //     this.yearList = [];
  //     model.objectData.forEach(c => {
  //       var thyear = parseInt(c.currentyear) + 543;
  //       if (c.currentyear != '')
  //         this.yearList.push({ 'code': c.currentyear, 'title': thyear, });
  //     });
  //     if (this.yearList.length > 0) {
  //       this.yearSelected = this.yearList[0];
  //     }
  //     else
  //       this.yearList = [];
  //   } catch (err) {
  //     console.log(err); // you might not actually want to eat this exception.
  //   }
  // }

  readYear() {
    this.serviceProviderService.post('m/imageEvent/currentyear/read', { center: this.center, category: (this.categorySelected?.code ?? "") }).subscribe(response => {
      var data: any = response;
      this.yearList = [];
      data.objectData.forEach(c => {
        var thyear = parseInt(c.currentyear) + 543;
      if(c.currentyear != '')
        this.yearList.push({ 'code': c.currentyear, 'title': thyear, });
      });
      if (this.yearList.length > 0)
        this.yearSelected = this.yearList[0];
    }, err => { });
  }

  setIndex(type: string, index: number) {
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
    this.serviceProviderService.post('m/banner/main/read', {}).subscribe(response => {
      let data: any = [];
      data = response;
      // this.model = data;
      this.bannerModel = data.objectData;
    }, err => {
      // this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  async selectedCategory(param) {
    this.categorySelected = param;
    await this.readYear();
    this.read();
  }

  selectedYear(param) {
    this.yearSelected = param;
    this.read();
    this.centerList.forEach(e => {
      this.updateCenter(e.code);
    });
  }

  navToDetail(code: string = '') {
    this.router.navigate(['image-event-detail', code]);
  }

  convertToPlain(html) {

    // Create a new div element
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    // Retrieve the text property of the element 
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }

  showHamburger(param) {
    switch (param) {
      case 'center':
        this.showCenter = !this.showCenter;
        if (this.showCenter) {
          this.showCategory = false;
          this.showYear = false;
        }
        break;
      case 'category':
        this.showCategory = !this.showCategory;
        if (this.showCategory) {
          this.showCenter = false;
          this.showYear = false;
        }
        break;
      case 'year':
        this.showYear = !this.showYear;
        if (this.showYear) {
          this.showCenter = false;
          this.showCategory = false;
        }
        break;

      default:
        this.showCenter = false;
        this.showCenter = false;
        this.showCategory = false;
        break;
    }
  }
}
