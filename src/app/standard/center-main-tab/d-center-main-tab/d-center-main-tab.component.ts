import { EventEmitter, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-d-center-main-tab',
  templateUrl: './d-center-main-tab.component.html',
  styleUrls: ['./d-center-main-tab.component.css']
})
export class DCenterMainTabComponent implements OnInit {
  @Input() messageInput: any = [];
  watchModelDiffer: KeyValueDiffer<string, any>;
  hiddenGallary: boolean = true;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  modelFile: any = [];
  modelVdo: any = [];
  modelExcel: any = [];
  modelWord: any = [];
  showCategory: boolean = false;

  constructor(
    public serviceProviderService: ServiceProviderService,
    private differs: KeyValueDiffers,
  ) { }

  model: any = {};
  categorySelected: any = {};
  listGroup = [];

  group(param) {
    var groups = param.reduce((acc, item) => {
      acc[item.code] = (acc[item.code] || []);
      acc[item.code].push(item);
      return acc;
    }, {});

    var result = Object.keys(groups).map(function (key) {
      return { code: groups[key][0]['code'], model: groups[key] };
    });

    return result;
  }

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
  };

  callRead() {
    this.serviceProviderService.post('center/content/read', { "reference": this.messageInput.code }).subscribe(res => {
      let model: any = [];
      model = res;
      // this.modelList = model.objectData;
      this.listGroup = this.group(model.objectData);
      this.categorySelected = this.listGroup[0];
      this.model = this.categorySelected.model[0];
      this.messageInput.subTitle = this.messageInput.subTitle ? this.messageInput.subTitle : this.messageInput.title;
      this.galleryRead();
      this.galleryFileRead();

    }, err => {
      console.log(' err Shop --> ', err);
    })
  }

  galleryRead() {
    this.serviceProviderService.post('center/menu/gallery/read', { code: this.model.code }).subscribe(data => {
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
    this.serviceProviderService.post('center/menu/galleryFile/read', { code: this.model.code }).subscribe(data => {
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

  selectedCategory(param) {
    this.categorySelected = this.listGroup.find(o => o.code == param);
    this.model = this.categorySelected.model[0];
    this.galleryRead();
    this.galleryFileRead();
  }

  getTitle(param) {
    if (this.serviceProviderService.lang == 'th')
      return this.listGroup.find(c => c.code == param).model[0].title;
    if (this.serviceProviderService.lang == 'en')
      return this.listGroup.find(c => c.code == param).model[0].titleEN;
  }

  showHamburger(param) {
    switch (param) {
      case 'category':
        this.showCategory = !this.showCategory;
        break;

      default:
        this.showCategory = false;
        break;
    }
  }

  ngDoCheck(): void {

    const changes = this.watchModelDiffer.diff(this.messageInput);
    if (changes) {
      this.callRead();
    }
  }

}
