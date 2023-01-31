import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'app-m-profile',
  templateUrl: './m-profile.component.html',
  styleUrls: ['./m-profile.component.css']
})
export class MProfileComponent implements OnInit {
  code:string = '';
  userData:any = {};
  menuActive = 'profile';
  model: any = {};
  gender: string = '-';
  dayList: any;
  monthList: any;
  yearList: any;
  daySelected: string = 'วันที่';
  monthSelected: string = 'เดือน';
  yearSelected: string = 'ปี';
  isOpenedDay: boolean = false;
  isOpenedMonth: boolean = false;
  isOpenedYear: boolean = false;
  isOpenedSetting:boolean = false;


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
  constructor(
    private router: Router,
    private eRef: ElementRef,
    private utilities: Utilities,
    private serviceProviderService: ServiceProviderService,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.dayList = Array.from({ length: 31 }, (_, i) => i + 1); // [...Array(31).keys()];
    this.monthList = Array.from({ length: 12 }, (_, i) => i + 1);
    this.yearList = Array.from({ length: 100 }, (_, i) => i + 1921); // [...Array(31).keys()];
    this.code = this.utilities.getUserLocalStorage().profileCode;
    this.userData = this.utilities.getUserLocalStorage();
    this.callRead();
  }

  callRead() {
    this.serviceProviderService.post('m/Register/read', {'code':this.code}).subscribe(response => {
      var data: any = response;

      this.model = data.objectData[0];
      console.log(this.model);
      if (this.model.birthDay != null) {
        this.daySelected = this.model.birthDay.substring(7, 8) //"19930106"
        this.monthSelected = this.model.birthDay.substring(5, 6) //"19930106"
        this.yearSelected = this.model.birthDay.substring(0, 4) //"19930106"
      }
    }, err => {
      this.toastr.warning(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    });
  }

  update() {
    this.model.birthDay = this.yearSelected + '0' + this.monthSelected + '0' + this.daySelected;
    this.serviceProviderService.post('m/v2/Register/update', this.model).subscribe(response => {
      var data: any = response;
      console.log(data);

      this.model = data.objectData;
      console.log(this.model);
      this.toastr.success('สำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 1000 });
      this.callRead();
    }, err => {
      this.toastr.warning(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
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

  setGender(gender: String) {
    this.model.sex = gender;
  }
  navTo(param) {
    switch (param) {
      case 'cart':
        this.router.navigate(['m/cart']);
        break;
      case 'contactHelp':
        this.router.navigate(['m/']);
        break;
      case 'register':
        this.router.navigate(['register']);
        break;
      default:
        this.router.navigate(['m']);
        break;
    }
  }

  logout() {
    this.isOpenedSetting = false;
    localStorage.clear();
    this.userData.profileCode = '';
    this.router.navigate(['']);
  }

}
