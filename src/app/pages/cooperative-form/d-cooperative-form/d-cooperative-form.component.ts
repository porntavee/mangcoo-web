import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'app-d-cooperative-form',
  templateUrl: './d-cooperative-form.component.html',
  styleUrls: ['./d-cooperative-form.component.css']
})
export class DCooperativeFormComponent implements OnInit {
  model: any = [];
  categoryList: any = [{ 'code': '', 'title': 'ทั้งหมด', }];
  categorySelected: any;
  center = "";

  constructor(
    private router: Router,
    private serviceProviderService: ServiceProviderService,
    private utilities: Utilities,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.center = params.center;
    });
  }

  ngOnInit(): void {
    this.callReadCategory();
    this.callRead();
  }

  callReadCategory() {
    this.serviceProviderService.SendIPAddress("CooperativeForm " + this.center);
    this.serviceProviderService.post('m/cooperativeForm/category/read', { center: this.center }).subscribe(response => {
      var data: any = response;
      this.categoryList = data.objectData;
      this.categorySelected = data.objectData[0];
    }, err => {
    });
  }

  callRead() {
    this.serviceProviderService.post('m/cooperativeForm/read', {}).subscribe(response => {
      var data: any = response;
      this.model = data.objectData;
    }, err => {
    });
  }

  selectedCategory(param) {
    var result = this.categoryList.find(o => param == o.code);
    this.categorySelected = result;
  }

  selectedItem(code: string) {
    console.log(code);

    this.router.navigate(['cooperative-form-detail', code]);

  }
}