import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'app-d-register',
  templateUrl: './d-register.component.html',
  styleUrls: ['./d-register.component.css']
})
export class DRegisterComponent implements OnInit {
  model: any = { workType: '' } // workType is mandatory, please not remove it.
  submitted = false;
  registerForm: FormGroup;
  options: any = ["นาย", "นาง", "นางสาว"];
  provinces: any = [];
  districts: any = [];
  careerList: any = ['บริษัท', 'รับราชการ', 'คลินิก/โรงพยาบาลสัตว์', 'เจ้าของฟาร์มเลี้ยงสัตว์', 'อาจารย์', 'อื่นๆ'];
  subDistricts: any = [];
  dayList: any = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  dayIssueList: any = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  dayExpiryList: any = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  monthList: any = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  yearList: any = [];
  workTypeSelected: string = '';
  chkupdate: boolean = false;
  universityList: any = [
    // 'มหาวิทยาลัยจุฬาลงกรณ์',
    // 'มหาวิทยาลัยเกษตรศาสตร์',
    // 'มหาวิทยาลัยขอนแก่น',
    // 'มหาวิทยาลัยเชียงใหม่',
    // 'มหาวิทยาลัยมหิดล',
    // 'มหาวิทยาลัยมหานคร',
    // 'มหาวิทยาลัยเทคโนโลยีราชมงคลตะวันออก ',
    // 'มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย',
    // 'มหาวิทยาลัยมหาสารคาม',
    'จุฬา',
    'เกษตร',
    'ขอนแก่น',
    'เชียงใหม',
    'มหิดล',
    'มหานคร',
    'มทร.ตะวันออก',
    'มทร.ศรีวิชัย',
    'สารคาม',
    'สงขลานครินทร์',
    'วลัยลักษณ์',
    'เวสเทิร์น',
    'แม่โจ้',
    'อื่น ๆ',
  ]
  isRead: boolean = false;
  isEdit: boolean = false;
  showInputEducation: boolean = false;
  showInputSecondaryEducation: boolean = false;
  showPreview: boolean = false;
  imageFile: string = '';

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$';

  selectedQuantity = "10";
  code = "";
  workType1: boolean = false;
  workType2: boolean = false;
  workType3: boolean = false;
  workType4: boolean = false;
  workType5: boolean = false;
  workType6: boolean = false;
  workType5Description: string = '';
  workType6Description: string = '';
  path = "";


  constructor(private router: Router,
    public serviceProviderService: ServiceProviderService,
    private utilities: Utilities,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private el: ElementRef,
  ) {
    // let query: any = this.activatedRoute.snapshot.params;
    // if (query.code != undefined) {
    //   this.code = query.code;
    // }

    let params: any = this.activatedRoute.snapshot.queryParams;

    if (params.code != undefined) {
      this.code = params.code;
    }

    if (params.type != undefined) {
      if (params.type == "1")
        this.isRead = true
      else if (params.type == "2")
        this.isEdit = true
    }

    this.registerForm = this.formBuilder.group({
      email: [''], //, Validators.pattern(this.emailPattern)
      password: ['', Validators.required],
      idcard: ['', Validators.required],
      lineID: [''],
      position: [''],
      prefixName: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      firstNameEN: [''],
      lastNameEN: [''],
      oldPosition: [''],
      oldPrefixName: [''],
      oldFirstName: [''],
      oldLastName: [''],
      oldFirstNameEN: [''],
      oldLastNameEN: [''],
      dayOfBirth: [''],
      monthOfBirth: [''],
      yearOfBirth: [''],
      age: [''],
      nationality: [''],
      race: [''],
      religion: [''],
      phone: [''],
      telephone: [''],
      soi: [''],
      address: [''],
      address2: [''],
      moo: [''],
      road: [''],
      tambon: [''],
      amphoe: [''],
      province: [''],
      postno: [''],
      // isWorkSameHome: [''],
      workPhone: [''],
      workSoi: [''],
      workMoo: [''],
      workAddress: [''],
      workAddress2: [''],
      workRoad: [''],
      workTambon: [''],
      workAmphoe: [''],
      workProvince: [''],
      workPostno: [''],
      // workType: [''],
      // isCurrentSameHome: [''],
      // isCurrentSameWork: [''],
      currentPhone: [''],
      currentSoi: [''],
      currentMoo: [''],
      currentAddress: [''],
      currentAddress2: [''],
      currentRoad: [''],
      currentTambon: [''],
      currentAmphoe: [''],
      currentProvince: [''],
      currentPostno: [''],
      education: [''],
      educationDegree: [''],
      educationYear: [''],
      secondaryEducation: [''],
      secondaryEducationYear: [''],
      note: [''],
      dayOfIssue: [''],
      monthOfIssue: [''],
      yearOfIssue: [''],
      dayOfExpiry: [''],
      monthOfExpiry: [''],
      yearOfExpiry: [''],
      licenseNumber: ['']
    });
  }


