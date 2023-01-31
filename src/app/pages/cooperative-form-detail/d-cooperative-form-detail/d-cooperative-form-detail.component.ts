import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { PdfService } from 'src/app/shares/pdf.service';

@Component({
  selector: 'app-d-cooperative-form-detail',
  templateUrl: './d-cooperative-form-detail.component.html',
  styleUrls: ['./d-cooperative-form-detail.component.css']
})
export class DCooperativeFormDetailComponent implements OnInit {
  code: string = '';
  model: any = [];
  modelDetail: any = {};
  categorySelected: any;

  constructor(
    private router: Router,
    private serviceProviderService: ServiceProviderService,
    private activatedRoute: ActivatedRoute,
    private pdfService: PdfService

  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let model: any = this.activatedRoute.snapshot.params;
      this.code = model.code;
    });
    this.categorySelected = '';
    this.callRead();
  }

  callRead() {
    this.serviceProviderService.post('m/cooperativeForm/read', { "code": this.code }).subscribe(response => {
      var data: any = response;
      this.modelDetail = data.objectData[0];
      this.modelDetail.categorytitle = data.objectData[0].categoryList[0].title;
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
