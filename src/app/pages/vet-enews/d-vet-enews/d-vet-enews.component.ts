import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'app-d-vet-enews',
  templateUrl: './d-vet-enews.component.html',
  styleUrls: ['./d-vet-enews.component.css']
})
export class DVetEnewsComponent implements OnInit {
  model: any = [];
  modelInterest: any = [];
  categoryList: any = [];
  categorySelected: any;
  showCenter: boolean = false;
  showCategory: boolean = false;
  showYear: boolean = false;

  constructor(
    private router: Router,
    public serviceProviderService: ServiceProviderService,
    private utilities: Utilities,
    private activatedRoute: ActivatedRoute) { }

  @ViewChild('droppedYear') droppedYear: ElementRef;

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if ((event.target as Element).className != 'div-dropdown-year')
      if (!this.droppedYear.nativeElement.contains(event.target)) this.showYear = false;
  }

  ngOnInit(): void {

    // this.model.push({'code':'1','imageUrl':'https://s2.readgur.com/store/data/002064664_1-617dba4e3e637a7bc7484614bd24d1b4.png','title':'ข้อบังคับสัตวแพทยสภา ว่าด้วยการประชุมคณะกรรมการ คณะอนุกรรมการฯ (ฉบับที่ ๒) พ.ศ. ๒๕๖๓-e.pdf'});
    // this.model.push({'code':'2','imageUrl':'https://s2.readgur.com/store/data/002064664_1-617dba4e3e637a7bc7484614bd24d1b4.png','title':'ประกาศสพ.สภ.19-2564 การปฏิบัติด้านการเงินของสัตวแพทยสภา'});
    // this.model.push({'code':'3','imageUrl':'https://s2.readgur.com/store/data/002064664_1-617dba4e3e637a7bc7484614bd24d1b4.png','title':'ประกาศสัตวแพทยสภา ที่ ๕-๒๕๖๔ เรื่อง แนวทางพิจารณาสถาบันหรือหน่วยงานฯ พ.ศ. ๒๕๖๔'});
    // this.model.push({'code':'4','imageUrl':'https://s2.readgur.com/store/data/002064664_1-617dba4e3e637a7bc7484614bd24d1b4.png','title':'ประกาศสัตวแพทยสภา ที่ ๕-๒๕๖๔ เรื่อง แนวทางพิจารณาสถาบันหรือหน่วยงานฯ พ.ศ. ๒๕๖๔'});

    this.serviceProviderService.SendIPAddress("VetEnews");
    this.callReadCategory();
    window.scroll(0,0);
  }

  callReadCategory() {
    this.serviceProviderService.post('m/vetEnews/currentyear/read', {}).subscribe(response => {
      var data: any = response;
      data.objectData.forEach(c => {
        var thyear = parseInt(c.currentyear) + 543;
        this.categoryList.push({ 'code': c.currentyear, 'title': thyear, });
      });
      this.categorySelected = this.categoryList[0];
      this.callRead();

    }, err => {
    });

  }

  callRead() {
    this.serviceProviderService.post('m/vetEnews/read',  {'currentYear':this.categorySelected.code}).subscribe(response => {
      var data: any = response;
      this.model = data.objectData;
      this.callReadInterest()
      // window.scroll(0,0);

    }, err => {
    });
  }

  callReadInterest() {
    this.serviceProviderService.post('m/vetEnews/read',  {action:'view'}).subscribe(response => {
      var data: any = response;
      this.modelInterest = data.objectData;
    }, err => {
    });
  }

  selectedCategory(param) {
    var result = this.categoryList.find(o => param == o.code);
    this.categorySelected = result;
    this.callRead();
  }

  selectedItem(code: string) {
    console.log(code);

    this.router.navigate(['vet-enews-detail', code]);

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