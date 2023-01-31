import { EventEmitter, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-d-center-contact',
  templateUrl: './d-center-contact.component.html',
  styleUrls: ['./d-center-contact.component.css']
})
export class DCenterContactComponent implements OnInit {
  @Input() messageInput: any = [];
  watchModelDiffer: KeyValueDiffer<string, any>;
  hiddenGallary: boolean = true;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  modelFile: any = [];
  modelVdo: any = [];
  modelExcel: any = [];
  modelWord: any = [];

  constructor(
    public serviceProviderService: ServiceProviderService,
    private differs: KeyValueDiffers,
    private toastr: ToastrService,
  ) { }

  model: any = [];
  modelDetail: any = {};

  ngOnInit(): void {
    this.watchModelDiffer = this.differs.find(this.messageInput).create();
  }

  callRead() {
    this.serviceProviderService.post('center/content/read', { "reference": this.messageInput.code }).subscribe(res => {
      let model: any = [];
      model = res;
      this.model = model.objectData[0];
      this.messageInput.subTitle = this.messageInput.subTitle ? this.messageInput.subTitle : this.messageInput.title;
    }, err => {
      console.log(' err Shop --> ', err);
    })
  }



  create() {
    if (this.modelDetail.name == '' || this.modelDetail.name == undefined) {
      this.toastr.warning('กรุณากรอก ชื่อ-สกุล', 'แจ้งเตือนระบบ', { timeOut: 1000 });
      return;
    }
    if (this.modelDetail.email == '' || this.modelDetail.email == undefined) {
      this.toastr.warning('กรุณากรอก E-mail', 'แจ้งเตือนระบบ', { timeOut: 1000 });
      return;
    }
    if (this.modelDetail.title == '' || this.modelDetail.title == undefined) {
      this.toastr.warning('กรุณากรอก หัวข้อ', 'แจ้งเตือนระบบ', { timeOut: 1000 });
      return;
    }
    if (this.modelDetail.description == '' || this.modelDetail.description == undefined) {
      this.toastr.warning('กรุณากรอก ข้อความ', 'แจ้งเตือนระบบ', { timeOut: 1000 });
      return;
    }
    this.modelDetail.reference = this.messageInput.reference || '';
    this.modelDetail.emailCenter = this.model.email || '';
    this.serviceProviderService.post('center/centerContact/create', this.modelDetail).subscribe(res => {
      let data: any = {};
      data = res;
      let tempData = data.objectData;
      this.serviceProviderService.post('center/sendmail', tempData).subscribe(resData => {
        let model: any = {};
        model = resData;
        if (model.status == "S") {
          this.toastr.success(model.message, 'แจ้งเตือนระบบ', { timeOut: 1500 });
          this.modelDetail = {};
        } else {
          this.toastr.warning(model.message, 'แจ้งเตือนระบบ', { timeOut: 1500 });
        }
      }, err => {
        // this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
      })

    }, err => {
      // this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    })
  }

  ngDoCheck(): void {

    const changes = this.watchModelDiffer.diff(this.messageInput);
    if (changes) {
      // console.log('helloooooooo');
      this.callRead();
    }
  }

}
