import { formatDate } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-d-center',
  templateUrl: './d-center.component.html',
  styleUrls: ['./d-center.component.css']
})
export class DCenterComponent implements OnInit {
  category: any = [];
  categoryList: any = [];
  categoryListMenu: any = [];
  categorySelected: any = {};
  isMousePrice = false;
  showSelectMenu: boolean = false;
  code = "";
  showCenter: boolean = false;
  showCategory: boolean = false;
  showYear: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    public serviceProviderService: ServiceProviderService,
    private router: Router,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params.code;
    });
  }

  @ViewChild('droppedCategory') droppedCategory: ElementRef;

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if ((event.target as Element).className != 'div-dropdown') {
      if (!this.droppedCategory.nativeElement.contains(event.target)) this.showCategory = false;
    }
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.callRead();
    this.serviceProviderService.SendIPAddress("Center " + this.code);
  }

  selectedMenu() {
    this.showSelectMenu = true;
  }

  closeSelectedMenu() {
    this.showSelectMenu = false;
  }

  callRead() {
    this.serviceProviderService.post('center/menu/readweb', { "reference": this.code }).subscribe(res => {
      let model: any = [];
      model = res;
      this.category = model.objectData;
      this.categoryList = model.objectData.filter(f => f.isMenu).sort((n1, n2) => n1.sequence - n2.sequence);
      this.categoryListMenu = model.objectData.sort((n1, n2) => n1.sequence - n2.sequence);
      this.categorySelected = this.categoryList[0];


    }, err => {
      console.log(' err Shop --> ', err);
    })
  }

  selectedCategory(param) {
    // debugger
    var result = this.category.find(o => param == o.code);
    this.showSelectMenu = false;
    this.categorySelected = result;
    switch (result.action) {
      case 'main':
        break;
      case 'main-tab':
        break;
      case 'structure_p':
        break;
      case 'e-learning':
        break;
      case 'news':
        this.router.navigate(['/news'], { queryParams: { center: this.code } });
        break;
      case 'event':
        this.router.navigate(['eventcalendar'], { queryParams: { center: this.code } });
        break;
      case 'image-event':
        this.router.navigate(['image-event'], { queryParams: { center: this.code } });
        break;
      case 'event-abroad':
        this.router.navigate(['event-abroad'], { queryParams: { center: this.code } });
        break;
      case 'knowledge':
        this.router.navigate(['knowledge'], { queryParams: { center: this.code } });
        break;
      case 'knowledge-vet':
        this.router.navigate(['knowledge-vet'], { queryParams: { center: this.code } });
        break;
      case 'cooperative':
        this.router.navigate(['cooperative-form'], { queryParams: { center: this.code } });
        break;
      case 'contact':
        // this.router.navigate(['contact-us'], { queryParams: { center: this.code } });
        break;
      case 'activities':
        let url = result.linkUrl;
        if (!url.match(/^https?:\/\//i)) {
          url = 'http://' + url;
        }
        window.open(url);
        break;
      case 'calendar':
        let url2 = result.linkUrl;
        if (!url2.match(/^https?:\/\//i)) {
          url2 = 'http://' + url2;
        }
        window.open(url2);
        break;
      case 'law':
        this.router.navigate(['law'], { queryParams: { center: this.code } });
        break;
      case 'training-institute':
        this.router.navigate(['trainingInstitute'], { queryParams: { center: this.code } });
        break;
      // case 'verify-approved-user':
      //   this.router.navigate(['verify-approved-user'], { queryParams: { center: this.code } });
      //   break;
      case 'expert-branch':
        this.router.navigate(['expert-branch'], { queryParams: { center: this.code } });
        break;
      case 'seminar':
        this.router.navigate(['seminar'], { queryParams: { center: this.code } });
        break;
      default:
        break;
    }
  }


  callBack(message: any) {

  }

  chkMousePriceIn() {
    this.isMousePrice = true;
  }

  chkMousePriceOut() {
    this.isMousePrice = false;
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
