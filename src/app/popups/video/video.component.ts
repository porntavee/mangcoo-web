import { Component, OnInit, Input, Output, EventEmitter, KeyValueDiffer, KeyValueDiffers, KeyValueChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';
@Component({
  selector: 'modal-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

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
      
    }else{
      this.model = {
        'code':'',
        'title': '',
        'phone': '',
        'address':''
      }
    }
    
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

}
