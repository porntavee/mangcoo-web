import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'app-verify-approved-user',
  templateUrl: './verify-approved-user.component.html',
  styleUrls: ['./verify-approved-user.component.css']
})
export class VerifyApprovedUserComponent implements OnInit {
  model: any = [];
  centerList: any = [
    // {code: '', title: '', titleEN: ''},
    // { code: '001', title: 'สัตวแพทยสภา', titleEN: 'CE' },
    // { code: '002', title: 'CVCA', titleEN: 'CVCA' },
    // { code: '003', title: 'CVST', titleEN: 'CVST' },
    // { code: '004', title: 'มาตรฐานวิชาชีพฯ', titleEN: 'มาตรฐานวิชาชีพฯ' },
    // { code: '005', title: 'จรรยาบรรณ', titleEN: 'จรรยาบรรณ' },
    // { code: '006', title: 'อนุกรรมการต่างประเทศ', titleEN: 'อนุกรรมการต่างประเทศ' },
  ];
  centerSelected: any = {};// { code: '', title: 'สัตวแพทยสภา', titleEN: 'CE' };
  categoryList: any = [];
  yearList: any = [];
  categorySelected: any = { 'code': '', title: 'ทั้งหมด', titleEN: 'All' };
  yearSelected: any = {};
  model001: any = [];
  model002: any = [];
  model003: any = [];
  model004: any = [];
  model005: any = [];
  model006: any = [];
  bannerModel: any = [];
  selectedIndex: number = 0;
  center = "";
  showCenter: boolean = false;
  showCategory: boolean = false;
  showYear: boolean = false;
  constructor(
    private router: Router,
    public serviceProviderService: ServiceProviderService,
    private spinner: NgxSpinnerService,
    public utilities: Utilities,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.center = params.center || "";
    });
    setInterval(() => {
      this.setIndex('next', this.selectedIndex);
    }, 4000);
  }

  @ViewChild('droppedCenter') droppedCenter: ElementRef;
  @ViewChild('droppedCategory') droppedCategory: ElementRef;
  @ViewChild('droppedYear') droppedYear: ElementRef;

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if ((event.target as Element).className != 'dropdown') {
      if (!this.droppedCenter.nativeElement.contains(event.target)) this.showCenter = false;
      if (!this.droppedCategory.nativeElement.contains(event.target)) this.showCategory = false;
      if (!this.droppedYear.nativeElement.contains(event.target)) this.showYear = false;
    }
    if ((event.target as Element).className != 'dropdown-year')
      if (!this.droppedYear.nativeElement.contains(event.target)) this.showYear = false;
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.readCategory();
    this.readCenter();
    this.readBanner();
    // this.serviceProviderService.SendIPAddress("verifyApprovedUser " + this.center);
    // this.centerList.forEach(e => {
    //   this.updateCenter(e.code);
    // });
    // if (this.center)
    //   this.centerSelected = this.centerList.find(f => f.code == this.center);
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

  read() {
    this.spinner.show()
    this.serviceProviderService.post('m/verifyApprovedUser/read', { center: this.center, category: this.categorySelected.code, currentYear: this.yearSelected.code }).subscribe(response => {
      let data: any = [];
      data = response;
      this.model = data.objectData;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  readBanner() {
    this.serviceProviderService.post('m/banner/main/read', {}).subscribe(data => {
      this.model = data;
      this.bannerModel = this.model.objectData;
    }, err => {
      // this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  readYear() {
    this.serviceProviderService.post('m/verifyApprovedUser/currentyear/read', { category: (this.categorySelected?.code ?? ""), center: this.center }).subscribe(response => {
      var data: any = response;
      this.yearList = [];
      data.objectData.forEach(c => {
        var thyear = parseInt(c.currentyear) + 543;
        this.yearList.push({ 'code': c.currentyear, 'title': thyear, });
      });
      if (this.yearList.length > 0)
        this.yearSelected = this.yearList[0];
      this.read();

    }, err => {
    });

  }

  updateCenter(param) {
    this.serviceProviderService.post('m/verifyApprovedUser/read', { center: param, category: this.categorySelected.code, currentYear: this.yearSelected.code }).subscribe(response => {
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

  readCenter() {
    this.serviceProviderService.post('center/read', {}).subscribe(response => {
      let data: any = [];
      data = response;
      this.centerList = data.objectData;
      this.centerList.forEach(e => {
        this.updateCenter(e.code);
      });
      if (this.center)
        this.centerSelected = this.centerList.find(f => f.code == this.center);
      else
        this.centerSelected = this.centerList.find(f => f.code == "");
      this.centerList = data.objectData.sort((n1, n2) => n1.code - n2.code);;
    })
  }

  readCategory() {
    this.serviceProviderService.post('m/verifyApprovedUser/currentCategory/read', { center: this.center }).subscribe(response => {
      let data: any = [];
      data = response;
      this.categoryList = [{ 'code': '', title: 'ทั้งหมด', titleEN: 'All' }, ...data.objectData];
      this.categorySelected = this.categoryList[0];
      this.readYear();
    })
  }

  reset() {
    this.centerSelected = {};// { code: '', title: 'สัตวแพทยสภา', titleEN: 'CE' }
    this.center = '';
    window.scroll(0, 0);
    this.read();
  }

  titleCategory(code) {
    if (this.serviceProviderService.lang == "th")
      return this.centerList.find(c => c.code == code).title;
    else if (this.serviceProviderService.lang == "en")
      return this.centerList.find(c => c.code == code).titleEN;
    return this.centerList.find(c => c.code == code).title;
  }

  selectedCenter(param) {
    this.tempModel(param);
    this.centerSelected = param;
    this.center = param.code;
    // window.scroll(0, 0);
    this.readCategory();
    // this.read();
  }

  selectedCategory(param) {
    this.categorySelected = param;
    this.readYear();
    // this.read();
    this.centerList.forEach(e => {
      this.updateCenter(e.code);
    });
  }

  selectedYear(param) {
    this.yearSelected = param;
    this.read();
    this.centerList.forEach(e => {
      this.updateCenter(e.code);
    });
  }

  showCenterSelectedALl(param) {
    this.tempModel(param);
    this.centerSelected = this.centerList.find(c => c.code == param);
    this.center = param;
    window.scroll(0, 0);
    this.readCategory();
    // this.read();
  }

  navToDetail(code: string = '') {
    this.router.navigate(['verify-approved-user-detail', code]);
  }

  convertToPlain(html) {

    // Create a new div element
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    // Retrieve the text property of the element 
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }

  tempModel(param) {
    switch (param) {
      case '001':
        this.model = this.model001;
        break;
      case '002':
        this.model = this.model002;
        break;
      case '003':
        this.model = this.model003;
        break;
      case '004':
        this.model = this.model004;
        break;
      case '005':
        this.model = this.model005;
        break;
      case '006':
        this.model = this.model006;
        break;

      default:
        break;
    }
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
        break;
    }
  }
}