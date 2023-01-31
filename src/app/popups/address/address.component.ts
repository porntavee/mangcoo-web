import { Component, OnInit, Input, Output, EventEmitter, KeyValueDiffer, KeyValueDiffers, KeyValueChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';
@Component({
  selector: 'modal-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  @Output() callback = new EventEmitter<any>();
  @Input() model: any = {};
  provinceSelected: any = {};
  districtSelected: any = {};
  subDistrictSelected: any = {};

  loadingCategory: boolean = false;
  hasCategorySelectedTitle: boolean = false;
  categorySelectedTitle: string = 'จังหวัด, อำเภอ/เขต, ตำบล/รหัสไปรษณีย์';

  showSelectedProvince: boolean = false;
  categorySelected: string = 'province';

  provinceList: any = [];
  districtList: any = [];
  subDistrictList: any = [];

  constructor(
    private serviceProviderService: ServiceProviderService,
    private utilities:Utilities,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    console.log('oooo',this.model);
    
    if (!this.utilities.isEmpty(this.model)) {
      this.provinceSelected.code = this.model.provinceCode ?? '';
      this.provinceSelected.title = this.model.provinceTitle ?? '';
      this.districtSelected.code = this.model.districtCode ?? '';
      this.districtSelected.title = this.model.districtTitle ?? '';
      this.subDistrictSelected.code = this.model.subDistrictCode ?? '';
      this.subDistrictSelected.title = this.model.subDistrictTitle ?? '';
      this.subDistrictSelected.postCode = this.model.postalCode ?? '';
      this.hasCategorySelectedTitle = true;
      this.categorySelectedTitle = this.provinceSelected.title + ' , ' + this.districtSelected.title + ' , ' + this.subDistrictSelected.title + ' , ' + this.subDistrictSelected.postCode;
      this.callProvince();
      this.callDistrict();
      this.callSubDistrict();
    }else{
      this.model = {
        'code':'',
        'title': '',
        'phone': '',
        'address':''
      }
    }
    
    this.callProvince();
  }

  cancel() {
    this.callback.emit(false); // false == cancel, true == confirm.
  }

  submit() {
    var path = '';
    this.model.provinceCode = this.provinceSelected.code;
    this.model.districtCode = this.districtSelected.code;
    this.model.subDistrictCode = this.subDistrictSelected.code;
    this.model.postalCode = this.subDistrictSelected.postCode;

    path = this.model.code != '' && this.model.code != null ? 'update' : 'create';
    this.serviceProviderService.post('m/manageAddress/' + path, this.model).subscribe(response => {
      var data: any = response;
      this.model = data.objectData;
      this.toastr.success('สำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 1000 });
      this.callback.emit(true);
    }, err => {
      this.toastr.warning(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    });
  }

  selectHeadCategory(type: string) {
    if (type == 'province') {
      this.categorySelected = type;
    }
    if (type == 'district' && this.provinceSelected.code != null) {
      this.categorySelected = type;
    }
    if (type == 'subDistrict' && this.districtSelected.code != null) {
      this.categorySelected = type;
    }
  }

  selectItemCategory(type: string, item: any) {
    if (type == 'province') {
      this.provinceSelected = item;
      this.categorySelected = 'district';
      this.callDistrict();
    }
    if (type == 'district') {
      this.districtSelected = item;
      this.categorySelected = 'subDistrict';
      this.callSubDistrict();
    }
    if (type == 'subDistrict') {
      this.subDistrictSelected = item;
      this.showSelectedProvince = false;
      this.categorySelected = 'province';
      this.hasCategorySelectedTitle = true;
      this.categorySelectedTitle = this.provinceSelected.title + ' , ' + this.districtSelected.title + ' , ' + this.subDistrictSelected.title + ' , ' + this.subDistrictSelected.postCode;
    }
  }

  callProvince() {
    this.serviceProviderService.post('route/province/read', {}).subscribe(response => {
      var data: any = response;
      this.provinceList = data.objectData;
    }, err => {
      this.toastr.warning(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    });
  }

  callDistrict() {
    this.serviceProviderService.post('route/district/read', { 'province': this.provinceSelected.code }).subscribe(response => {
      var data: any = response;
      this.districtList = data.objectData;
    }, err => {
      this.toastr.warning(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    });
  }

  callSubDistrict() {
    this.serviceProviderService.post('route/tambon/read', { 'province': this.provinceSelected.code, 'district': this.districtSelected.code }).subscribe(response => {
      var data: any = response;
      this.subDistrictList = data.objectData;

    }, err => {
      this.toastr.warning(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    });
  }
}