  ngOnInit(): void {
    this.path = window.location.origin + '/';
    this.callProvince();
    this.setDateInit();
    this.serviceProviderService.SendIPAddress("Register");
    if (this.code != "")
      this.callRead();

  }

  callRead() {
    this.serviceProviderService.post('m/veterinary2/read', { code: this.code }).subscribe(response => {
      var data: any = response;
      this.showPreview = false;

      if (data.status == "S") {
        var obj = data.objectData;
        this.model.code = obj.code;
        this.model.workType = obj.workType;
        this.model.workTypeDescription = obj.workTypeDescription;
        if (this.model.workType == '1') this.workType1 = true;
        if (this.model.workType == '2') this.workType2 = true;
        if (this.model.workType == '3') this.workType3 = true;
        if (this.model.workType == '4') this.workType4 = true;
        if (this.model.workType == '5') this.workType5 = true
        if (this.model.workType == '6') this.workType6 = true;

        this.model.isWorkSameHome = obj.isWorkSameHome,
          this.model.isCurrentSameHome = obj.isCurrentSameHome,
          this.model.isCurrentSameWork = obj.isCurrentSameWork,
          this.registerForm.patchValue({
            email: [obj.email],
            password: [obj.password],
            idcard: [obj.idcard],
            lineID: [obj.lineID],
            position: [obj.position],
            prefixName: [obj.prefixName],
            firstName: [obj.firstName],
            lastName: [obj.lastName],
            firstNameEN: [obj.firstNameEN],
            lastNameEN: [obj.lastNameEN],
            oldPosition: [obj.oldPosition],
            oldPrefixName: [obj.oldPrefixName],
            oldFirstName: [obj.oldFirstName],
            oldLastName: [obj.oldLastName],
            oldFirstNameEN: [obj.oldFirstNameEN],
            oldLastNameEN: [obj.oldLastNameEN],
            yearOfBirth: obj.birthDay != '' ? obj.birthDay.substring(0, 4).toString() : '',
            monthOfBirth: obj.birthDay != '' ? obj.birthDay.substring(4, 6).toString() : '',
            dayOfBirth: obj.birthDay != '' ? obj.birthDay.substring(6, 8).toString() : '',
            age: [obj.age],
            nationality: [obj.nationality],
            race: [obj.race],
            religion: [obj.religion],
            phone: obj.phone != '' ? obj.phone : '',
            telephone: obj.telephone != '' ? obj.telephone.charAt(0) != '0' ? '0' + obj.telephone : obj.telephone : '',
            soi: [obj.soi],
            address: [obj.address],
            address2: [obj.address2],
            moo: [obj.moo],
            road: [obj.road],
            tambon: [obj.tambon],
            amphoe: [obj.amphoe],
            province: [obj.province],
            postno: obj.postno,
            // isWorkSameHome: [obj.isWorkSameHome], 
            workPhone: obj.workPhone != '' ? obj.workPhone : '',
            workSoi: [obj.workSoi],
            workMoo: [obj.workMoo],
            workAddress: [obj.workAddress],
            workAddress2: [obj.workAddress2],
            workRoad: [obj.workRoad],
            workTambon: [obj.workTambon],
            workAmphoe: [obj.workAmphoe],
            workProvince: [obj.workProvince],
            workPostno: obj.workPostno,
            // workType: [obj.workType],
            // isCurrentSameHome: [obj.isCurrentSameHome],
            // isCurrentSameWork: [obj.isCurrentSameWork],
            currentPhone: obj.currentPhone == '' ? obj.currentPhone : '',
            currentSoi: [obj.currentSoi],
            currentMoo: [obj.currentMoo],
            currentAddress: [obj.currentAddress],
            currentAddress2: [obj.currentAddress2],
            currentRoad: [obj.currentRoad],
            currentTambon: [obj.currentTambon],
            currentAmphoe: [obj.currentAmphoe],
            currentProvince: [obj.currentProvince],
            currentPostno: obj.currentPostno,
            education: [obj.education],
            educationDegree: [obj.educationDegree],
            educationYear: obj.educationYear,
            secondaryEducation: [obj.secondaryEducation],
            secondaryEducationYear: obj.secondaryEducationYear,
            note: [obj.note],
            licenseNumber: obj.licenseNumber,
            yearOfIssue: obj.dateStart != '' ? obj.dateStart.substring(0, 4).toString() : '',
            monthOfIssue: obj.dateStart != '' ? obj.dateStart.substring(4, 6).toString() : '',
            dayOfIssue: obj.dateStart != '' ? obj.dateStart.substring(6, 8).toString() : '',
            yearOfExpiry: obj.dateEnd != '' ? obj.dateEnd.substring(0, 4).toString() : '',
            monthOfExpiry: obj.dateEnd != '' ? obj.dateEnd.substring(4, 6).toString() : '',
            datOfExpiry: obj.dateEnd != '' ? obj.dateEnd.substring(6, 8).toString() : '',
          });
        this.chkupdate = true;
        // this.setModel()
      }
      else {
        this.chkupdate = false;
      }
    }, err => {
      this.toastr.warning(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    });
  }

  setDateInit() {
    var currentYear = new Date().getFullYear();
    for (let i = 1900; i <= currentYear; i++) {
      this.yearList.push(i.toString());
    }
  }

  checkDay() {
    var currentYear = new Date().getFullYear();
    let month = parseInt(this.registerForm.controls['monthOfBirth'].value);
    let year = parseInt(this.registerForm.controls['yearOfBirth'].value);
    let result = this.utilities.getDaysInMonthUTC(month - 1, year)
    if (result.length > 0) {
      this.dayList = [];
      for (let i = 1; i <= result.length; i++) {
        if (i < 10) {
          this.dayList.push('0' + i.toString())
        } else {
          this.dayList.push(i.toString())
        }
      }
    }
    this.registerForm.patchValue({
      age: currentYear - year,
    });
    if (result.length > 0)
      if (parseInt(this.registerForm.controls['dayOfBirth'].value) > result.length && this.registerForm.controls['dayOfBirth'].value != '') {
        this.registerForm.patchValue({
          dayOfBirth: result.length.toString(),
        });
      }
  }

  checkDayIssue() {
    var currentYear = new Date().getFullYear();
    let month = parseInt(this.registerForm.controls['monthOfIssue'].value);
    let year = parseInt(this.registerForm.controls['yearOfIssue'].value);
    let result = this.utilities.getDaysInMonthUTC(month - 1, year)
    if (result.length > 0) {
      this.dayIssueList = [];
      for (let i = 1; i <= result.length; i++) {
        if (i < 10) {
          this.dayIssueList.push('0' + i.toString())
        } else {
          this.dayIssueList.push(i.toString())
        }
      }
    }
    if (result.length > 0)
      if (parseInt(this.registerForm.controls['dayOfIssue'].value) > result.length && this.registerForm.controls['dayOfIssue'].value != '') {
        this.registerForm.patchValue({
          dayOfIssue: result.length.toString(),
        });
      }
  }

  checkDayExpiry() {
    var currentYear = new Date().getFullYear();
    let month = parseInt(this.registerForm.controls['monthOfExpiry'].value);
    let year = parseInt(this.registerForm.controls['monthOfExpiry'].value);
    let result = this.utilities.getDaysInMonthUTC(month - 1, year)
    if (result.length > 0) {
      this.dayExpiryList = [];
      for (let i = 1; i <= result.length; i++) {
        if (i < 10) {
          this.dayExpiryList.push('0' + i.toString())
        } else {
          this.dayExpiryList.push(i.toString())
        }
      }
    }
    if (result.length > 0)
      if (parseInt(this.registerForm.controls['dayOfExpiry'].value) > result.length && this.registerForm.controls['dayOfExpiry'].value != '') {
        this.registerForm.patchValue({
          dayOfExpiry: result.length.toString(),
        });
      }
  }

  checkWorkType(event, type: number) {
    this.workType5Description = '';
    this.workType6Description = '';
    this.workType1 = false;
    this.workType2 = false;
    this.workType3 = false;
    this.workType4 = false;
    this.workType5 = false;
    this.workType6 = false;
    if (type == 1) { this.workType1 = event.target.value; this.model.workType = '1'; this.model.workTypeDescription = 'บริษัท' }
    if (type == 2) { this.workType2 = event.target.value; this.model.workType = '2'; this.model.workTypeDescription = 'รับราชการ' }
    if (type == 3) { this.workType3 = event.target.value; this.model.workType = '3'; this.model.workTypeDescription = 'คลินิก/โรงพยาบาลสัตว์' }
    if (type == 4) { this.workType4 = event.target.value; this.model.workType = '4'; this.model.workTypeDescription = 'เจ้าของฟาร์มเลี้ยงสัตว์' }
    if (type == 5) { this.workType5 = event.target.value; this.model.workType = '5'; this.model.workTypeDescription = this.workType5Description }
    if (type == 6) { this.workType6 = event.target.value; this.model.workType = '6'; this.model.workTypeDescription = this.workType6Description }


  }

  get f() { return this.registerForm.controls; }

  clickTest() {
    console.log('test');
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  async create() {
    let nameSplit = this.model.name.split(' ');

    let firstName = nameSplit[0];
    let lastName = nameSplit[1] != null || nameSplit[1] != '' ? nameSplit[1] : '';
    if (nameSplit.length > 2) {
      nameSplit.forEach((e, index) => {
        if (index > 1) lastName += ' ' + e;
      });
    }

    this.serviceProviderService.post('m/Register/create', {
      'username': this.model.email,
      'password': this.model.password,
      'facebookID': "",
      'appleID': "",
      'googleID': "",
      'lineID': this.model.lineID,
      'email': this.model.email,
      'imageUrl': "",
      'category': "guest",
      'prefixName': this.model.prefixName,
      'firstName': this.model.firstName,
      'lastName': this.model.lastName,
      'phone': this.model.email,
      'birthDay': this.model.birthDay,
      'status': "N",
      'platform': 'web',
      'countUnit': "[]"
    }).subscribe(response => {
      var data: any = response;
      this.router.navigate(['login']);

    }, err => {
    });
  }

  callProvince() {
    this.serviceProviderService.post('route/province/read', {}).subscribe(response => {
      var data: any = response;
      this.provinces = data.objectData;
    }, err => {
      this.toastr.warning(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    });
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.registerForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  async validate() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      for (const key of Object.keys(this.registerForm.controls)) {
        if (this.registerForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
      return;
    }

    // if (this.model.workType.trim() == '' || this.model.workType == null) {
    //   this.toastr.warning('กรุณาเลือกประเภทหน่วยงาน', 'แจ้งเตือนระบบ', { timeOut: 1000 });
    //   return;
    // }

    if (this.code == '') {
      this.model.workType = this.model.workTypeDescription;
    }

    await this.setModel();
  }

  fromModal(param) {
    if (param) {
      this.save();
    } else {
      this.showPreview = false;
    }
  }

  async save() {
    var api = this.code == '' || this.code == undefined ? 'm/Veterinary2/create' : 'm/Veterinary2/update';
    this.serviceProviderService.post(api, this.model).subscribe(response => {
      var data: any = response;
      if (data.status == 'E') {
        this.toastr.warning(data.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
      }
      else if (this.chkupdate == true) {
        this.toastr.success('สำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 1000 });
        this.router.navigate(['']);
      }
      else {
        // this.router.navigate(['login']);
        this.router.navigate(['/address-sheet'], { queryParams: { code: data.objectData.code } });
      }
    }, err => {
      this.toastr.warning(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    });
  }

  setAddress($event, type) {
    switch (type) {
      case 'workSamehome':
        this.model.isCurrentSameHome = $event;
        this.model.isCurrentSameWork = false;
        break;
      case 'currentSameHome':
        this.model.isCurrentSameHome = $event;
        this.model.isCurrentSameWork = false;
        break;
      case 'currentSameWork':
        this.model.isCurrentSameWork = $event;
        this.model.isCurrentSameHome = false;
        break;
      default:
        break;
    }

    if (this.model.isWorkSameHome) {
      this.registerForm.patchValue({
        workPhone: this.registerForm.controls['phone'].value,
        workSoi: this.registerForm.controls['soi'].value,
        workMoo: this.registerForm.controls['moo'].value,
        workAddress: this.registerForm.controls['address'].value,
        workAddress2: this.registerForm.controls['address2'].value,
        workRoad: this.registerForm.controls['road'].value,
        workTambon: this.registerForm.controls['tambon'].value,
        workAmphoe: this.registerForm.controls['amphoe'].value,
        workProvince: this.registerForm.controls['province'].value,
        workPostno: this.registerForm.controls['postno'].value,
      });
    }
    if (this.model.isCurrentSameHome) {
      this.registerForm.patchValue({
        currentPhone: this.registerForm.controls['phone'].value,
        currentSoi: this.registerForm.controls['soi'].value,
        currentMoo: this.registerForm.controls['moo'].value,
        currentAddress: this.registerForm.controls['address'].value,
        currentAddress2: this.registerForm.controls['address2'].value,
        currentRoad: this.registerForm.controls['road'].value,
        currentTambon: this.registerForm.controls['tambon'].value,
        currentAmphoe: this.registerForm.controls['amphoe'].value,
        currentProvince: this.registerForm.controls['province'].value,
        currentPostno: this.registerForm.controls['postno'].value,
      });

    }
    if (this.model.isCurrentSameWork) {
      this.registerForm.patchValue({
        currentPhone: this.registerForm.controls['workPhone'].value,
        currentSoi: this.registerForm.controls['workSoi'].value,
        currentMoo: this.registerForm.controls['workMoo'].value,
        currentAddress: this.registerForm.controls['workAddress'].value,
        currentAddress2: this.registerForm.controls['workAddress2'].value,
        currentRoad: this.registerForm.controls['workRoad'].value,
        currentTambon: this.registerForm.controls['workTambon'].value,
        currentAmphoe: this.registerForm.controls['workAmphoe'].value,
        currentProvince: this.registerForm.controls['workProvince'].value,
        currentPostno: this.registerForm.controls['workPostno'].value,
      });
    }
  }

  checkEducation() {
    if (this.registerForm.controls['education'].value.toString() == 'อื่น ๆ') {
      this.showInputEducation = true;
      this.registerForm.patchValue({
        education: '',
      })
    } else this.showInputEducation = false
  }
  checkSecondaryEducation() {
    if (this.registerForm.controls['secondaryEducation'].value.toString() == 'อื่น ๆ') {
      this.showInputSecondaryEducation = true
      this.registerForm.patchValue({
        secondaryEducation: '',
      })
    } else this.showInputSecondaryEducation = false
  }

  setModel() {
    this.model.username = this.registerForm.controls['idcard'].value.toString()
    this.model.email = this.registerForm.controls['email'].value.toString()
    this.model.password = this.registerForm.controls['password'].value.toString()
    this.model.idcard = this.registerForm.controls['idcard'].value.toString()
    this.model.lineID = this.registerForm.controls['lineID'].value.toString()
    this.model.position = this.registerForm.controls['position'].value.toString()
    this.model.prefixName = this.registerForm.controls['prefixName'].value.toString()
    this.model.firstName = this.registerForm.controls['firstName'].value.toString()
    this.model.lastName = this.registerForm.controls['lastName'].value.toString()
    this.model.firstNameEN = this.registerForm.controls['firstNameEN'].value.toString()
    this.model.lastNameEN = this.registerForm.controls['lastNameEN'].value.toString()
    this.model.oldPosition = this.registerForm.controls['oldPosition'].value.toString()
    this.model.oldPrefixName = this.registerForm.controls['oldPrefixName'].value.toString()
    this.model.oldFirstName = this.registerForm.controls['oldFirstName'].value.toString()
    this.model.oldLastName = this.registerForm.controls['oldLastName'].value.toString()
    this.model.oldFirstNameEN = this.registerForm.controls['oldFirstNameEN'].value.toString()
    this.model.oldLastNameEN = this.registerForm.controls['oldLastNameEN'].value.toString()
    this.model.birthDay = this.registerForm.controls['yearOfBirth'].value.toString() + this.registerForm.controls['monthOfBirth'].value.toString() + this.registerForm.controls['dayOfBirth'].value.toString()
    this.model.age = this.registerForm.controls['age'].value.toString()
    this.model.nationality = this.registerForm.controls['nationality'].value.toString()
    this.model.race = this.registerForm.controls['race'].value.toString()
    this.model.religion = this.registerForm.controls['religion'].value.toString()
    this.model.phone = this.registerForm.controls['phone'].value.toString()
    this.model.telephone = this.registerForm.controls['telephone'].value.toString()
    this.model.soi = this.registerForm.controls['soi'].value.toString()
    this.model.address = this.registerForm.controls['address'].value.toString()
    this.model.address2 = this.registerForm.controls['address2'].value.toString()
    this.model.moo = this.registerForm.controls['moo'].value.toString()
    this.model.road = this.registerForm.controls['road'].value.toString()
    this.model.tambon = this.registerForm.controls['tambon'].value.toString();
    this.model.amphoe = this.registerForm.controls['amphoe'].value.toString();
    this.model.province = this.registerForm.controls['province'].value.toString();
    this.model.postno = this.registerForm.controls['postno'].value.toString()
    // this.model.isWorkSameHome = this.registerForm.controls['isWorkSameHome'].value;
    this.model.workPhone = this.registerForm.controls['workPhone'].value.toString()
    this.model.workSoi = this.registerForm.controls['workSoi'].value.toString()
    this.model.workMoo = this.registerForm.controls['workMoo'].value.toString()
    this.model.workAddress = this.registerForm.controls['workAddress'].value.toString()
    this.model.workAddress2 = this.registerForm.controls['workAddress2'].value.toString()
    this.model.workRoad = this.registerForm.controls['workRoad'].value.toString()
    this.model.workTambon = this.registerForm.controls['workTambon'].value.toString();
    this.model.workAmphoe = this.registerForm.controls['workAmphoe'].value.toString();
    this.model.workProvince = this.registerForm.controls['workProvince'].value.toString();
    this.model.workPostno = this.registerForm.controls['workPostno'].value.toString()
    // this.model.workType = this.registerForm.controls['workType'].value;
    // this.model.isCurrentSameHome = this.registerForm.controls['isCurrentSameHome'].value;
    // this.model.isCurrentSameWork = this.registerForm.controls['isCurrentSameWork'].value;
    this.model.currentPhone = this.registerForm.controls['currentPhone'].value.toString()
    this.model.currentSoi = this.registerForm.controls['currentSoi'].value.toString()
    this.model.currentMoo = this.registerForm.controls['currentMoo'].value.toString()
    this.model.currentAddress = this.registerForm.controls['currentAddress'].value.toString()
    this.model.currentAddress2 = this.registerForm.controls['currentAddress2'].value.toString()
    this.model.currentRoad = this.registerForm.controls['currentRoad'].value.toString()
    this.model.currentTambon = this.registerForm.controls['currentTambon'].value.toString();
    this.model.currentAmphoe = this.registerForm.controls['currentAmphoe'].value.toString();
    this.model.currentProvince = this.registerForm.controls['currentProvince'].value.toString();
    this.model.currentPostno = this.registerForm.controls['currentPostno'].value.toString()
    this.model.education = this.registerForm.controls['education'].value.toString();
    this.model.educationDegree = this.registerForm.controls['educationDegree'].value.toString()
    this.model.educationYear = this.registerForm.controls['educationYear'].value.toString()
    this.model.secondaryEducation = this.registerForm.controls['secondaryEducation'].value.toString()
    this.model.secondaryEducationYear = this.registerForm.controls['secondaryEducationYear'].value.toString()
    this.model.note = this.registerForm.controls['note'].value.toString()
    this.model.licenseNumber = this.registerForm.controls['licenseNumber'].value.toString()
    this.model.dateStart = this.registerForm.controls['yearOfIssue'].value.toString() + this.registerForm.controls['monthOfIssue'].value.toString() + this.registerForm.controls['dayOfBirth'].value.toString()
    this.model.dateEnd = this.registerForm.controls['yearOfExpiry'].value.toString() + this.registerForm.controls['monthOfExpiry'].value.toString() + this.registerForm.controls['dayOfExpiry'].value.toString()
    this.model.type = "0";

    if (this.isRead)
      this.model.type = "1";
    else if (this.isEdit)
      this.model.type = "2";
    // if (this.workType1) { this.model.workType = 'บริษัท' }
    // if (this.workType2) { this.model.workType = 'รับราชการ' }
    // if (this.workType3) { this.model.workType = 'คลินิก/โรงพยาบาลสัตว์' }
    // if (this.workType4) { this.model.workType = 'เจ้าของฟาร์มเลี้ยงสัตว์' }
    // if (this.workType5) { this.model.workType = this.workType5Description }
    // if (this.workType6) { this.model.workType = this.workType6Description }
    if (this.workType5Description != '')
      this.model.workTypeDescription = this.workType5Description;
    else if (this.workType6Description != '') {
      this.model.workTypeDescription = this.workType6Description;
    }

    this.model.phone = this.model.phone != '' ? this.model.phone.charAt(0) == '0' ? this.model.phone : '0' + this.model.phone : '';
    this.model.telephone = this.model.phone != '' ? this.model.telephone.charAt(0) == '0' ? this.model.telephone : '0' + this.model.telephone : '';
    this.model.workPhone = this.model.phone != '' ? this.model.workPhone.charAt(0) == '0' ? this.model.workPhone : '0' + this.model.workPhone : '';
    this.model.currentPhone = this.model.phone != '' ? this.model.currentPhone.charAt(0) == '0' ? this.model.currentPhone : '0' + this.model.currentPhone : '';

    // this.testData()

    if (this.model.file != undefined) {
      if (this.model.file.length > 0)
        this.model.fileUrl = this.model.file[0].fileUrl;
      else
        this.model.fileUrl = '';
    }
    if (this.code == '' || this.code == undefined) {
      this.showPreview = true;
    } else {
      this.save();
    }
  }
  checkColorback(istype) {
    if (istype)
      return "#F2F2F2";
    else
      return "#FFFFFF";
  }

  checkColor(type) {
    if (type)
      return "#1B6CA8";
    else
      return "#707070";
  }
}
