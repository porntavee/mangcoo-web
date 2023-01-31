import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-d-address',
  templateUrl: './d-address.component.html',
  styleUrls: ['./d-address.component.css']
})
export class DAddressComponent implements OnInit {

  menuActive = 'address';
  model: any = [];
  gender: String = '-';
  dayList: any;
  monthList: any;
  yearList: any;
  daySelected: String = 'วันที่';
  monthSelected: String = 'เดือน';
  yearSelected: String = 'ปี';
  isOpenedDay: boolean = false;
  isOpenedMonth: boolean = false;
  isOpenedYear: boolean = false;

  showModal: boolean = false;
  modelSelected: any = {};

  @HostListener('document:click', ['$event'])
  click(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      // inside
    } else {
      // outside
      this.isOpenedDay = false;
      this.isOpenedMonth = false;
      this.isOpenedYear = false;
    }
  }
  constructor(private router: Router, private eRef: ElementRef, private serviceProviderService: ServiceProviderService) { }

  ngOnInit(): void {
    this.dayList = Array.from({ length: 31 }, (_, i) => i + 1); // [...Array(31).keys()];
    this.monthList = Array.from({ length: 12 }, (_, i) => i + 1);
    this.yearList = Array.from({ length: 100 }, (_, i) => i + 1921); // [...Array(31).keys()];
    this.callRead();
  }

  callRead() {
    this.serviceProviderService.post('m/manageAddress/read', { }).subscribe(response => {
      var data: any = response;
      console.log(data);

      this.model = data.objectData;
      console.log(this.model);

    }, err => {
    });
  }

  goToNotification() {
    this.menuActive = 'noti';
  }

  setShowDay() {
    this.isOpenedDay = !this.isOpenedDay;
    this.isOpenedMonth = false;
    this.isOpenedYear = false;
  }
  setShowMonth() {
    this.isOpenedDay = false;
    this.isOpenedMonth = !this.isOpenedMonth;
    this.isOpenedYear = false;
  }
  setShowYear() {
    this.isOpenedDay = false;
    this.isOpenedMonth = false;
    this.isOpenedYear = !this.isOpenedYear;
  }

  setShowModal(param) {
    this.showModal = param;
  }

  setGender(gender: String) {
    this.model.sex = gender;
  }

  fromModal(param) {
    this.modelSelected = {};
    if (param)
      this.callRead();
    
    this.showModal = false;
  }

  edit(param) {
    this.modelSelected = param;
    this.showModal = true;
  }

  delete(param) {
    this.serviceProviderService.post('m/manageAddress/delete', { "code": param }).subscribe(response => {
      var data: any = response;
      this.callRead()

    }, err => {
    });
  }

  setIsDefault(code) {
    this.serviceProviderService.post('m/manageAddress/update', { "code": code,'isDefault': true }).subscribe(response => {
      var data: any = response;
      this.callRead()
    }, err => {
    });

  }
}
