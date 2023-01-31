import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { PdfService } from 'src/app/shares/pdf.service';


@Component({
  selector: 'app-d-banner-detail',
  templateUrl: './d-banner-detail.component.html',
  styleUrls: ['./d-banner-detail.component.css']
})
export class DBannerDetailComponent implements OnInit {
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
    this.serviceProviderService.post('m/banner/main/read', { "code": this.code }).subscribe(response => {
      var data: any = response;
      this.modelDetail = data.objectData[0];

      console.log('aaa',this.modelDetail);
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
}
