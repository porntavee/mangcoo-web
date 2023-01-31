import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-d-contact-us',
  templateUrl: './d-contact-us.component.html',
  styleUrls: ['./d-contact-us.component.css']
})
export class DContactUsComponent implements OnInit {
  center = "";
  mouseOvered:boolean = false;
  mouseOvered1:boolean = false;
  mouseOvered2:boolean = false;
  mouseOvered3:boolean = false;
  mouseOvered4:boolean = false;
  mouseOvered5:boolean = false;
  mouseOvered6:boolean = false;
  mouseOvered7:boolean = false;
  mouseOvered8:boolean = false;
  aboutUs: any = {};
  modelUni:any = [
    {title:'ม.เกษตรศาสตร์',titleEN:'KU',link:''},
    {title:'ม.จุฬาลงกรณ์',titleEN:'CU',link:''},
    {title:'ม.ขอนแก่น',titleEN:'KKU',link:''},
    {title:'ม.มหิดล',titleEN:'MU',link:''},
    {title:'ม.เชียงใหม่',titleEN:'CMU',link:''},
    {title:'ม.เทคโนโลยีมหานคร',titleEN:'MUT',link:''},
    {title:'ม.เทคโนโลยีราชมงคลตะวันออก',titleEN:'RMUTTO',link:''},
    {title:'ม.มหาสารคาม',titleEN:'MSU',link:''},
    {title:'ม.เทคโนโลยีราชมงคลศรีวิชัย',titleEN:'RMUTSV',link:''},
    {title:'ม.เวสเทิร์น',titleEN:'WTU',link:''},
    {title:'ม.สงขลานครินทร์',titleEN:'PSU',link:''},
    {title:'ม.วลัยลักษณ์',titleEN:'WU',link:''},
  ]
  model:any = [];
  modelRelateAgency: any = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    public serviceProviderService: ServiceProviderService,
    private toastr: ToastrService,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.center = params.center;
    });
  }

  ngOnInit(): void {
    this.callRead();
    this.callReadRelateAgency();
  }

  callRead() {
    this.serviceProviderService.SendIPAddress("ContactUs " + this.center);
    this.serviceProviderService.post('aboutUs/read', { center: this.center }).subscribe(data => {
      let model: any = {};
      model = data;
      this.aboutUs = model.objectData[0];

    }, err => {
      console.log(' err Shop --> ', err);
    });
  }

  callReadRelateAgency() {
    this.serviceProviderService.post('relateAgency/read', { center: "" }).subscribe(data => {
      let model: any = {};
      model = data;
      this.modelRelateAgency = model.objectData.sort();

    }, err => {
      console.log(' err Shop --> ', err);
    });
  }

  create() {
    if (this.model.firstName == '' || this.model.firstName == undefined) {
      this.toastr.warning('กรุณากรอก Name', 'แจ้งเตือนระบบ', { timeOut: 1000 });
      return;
    }
    if (this.model.lastName == '' || this.model.lastName == undefined) {
      this.toastr.warning('กรุณากรอก Email', 'แจ้งเตือนระบบ', { timeOut: 1000 });
      return;
    }
    if (this.model.title == '' || this.model.title == undefined) {
      this.toastr.warning('กรุณากรอก Subject', 'แจ้งเตือนระบบ', { timeOut: 1000 });
      return;
    }
    if (this.model.description == '' || this.model.description == undefined) {
      this.toastr.warning('กรุณากรอก Message', 'แจ้งเตือนระบบ', { timeOut: 1000 });
      return;
    }
    this.serviceProviderService.post('m/reporter/create',this.model).subscribe(res => {
      let data:any = {};
      data = res;
      if(data.status == "S"){
        this.toastr.success('สำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 1000 });
      }else{
        this.toastr.warning(data.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
      }
    },err => {
      // this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    })
  }
}
