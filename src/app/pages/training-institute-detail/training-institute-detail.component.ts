import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PdfService } from 'src/app/shares/pdf.service';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-training-institute-detail',
  templateUrl: './training-institute-detail.component.html',
  styleUrls: ['./training-institute-detail.component.css']
})
export class TrainingInstituteDetailComponent implements OnInit {
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
    this.callReadTrainingInstitute();
    this.galleryFileRead();
  }

  callReadTrainingInstitute() {
    this.serviceProviderService.post('m/trainingInstitute/read', { "code": this.code }).subscribe(response => {
      var data: any = response;
      this.modelDetail = data.objectData[0];
      this.modelDetail.categorytitle = data.objectData[0].categoryList[0].title;
      this.modelDetail.categorytitleEN = data.objectData[0].categoryList[0].titleEN;
      window.scroll(0, 0);

    }, err => {
    });
  }

  galleryFileRead() {
    this.serviceProviderService.post('m/trainingInstitute/galleryFile/read', { code: this.code }).subscribe(data => {
      let modef: any = {};
      modef = data;
      // for (let index = 0; index < modef.objectData.length; index++) {
      //   let temp: number = 0;
      //   debugger
      //   if(modef.objectData[index].size != '')
      //   {
      //     temp = parseInt(modef.objectData[index].size);

      //   }

      // }

      this.modelFile = modef.objectData.filter(f => f.type == "pdf");
      this.modelExcel = modef.objectData.filter(f => f.type == "excel");
      this.modelVdo = modef.objectData.filter(f => f.type == "mp4");
      this.modelWord = modef.objectData.filter(f => f.type == "word");

    }, err => { });
  }

  navBack() {
    this.router.navigate(['/trainingInstitute']);
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

  fromModal(param) {
    this.modelSelected = {};

    this.showModal = false;
  }

  shareWithFB() {
    var url = this.serviceProviderService.urlweb + "trainingInstitute-detail/" + this.modelDetail.code;
    // window.open('https://lineit.line.me/share/ui?url=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url));
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url));
    return false;
  }

  shareWithLine() {
    var url = this.serviceProviderService.urlweb + "trainingInstitute-detail/" + this.modelDetail.code;
    window.open('https://lineit.line.me/share/ui?url=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url));
    // window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) +  '&t=' + encodeURIComponent(url));
    return false;
  }

  copyMessage(val: string) {
    var url = this.serviceProviderService.urlweb + "trainingInstitute-detail/" + this.modelDetail.code;
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

  openRef() {
    let url = this.modelDetail.linkUrl;
    // window.open("//" + url,'_blank');
    if (!url.match(/^https?:\/\//i)) {
      url = 'http://' + url;
    }
    window.open(url);

  }
}
