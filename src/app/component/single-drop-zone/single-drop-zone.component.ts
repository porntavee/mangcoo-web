import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from './../../shares/file-upload.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cdsf',
  templateUrl: './single-drop-zone.component.html',
  styleUrls: ['./single-drop-zone.component.css']
})
export class SingleDropZoneComponent implements OnInit {
  imagePdf = './../../../assets/img/267px-PDF_file_icon.svg.png';
  @Input() label;
  @Input() data: any = [];
  @Input() code = 'none';
  @Output() cModel = new EventEmitter<string>();

  constructor(private fileuploadService: FileUploadService, private toastr: ToastrService) { }

  ngOnInit(): void {

    if (this.data[0].imageUrl == '')
      this.data = [];

    this.cModel.emit(this.data);
  }

  onSelectApi(event) {
    
// debugger
if (event.addedFiles[0].type == 'application/pdf') {
      if (event.addedFiles[0].size > 100000000) {
        event.addedFiles = [];
        return this.toastr.warning('ไฟล์ต้องมีขนาดไม่เกิน 100 mb', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      }
    }else{
        let type = event.addedFiles[0].type || '';
        event.addedFiles = [];
        return this.toastr.warning('ไม่รองรับรูปแบบไฟล์ : ' + type , 'แจ้งเตือนระบบ', { timeOut: 2000 });
    }

    this.fileuploadService.postFile(this.code, event.addedFiles[0]).subscribe(data => {

      this.data[0] = data;
      if (this.data[0].imageType == 'application/pdf') {
        this.data[0].fileUrl = this.data[0].imageUrl;
        this.data[0].imageUrl = this.imagePdf;
      }

      this.cModel.emit(this.data);
    }, err => {
      console.log('error ',err);

     });
  }

  onRemoveApi(event) {
    this.data.splice(this.data.indexOf(event), 1);
    this.cModel.emit(this.data);
  }

  emit(param) {
    this.cModel.emit(param);
  }

}
