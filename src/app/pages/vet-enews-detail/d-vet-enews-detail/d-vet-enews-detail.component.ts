import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { PdfService } from 'src/app/shares/pdf.service';


@Component({
  selector: 'app-d-vet-enews-detail',
  templateUrl: './d-vet-enews-detail.component.html',
  styleUrls: ['./d-vet-enews-detail.component.css']
})
export class DVetEnewsDetailComponent implements OnInit {
  code: string = '';
  model: any = [];
  modelFile: any = [];
  modelVdo: any = [];
  modelExcel: any = [];
  modelWord: any = [];
  modelDetail: any = {};
  categorySelected: any;

  showModal: boolean = false;
  modelSelected: any = {};

  constructor(
    private router: Router,
    public serviceProviderService: ServiceProviderService,
    private activatedRoute: ActivatedRoute,
    private pdfService: PdfService

  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let model: any = this.activatedRoute.snapshot.params;
      this.code = model.code;
    });
    this.categorySelected = '';
    this.callReadKnowledge();
    this.galleryFileRead();
  }

  callReadKnowledge() {
    this.serviceProviderService.post('m/vetEnews/read', { "code": this.code }).subscribe(response => {
      var data: any = response;
      this.modelDetail = data.objectData[0];
      this.modelDetail.categorytitle = data.objectData[0].categoryList[0].title;
      this.modelDetail.categorytitleEN = data.objectData[0].categoryList[0].titleEN;
      window.scroll(0, 0);

    }, err => {
    });
  }

  galleryFileRead() {
    this.serviceProviderService.post('m/vetEnews/galleryFile/read', { code: this.code }).subscribe(data => {
      let modef: any = {};
      modef = data;
      this.modelFile = modef.objectData.filter(f => f.type == "pdf");
      this.modelExcel = modef.objectData.filter(f => f.type == "excel");
      this.modelVdo = modef.objectData.filter(f => f.type == "mp4");
      this.modelWord = modef.objectData.filter(f => f.type == "word");

    }, err => { });
  }

  downloadPDF1() {
    let link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.modelDetail.fileUrl);
    link.setAttribute('download', this.modelDetail.fileUrl);
    document.body.appendChild(link);
    link.click();
    link.remove();
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

  openRef() {
    let url = this.modelDetail.linkUrl;
    if (!url.match(/^https?:\/\//i)) {
      url = 'http://' + url;
    }
    window.open(url, '_blank');
    // window.open("//" + url, '_blank');
  }

  fromModal(param) {
    this.modelSelected = {};

    this.showModal = false;
  }

  shareWithFB() {
    var url = this.serviceProviderService.urlweb + "vet-enews-detail/" + this.modelDetail.code;
    // window.open('https://lineit.line.me/share/ui?url=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url));
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url));
    return false;
  }

  shareWithLine() {
    var url = this.serviceProviderService.urlweb + "vet-enews-detail/" + this.modelDetail.code;
    window.open('https://lineit.line.me/share/ui?url=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url));
    // window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) +  '&t=' + encodeURIComponent(url));
    return false;
  }

  convertToPlain(html) {
    // Create a new div element
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    // Retrieve the text property of the element 
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }

  copyMessage(val: string) {
    var url = this.serviceProviderService.urlweb + "vet-enews-detail/" + this.modelDetail.code;
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
