import { EventEmitter, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-d-center-main',
  templateUrl: './d-center-main.component.html',
  styleUrls: ['./d-center-main.component.css']
})
export class DCenterMainComponent implements OnInit {
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
  ) { }

  model: any = [];


  ngOnInit(): void {
    this.watchModelDiffer = this.differs.find(this.messageInput).create();
    this.galleryOptions = [
      {
        image: false,
        width: '100%',
        height: '300px',
        thumbnailsColumns: 4,
        thumbnailsMoveSize: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageSize: "contain",
        // previewFullscreen: true, previewForceFullscreen: false,
        thumbnailSize: NgxGalleryImageSize.Contain,
        previewCloseOnClick: true,
        previewCloseOnEsc: true

      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    this.galleryImages = []
  }

  callRead() {
    this.galleryFileRead();
    this.serviceProviderService.post('center/content/read', { "reference": this.messageInput.code }).subscribe(res => {
      let model: any = [];
      model = res;
      this.model = model.objectData[0];
      this.messageInput.subTitle = this.messageInput.subTitle? this.messageInput.subTitle : this.messageInput.title;
      this.galleryRead(this.model.reference);
    }, err => {
      console.log(' err Shop --> ', err);
    })
  }

  galleryRead(param) {
    this.serviceProviderService.post('center/menu/gallery/read', { code: param }).subscribe(data => {
      let model: any = {};
      this.model.gallery = [];
      model = data;
      if (model.objectData.length > 0) {
        this.hiddenGallary = false
        model.objectData.forEach(c => {
          this.model.gallery.push({
            small: c.imageUrl,
            medium: c.imageUrl,
            big: c.imageUrl,
          })
        });
        this.galleryImages = this.model.gallery || [];
      }
      else {
        this.galleryImages = [];
      }
    }, err => {
    });
  }

  galleryFileRead() {
    this.serviceProviderService.post('center/menu/galleryFile/read', { code: this.messageInput.code }).subscribe(data => {
      let modef: any = {};
      modef = data;

      this.modelFile = modef.objectData.filter(f => f.type == "pdf");
      this.modelExcel = modef.objectData.filter(f => f.type == "excel");
      this.modelVdo = modef.objectData.filter(f => f.type == "mp4");
      this.modelWord = modef.objectData.filter(f => f.type == "word");

    }, err => { });
  }

  downloadPDF(param) {
    let link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', param);
    link.setAttribute('download', param);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  ngDoCheck(): void {

    const changes = this.watchModelDiffer.diff(this.messageInput);
    if (changes) {
      // console.log('helloooooooo');
      this.callRead();
    }
  }

}
