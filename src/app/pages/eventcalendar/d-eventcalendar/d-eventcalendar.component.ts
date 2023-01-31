import { formatDate } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-d-eventcalendar',
  templateUrl: './d-eventcalendar.component.html',
  styleUrls: ['./d-eventcalendar.component.css']
})
export class DEventCalendarComponent implements OnInit {
  model: any = [];
  categoryListMonth: any = [
    { 'title': 'มกราคม', 'titleEN': 'January', 'value': '01' },
    { 'title': 'กุมภาพันธ์', 'titleEN': 'February', 'value': '02' },
    { 'title': 'มีนาคม', 'titleEN': 'March', 'value': '03' },
    { 'title': 'เมษายน', 'titleEN': 'April', 'value': '04' },
    { 'title': 'พฤษภาคม', 'titleEN': 'May', 'value': '05' },
    { 'title': 'มิถุนายน', 'titleEN': 'June', 'value': '06' },
    { 'title': 'กรกฎาคม', 'titleEN': 'July', 'value': '07' },
    { 'title': 'สิงหาคม', 'titleEN': 'August', 'value': '08' },
    { 'title': 'กันยายน', 'titleEN': 'September', 'value': '09' },
    { 'title': 'ตุลาคม', 'titleEN': 'October', 'value': '10' },
    { 'title': 'พฤศจิกายน', 'titleEN': 'November', 'value': '11' },
    { 'title': 'ธันวาคม', 'titleEN': 'December', 'value': '12' },
    { 'title': 'ปีก่อนหน้านี้', 'titleEN': 'Earlier This Year', 'value': '' },
  ];
  categoryListYear: any = [
    { 'title': '2565', 'value': '2022' },
    { 'title': '2564', 'value': '2021' },
    { 'title': '2563', 'value': '2020' },
    { 'title': '2562', 'value': '2019' },
    { 'title': '2561', 'value': '2018' },
    { 'title': '2560', 'value': '2017' },
    { 'title': '2559', 'value': '2016' },
    { 'title': '2558', 'value': '2015' },
    { 'title': '2557', 'value': '2014' },
    { 'title': '2556', 'value': '2013' },
    { 'title': '2555', 'value': '2012' },
  ];
  countEventCalendar: any;
  showSelectYear: boolean = false;
  currentDate: any;
  // currentDate = '2021-02-10';
  categoryTitleMonthSelected: string = '';
  categoryTitleYearSelected: string = '';
  categoryValueMonthSelected: string = '';
  categoryValueYearSelected: string = '';
  categorySelectedMonth: string = '';
  categorySelectedYear: string = '';
  center = '';
  date: any = '';
  dateStartSubstringMonth: any;
  dateStartSubstringYear: any;
  arrayMonth: any;
  arrayYear: any;
  startDate: any;
  endDate: any;
  model001: any = [];
  model002: any = [];
  model003: any = [];
  model004: any = [];
  model005: any = [];
  model006: any = [];
  centerList: any = [];
  centerSelected: any = {};// { code: '', title: 'สัตวแพทยสภา', titleEN: 'CE' };
  showCenter: boolean = false;
  showCategory: boolean = false;
  showYear: boolean = false;
  gridViewMode:boolean = true;
  path:String = '';

