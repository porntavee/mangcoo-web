import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-d-search-result',
  templateUrl: './d-search-result.component.html',
  styleUrls: ['./d-search-result.component.css'],
})
export class DSearchResultComponent implements OnInit {
  model: any = [];
  model1: any = [];
  model2: any = [];
  tempModel: any = [];
  code: string = '';
  total: number = 0;
  total1: number = 0;
  total2: number = 0;
  firstName: string = '';
  lastName: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    public serviceProviderService: ServiceProviderService,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params.code;
    });
  }


  ngOnInit(): void {
    this.callRead();
  }


  callRead() {
    if (this.code != '') {
      var arr = this.code.split(' ');
      if (arr.length == 1) {
        this.firstName = arr[0];
      } else {
        this.firstName = arr[0];
        this.lastName = arr[1];
      }
      this.serviceProviderService.post('veterinary/read', { "firstName": this.firstName, 'lastName': this.lastName }).subscribe(response => {
        var data: any = response;
        data.objectData.forEach(c => {
          if(c.category != "")
          {
            c.description = c.category == "ชั้นหนึ่ง" ? "ผู้ประกอบวิชาชีพการสัตวแพทย์ชั้น 1" : c.category == "ชั้นสอง" ? "ผู้ประกอบวิชาชีพการสัตวแพทย์ชั้น 2" : "";
          }
        });
        this.model = data.objectData;
        this.model1 = this.model.filter(c => c.category == "ชั้นหนึ่ง");
        this.model2 = this.model.filter(c => c.category == "ชั้นสอง");
        console.log('model -->', this.model);
        this.total = this.model.length;
        this.total1 = this.model1.length;
        this.total2 = this.model2.length;

      }, err => {
      });
    }

  }

}
