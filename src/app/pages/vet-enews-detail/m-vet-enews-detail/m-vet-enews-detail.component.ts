import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { PdfService } from 'src/app/shares/pdf.service';


@Component({
  selector: 'app-m-vet-enews-detail',
  templateUrl: './m-vet-enews-detail.component.html',
  styleUrls: ['./m-vet-enews-detail.component.css']
})
export class MVetEnewsDetailComponent implements OnInit {
  code: string = '';
  model: any = [];
  modelDetail: any = {};
  categorySelected: any;

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
  }

  callReadKnowledge() {
    this.serviceProviderService.post('m/vetEnews/read', { "code": this.code }).subscribe(response => {
      var data: any = response;
      this.modelDetail = data.objectData[0];
      this.modelDetail.categorytitle = data.objectData[0].categoryList[0].title;
      this.modelDetail.categorytitleEN = data.objectData[0].categoryList[0].titleEN;
      window.scroll(0,0);

    }, err => {
    });
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

  shareWithFB() {
    var url = this.serviceProviderService.urlweb + "vet-enews-detail/"+ this.modelDetail.code;
    // window.open('https://lineit.line.me/share/ui?url=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url));
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) +  '&t=' + encodeURIComponent(url));
    return false;
  }

  shareWithLine() {
    var url = this.serviceProviderService.urlweb + "vet-enews-detail/"+ this.modelDetail.code;
    window.open('https://lineit.line.me/share/ui?url=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url));
    // window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) +  '&t=' + encodeURIComponent(url));
    return false;
  }

  copyMessage(val: string){
    var url = this.serviceProviderService.urlweb + "vet-enews-detail/"+ this.modelDetail.code;
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
