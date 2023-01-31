import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { PdfService } from 'src/app/shares/pdf.service';


@Component({
  selector: 'app-m-knowledge-vet-detail',
  templateUrl: './m-knowledge-vet-detail.component.html',
  styleUrls: ['./m-knowledge-vet-detail.component.css']
})
export class MKnowledgeVetDetailComponent implements OnInit {
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
    this.serviceProviderService.post('m/knowledgeVet/read', { "code": this.code }).subscribe(response => {
      var data: any = response;
      this.modelDetail = data.objectData[0];
      this.modelDetail.categorytitle = data.objectData[0].categoryList[0].title;
      window.scroll(0, 0);

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
  openRef() {
    let url = this.modelDetail.linkUrl;
    // window.open("//" + url,'_blank');
    if (!url.match(/^https?:\/\//i)) {
      url = 'http://' + url;
    }
    window.open(url);
  }

  shareWithFB() {
    var url = this.serviceProviderService.urlweb + "knowledge-vet-detail/" + this.modelDetail.code;
    // window.open('https://lineit.line.me/share/ui?url=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url));
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url));
    return false;
  }

  shareWithLine() {
    var url = this.serviceProviderService.urlweb + "knowledge-vet-detail/" + this.modelDetail.code;
    window.open('https://lineit.line.me/share/ui?url=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url));
    // window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) +  '&t=' + encodeURIComponent(url));
    return false;
  }

  copyMessage(val: string) {
    var url = this.serviceProviderService.urlweb + "knowledge-vet-detail/" + this.modelDetail.code;
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
