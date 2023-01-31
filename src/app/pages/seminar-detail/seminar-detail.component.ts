import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-seminar-detail',
  templateUrl: './seminar-detail.component.html',
  styleUrls: ['./seminar-detail.component.css']
})
export class SeminarDetailComponent implements OnInit {
  code: string = '';
  model: any = {};
  modelFile: any = [];
  modelVdo: any = [];
  modelExcel: any = [];
  modelOther: any = [];
  modelWord: any = [];
  modelEventCalendarGallery: any = [];
  hiddenGallary: boolean = true;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  isPdf: boolean = false;
  isMp4: boolean = false;
  showModal: boolean = false;
  modelSelected: any = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public serviceProviderService: ServiceProviderService,
    private spinner: NgxSpinnerService,
  ) {
    let query: any = this.activatedRoute.snapshot.params;
    this.code = query.code;
  }

  ngOnInit(): void {
    // window.scroll(0, 0)
    this.read();
    this.galleryRead();
    this.galleryFileRead();
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
  }

  read() {
    this.spinner.show()
    this.serviceProviderService.post('m/seminar/read', { code: this.code }).subscribe(response => {
      let data: any = [];
      data = response;
      this.model = data.objectData[0];
      this.spinner.hide();
      // if(this.model.fileUrl != "")
      // {
      //   let resultArray = this.model.fileUrl.split('.');
      //   let type = resultArray[resultArray.length - 1];
      //   this.isMp4 = type == "mp4" ? true : false;
      //   this.isPdf = type == "pdf" ? true : false;
      // }

      this.readOther(this.model.category);
    }, err => {

      this.spinner.hide();
    });

  }

  galleryFileRead() {
    this.serviceProviderService.post('m/seminar/galleryFile/read', { code: this.code }).subscribe(data => {
      let modef: any = {};
      modef = data;
      this.modelFile = modef.objectData.filter(f => f.type == "pdf");
      this.modelExcel = modef.objectData.filter(f => f.type == "excel");
      this.modelVdo = modef.objectData.filter(f => f.type == "mp4");
      this.modelWord = modef.objectData.filter(f => f.type == "word");

    }, err => { });
  }

  readOther(param) {
    this.serviceProviderService.post('m/seminar/read', { category: param }).subscribe(response => {
      let data: any = [];
      data = response;
      this.modelOther = data.objectData;
    });
  }

  galleryRead() {
    this.serviceProviderService.post('m/seminar/gallery/read', { code: this.code }).subscribe(data => {
      let model: any = {};
      this.model.gallery = [];
      model = data;
      // console.log("model", model);
      if (model.objectData.length > 0) {
        this.hiddenGallary = false
        model.objectData.forEach(c => {
          this.model.gallery.push({
            // ...c,
            small: c.imageUrl,
            medium: c.imageUrl,
            big: c.imageUrl,
          })
        });
        // this.model.gallery = [{
        //   small: this.model.imageUrl,
        //   medium: this.model.imageUrl,
        //   big: this.model.imageUrl,
        // }
        //   , ...this.model.gallery];
        console.log("gallery", this.model.gallery);
        this.galleryImages = this.model.gallery || [];
      }
      else {
        this.galleryImages = [];
      }
    }, err => {
    });
  }

  navToDetail(code: string = '') {
    this.code = code;
    this.read()
    window.scroll(0, 0)
  }

  convertToPlain(html) {

    // Create a new div element
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    // Retrieve the text property of the element 
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }

  openRef() {
    let url = this.model.linkUrl;
    if (!url.match(/^https?:\/\//i)) {
      url = 'http://' + url;
    }
    window.open(url, '_blank');
    // window.open("//" + url, '_blank');
  }

  shareWithFB() {
    var url = this.serviceProviderService.urlweb + "seminar-detail/" + this.model.code;
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url));
    return false;
  }

  shareWithLine() {
    var url = this.serviceProviderService.urlweb + "seminar-detail/" + this.model.code;
    window.open('https://lineit.line.me/share/ui?url=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url));
    return false;
  }

  copyMessage(val: string) {
    var url = this.serviceProviderService.urlweb + "seminar-detail/" + this.model.code;
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = url;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
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

  openModal(param) {
    this.modelSelected = { fileUrl: param };
    this.showModal = true;
  }

  fromModal(param) {
    this.modelSelected = {};

    this.showModal = false;
  }
}
