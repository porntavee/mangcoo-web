import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-m-image-event-detail',
  templateUrl: './m-image-event-detail.component.html',
  styleUrls: ['./m-image-event-detail.component.css']
})
export class MImageEventDetailComponent implements OnInit {
  code: string = '';
  model: any = {};
  modelOther: any = [];
  modelEventCalendarGallery: any = [];
  hiddenGallary: boolean = true;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

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
    window.scroll(0, 0)
    this.read();
    this.galleryRead();

    this.galleryOptions = [
      {
        image: false,
        width: '100%',
        height: '300px',
        thumbnailsColumns: 4,
        thumbnailsMoveSize: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageSize: "contain",
        previewFullscreen: true, previewForceFullscreen: false,
        thumbnailSize: NgxGalleryImageSize.Cover,
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
    this.serviceProviderService.post('imageEvent/read', { code: this.code }).subscribe(response => {
      let data: any = [];
      data = response;
      this.model = data.objectData[0];
      this.spinner.hide();
      // this.readOther(this.model.category);
    }, err => {

      this.spinner.hide();
    });

  }

  // readOther(param) {
  //   this.serviceProviderService.post('m/news/read', { category: param }).subscribe(response => {
  //     let data: any = [];
  //     data = response;
  //     this.modelOther = data.objectData;
  //   });
  // }

  navToDetail(code: string = '') {
    this.code = code;
    this.read()
    window.scroll(0, 0)
  }

  openRef() {
    let url = this.model.linkUrl;
    // window.open("//" + url,'_blank');
    if (!url.match(/^https?:\/\//i)) {
      url = 'http://' + url;
    }
    window.open(url);
  }

  convertToPlain(html) {

    // Create a new div element
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    // Retrieve the text property of the element 
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }

  galleryRead() {
    this.serviceProviderService.post('m/imageEvent/gallery/read', { code: this.code }).subscribe(data => {
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
        this.galleryImages = this.model.gallery;
      }
      else {
        this.galleryImages = [];
      }
    }, err => {
    });
  }

  downloadPDF() {
    let link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.model.fileUrl);
    link.setAttribute('download', this.model.fileUrl);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  shareWithFB() {
    var url = this.serviceProviderService.urlweb + "image-event-detail/" + this.model.code;
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url));
    return false;
  }

  shareWithLine() {
    var url = this.serviceProviderService.urlweb + "image-event-detail/" + this.model.code;
    window.open('https://lineit.line.me/share/ui?url=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url));
    return false;
  }

  copyMessage(val: string) {
    var url = this.serviceProviderService.urlweb + "image-event-detail/" + this.model.code;
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
}
