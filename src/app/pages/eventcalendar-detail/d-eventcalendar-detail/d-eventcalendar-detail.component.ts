import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-d-eventcalendar-detail',
  templateUrl: './d-eventcalendar-detail.component.html',
  styleUrls: ['./d-eventcalendar-detail.component.css']
})
export class DEventCalendarDetailComponent implements OnInit {
  modelEventCalendar: any = [];
  modelAllEventCalendar: any = [];
  modelEventCalendarGallery: any = [];
  code: any = '';
  model: any = [];
  modelFile: any = [];
  modelVdo: any = [];
  modelExcel: any = [];
  modelWord: any = [];
  hiddenGallary: boolean = true;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  showModal: boolean = false;
  modelSelected: any = {};

  constructor(
    public serviceProviderService: ServiceProviderService,
    private activetedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {
    let query: any = this.activetedRoute.snapshot.params;
    this.code = query.code;
    // this.activetedRoute.queryParams.subscribe(params => {
    //   // let model: any = this.activetedRoute.snapshot.params;
    //   this.code = params.code;
    // });
  }

  ngOnInit(): void {
    this.readEventCalendar();
    this.readEventCalendarGallery();
    this.galleryRead();
    this.galleryFileRead();
    window.scroll(0, 0);

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
        previewCloseOnClick:true,
        previewCloseOnEsc:true

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

  readEventCalendar() {
    this.spinner.show()
    this.serviceProviderService.post('m/eventCalendar/read', { code: this.code }).subscribe(response => {
      let data: any = [];
      data = response;
      this.modelEventCalendar = data.objectData[0];
      this.spinner.hide();
      this.readAllEventCalendar(this.model.category);
      this.readEventCalendarGallery();
    }, err => {

      this.spinner.hide();
    });
  }

  readAllEventCalendar(param) {
    this.serviceProviderService.post('m/eventCalendar/read', { category: param }).subscribe(data => {
      let res: any = [];
      res = data;
      this.modelAllEventCalendar = res.objectData;
      console.log('this.modelAllEventCalendar --> ', this.modelEventCalendar);
    })
  }

  readEventCalendarGallery() {
    this.serviceProviderService.post('m/eventCalendar/gallery/read', { code: this.code }).subscribe(data => {
      let modelEventCalendarGallery: any = [];
      modelEventCalendarGallery = data;
      this.modelEventCalendarGallery = modelEventCalendarGallery.objectData;
      console.log("this.modelEventCalendarGallery", this.modelEventCalendarGallery);
    }, err => { });
  }

  galleryRead() {
    this.serviceProviderService.post('m/eventCalendar/gallery/read', { code: this.code }).subscribe(data => {
      let model: any = {};
      this.model.gallery = [];
      model = data;
      console.log("model", model);
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
        this.galleryImages = this.model.gallery;
      }
      else {
        this.galleryImages = [];
      }
    }, err => {
    });
  }

  galleryFileRead() {
    this.serviceProviderService.post('m/eventCalendar/galleryFile/read', { code: this.code }).subscribe(data => {
      let modef: any = {};
      modef = data;
      this.modelFile = modef.objectData.filter(f => f.type == "pdf");
      this.modelExcel = modef.objectData.filter(f => f.type == "excel");
      this.modelVdo = modef.objectData.filter(f => f.type == "mp4");
      this.modelWord = modef.objectData.filter(f => f.type == "word");

    }, err => { });
  }

  navToDetail(code: string = '') {
    this.code = code;
    this.readEventCalendar()
    window.scroll(0, 0)
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


  openRef() {
    let url = this.modelEventCalendar.linkUrl;
    // window.open("//" + url,'_blank');
    if (!url.match(/^https?:\/\//i)) {
      url = 'http://' + url;
    }
    window.open(url);
    this.windowOpen(url);
  }
  windowOpen(url) {
    if (!url.match(/^https?:\/\//i)) {
        url = 'http://' + url;
    }
    window.open(url);
}

  shareWithFB() {
    var url = this.serviceProviderService.urlweb + "eventcalendar-detail/" + this.modelEventCalendar.code;
    // window.open('https://lineit.line.me/share/ui?url=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url));
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url));
    return false;
  }

  shareWithLine() {
    var url = this.serviceProviderService.urlweb + "eventcalendar-detail/" + this.modelEventCalendar.code;
    window.open('https://lineit.line.me/share/ui?url=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url));
    // window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) +  '&t=' + encodeURIComponent(url));
    return false;
  }

  copyMessage(val: string) {
    var url = this.serviceProviderService.urlweb + "eventcalendar-detail/" + this.modelEventCalendar.code;
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

  convertToPlain(html) {
    // Create a new div element
    var tempDivElement = document.createElement("div");
    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;
    // Retrieve the text property of the element 
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }
}


