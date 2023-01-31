import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'app-m-news',
  templateUrl: './m-news.component.html',
  styleUrls: ['./m-news.component.css']
})
export class MNewsComponent implements OnInit {
  model: any = [];
  categoryList: any = [
    // {code: '', title: '', titleEN: ''},
    { code: '001', title: 'สัตวแพทยสภา', titleEN: 'CE' },
    { code: '002', title: 'CVCA', titleEN: 'CVCA' },
    { code: '003', title: 'CVST', titleEN: 'CVST' },
    { code: '004', title: 'มาตรฐานวิชาชีพฯ', titleEN: 'มาตรฐานวิชาชีพฯ' },
    { code: '005', title: 'จรรยาบรรณ', titleEN: 'จรรยาบรรณ' },
    { code: '006', title: 'อนุกรรมการต่างประเทศs', titleEN: 'อนุกรรมการต่างประเทศ' },
  ];
  categorySelected: any = { code: '', title: 'ข่าวทั้งหมด', titleEN: 'News' };
  model001: any = [];
  model002: any = [];
  model003: any = [];
  model004: any = [];
  model005: any = [];
  model006: any = [];
  bannerModel: any = [];
  selectedIndex: number = 0;
  center = "";
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

  ngOnInit(): void {
    window.scroll(0, 0);
    this.readCategory();
    this.readBanner();
    this.read();
    this.categoryList.forEach(e => {
      this.readCenter(e.code);
    });
    if (this.center)
      this.categorySelected = this.categoryList.find(f => f.code == this.center);
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
    this.serviceProviderService.SendIPAddress("News " + this.center);
    // this.serviceProviderService.post('m/news/read', { referenceShopCode: this.model.referenceShopCode, center: this.categorySelected.code }).subscribe(response => {
    this.serviceProviderService.post('m/news/read', { center: this.center }).subscribe(response => {
      let data: any = [];
      data = response;
      this.model = data.objectData;
      this.spinner.hide()
    }, err => {
      this.spinner.hide();
    });
  }

  readBanner() {
    this.serviceProviderService.post('m/banner/main/read', {}).subscribe(data => {
      this.model = data;
      this.bannerModel = this.model.objectData;
      console.log('banner --> ', this.bannerModel);

    }, err => {
      // this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  readCenter(param) {
    this.serviceProviderService.post('m/news/read', { center: param }).subscribe(response => {
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
      this.categoryList = data.objectData;
      this.categoryList.forEach(e => {
        this.readCenter(e.code);
      });
      if (this.center)
        this.categorySelected = this.categoryList.find(f => f.code == this.center);
      this.categoryList = data.objectData;
    })
  }

  selectedCategory(param) {
    this.categorySelected = param;
    this.center = param.code;
    // window.scroll(0, 100);
    this.read();
  }

  navToDetail(code: string = '') {
    this.router.navigate(['m/news-detail', code]);
  }

  titleCategory(code) {
    return this.categoryList.find(c => c.code == code).title;
  }

  convertToPlain(html) {

    // Create a new div element
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    // Retrieve the text property of the element 
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }
}