  constructor(private router: Router,
    public serviceProviderService: ServiceProviderService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.center = params.center;
    });
    // for (let index = 1; index < 8; index++) {
    //   this.model.push({
    //     'code':index,
    //     'imageUrl':'../assets/img/news-top-content-main.png',
    //     'title': 'งานประชุมใหญ่สามัญประจำปีสัตวแพทยสภา 2564',
    //     'description': "เรื่อง Basic Clinical Animal Behaviour for Veterinary Practitioners",
    //     'createDate': 'Date 01/02/2021'
    //   })
    //   this.countEventCalendar = index;
    // }
  }

  @ViewChild('droppedCenter') droppedCenter: ElementRef;
  // @ViewChild('droppedCategory') droppedCategory: ElementRef;
  @ViewChild('droppedYear') droppedYear: ElementRef;

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if ((event.target as Element).className != 'div-dropdown') {
      if (!this.droppedCenter.nativeElement.contains(event.target)) this.showCenter = false;
      // if (!this.droppedCategory.nativeElement.contains(event.target)) this.showCategory = false;
    }
    if ((event.target as Element).className != 'div-dropdown-year')
      if (!this.droppedYear.nativeElement.contains(event.target)) this.showYear = false;
  }

  ngOnInit(): void {
    this.path = window.location.origin + '/' + 'eventcalendar-detail';
    this.currentDate = new Date().toISOString().slice(0, 10);
    if (this.currentDate != null) {
      this.categorySelectedMonth = this.currentDate.substring(5, 7);
      this.categorySelectedYear = this.currentDate.substring(0, 4);
      // console.log(this.categorySelectedMonth);
      // console.log(this.categorySelectedYear);
    };
    this.readCenter();
    this.read();
    this.serviceProviderService.SendIPAddress("Evetcalenndar " + this.center);
  }

  read() {
    this.categoryValueMonthSelected = this.categorySelectedMonth;
    this.categoryValueYearSelected = this.categorySelectedYear;

    this.selectedCategoryMonth(this.categoryValueMonthSelected);
    // this.selectedCategoryYear(this.categoryValueYearSelected);
  }

  search() {
    this.closeSelectedYear();
    window.scroll(0, 0);
  }

  selectedRead() {
    if (this.categoryValueMonthSelected == '01') {
      this.arrayMonth = 0;
    }
    if (this.categoryValueMonthSelected == '02') {
      this.arrayMonth = 1;
    }
    if (this.categoryValueMonthSelected == '03') {
      this.arrayMonth = 2;
    }
    if (this.categoryValueMonthSelected == '04') {
      this.arrayMonth = 3;
    }
    if (this.categoryValueMonthSelected == '05') {
      this.arrayMonth = 4;
    }
    if (this.categoryValueMonthSelected == '06') {
      this.arrayMonth = 5;
    }
    if (this.categoryValueMonthSelected == '07') {
      this.arrayMonth = 6;
    }
    if (this.categoryValueMonthSelected == '08') {
      this.arrayMonth = 7;
    }
    if (this.categoryValueMonthSelected == '09') {
      this.arrayMonth = 8;
    }
    if (this.categoryValueMonthSelected == '10') {
      this.arrayMonth = 9;
    }
    if (this.categoryValueMonthSelected == '11') {
      this.arrayMonth = 10;
    }
    if (this.categoryValueMonthSelected == '12') {
      this.arrayMonth = 11;
    }
    if (this.categoryValueYearSelected != '') {
      this.arrayYear = parseInt(this.categoryValueYearSelected);
      // console.log('this.arrayYear',this.arrayYear);
    }

    let formattedDt = formatDate(new Date(this.arrayYear, this.arrayMonth, 1), 'yyyyMMdd', 'en_US');
    let formattedDn = formatDate(new Date(this.arrayYear, this.arrayMonth + 1, 0), 'yyyyMMdd', 'en_US');
    this.startDate = formattedDt;
    this.endDate = formattedDn;

    this.readEventCalendar();
  }

  readEventCalendar() {
    this.serviceProviderService.post('m/eventCalendar/v2/read',
      { center: this.center, startDate: this.startDate, endDate: this.endDate }).subscribe(response => {
        var data: any = response;
        this.model = data.objectData;
      })
  }

  readCenter() {
    this.serviceProviderService.post('center/read', {}).subscribe(response => {
      let data: any = [];
      data = response;
      this.centerList = data.objectData;
      if (this.center)
        this.centerSelected = this.centerList.find(f => f.code == this.center);
      else
        this.centerSelected = this.centerList.find(f => f.code == "");
      this.centerList = data.objectData.sort((n1, n2) => n1.code - n2.code);

    })
  }

  selectedCategoryMonth(param) {
    this.categorySelectedMonth = param;
    var result = this.categoryListMonth.find(o => this.categorySelectedMonth == o.value,);

    if (this.serviceProviderService.lang == 'th')
      this.categoryTitleMonthSelected = result.title;
    else
      this.categoryTitleMonthSelected = result.titleEN;

    // console.log('this.categoryTitleMonthSelected',this.categoryTitleMonthSelected);
    this.categoryValueMonthSelected = result.value;
    // console.log('this.categoryValueMonthSelected',this.categoryValueMonthSelected);
    this.selectedCategoryYear(this.categoryValueYearSelected);
    this.selectedRead();
  }

  selectedCategoryYear(param) {
    this.categorySelectedYear = param;
    var result = this.categoryListYear.find(o => this.categorySelectedYear == o.value,);
    this.categoryTitleYearSelected = result.title;
    // console.log('this.categoryTitleYearSelected',this.categoryTitleYearSelected);
    this.categoryValueYearSelected = result.value;
    // console.log('this.categoryValueYearSelected',this.categoryValueYearSelected);
    this.selectedRead();
  }

  selectedYear() {
    this.showSelectYear = true;
  }

  closeSelectedYear() {
    this.showSelectYear = false;
  }

  goToEventCalendarDetail(code: string = '') {
    this.router.navigate(['eventcalendar-detail', code]);
  }

  navTo(shop) {
    this.router.navigate(['m/shop/' + shop]);
  }

  convertToPlain(html) {
    // Create a new div element
    var tempDivElement = document.createElement("div");
    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;
    let txt = tempDivElement.textContent || tempDivElement.innerText || "";
    return txt;
  }

  updateCenter(param) {
    this.serviceProviderService.post('m/eventCalendar/v2/read', { startDate: this.startDate, endDate: this.endDate, center: param }).subscribe(response => {
      let data: any = [];
      data = response;
      this.model = data.objectData;
    }, err => {
    });
  }

  selectedCenter(param) {
    this.centerSelected = param;
    this.center = param.code;
    this.updateCenter(param.code);
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

  changeMode(value) {
    console.log(value);
    
    this.gridViewMode = value;
  }

}
