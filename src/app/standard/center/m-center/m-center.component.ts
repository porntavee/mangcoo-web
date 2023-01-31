import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-m-center',
  templateUrl: './m-center.component.html',
  styleUrls: ['./m-center.component.css']
})
export class MCenterComponent implements OnInit {
  category: any = [];
  categoryList: any = [];
  categoryListMenu: any = [];
  categorySelected: any = {};
  isMousePrice = false;
  code = "";


  constructor(
    private activatedRoute: ActivatedRoute,
    public serviceProviderService: ServiceProviderService,
    private router: Router,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params.code;
    });
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.callRead();
    this.serviceProviderService.SendIPAddress("Center " + this.code);
  }

  callRead() {
    this.serviceProviderService.post('center/menu/read', { "reference": this.code }).subscribe(res => {
      let model: any = [];
      model = res;
      this.category = model.objectData;
      this.categoryList = model.objectData.filter(f => !f.isMenu).sort((n1, n2) => n1.sequence - n2.sequence);
      this.categoryListMenu = model.objectData.filter(f => f.isMenu).sort((n1, n2) => n1.sequence - n2.sequence);
      this.categorySelected = this.categoryList[0];


    }, err => {
      console.log(' err Shop --> ', err);
    })
  }

  selectedCategory(param) {
    var result = this.category.find(o => param == o.code);
    this.categorySelected = result;
    switch (result.action) {
      case 'main':
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
      case 'knowledge':
        this.router.navigate(['knowledge'], { queryParams: { center: this.code } });
        break;
      case 'cooperative':
        this.router.navigate(['cooperative-form'], { queryParams: { center: this.code } });
        break;
      case 'contact':
        this.router.navigate(['contact-us'], { queryParams: { center: this.code } });
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
}
