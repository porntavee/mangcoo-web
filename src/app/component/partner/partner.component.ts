import { Component, Input, OnInit } from '@angular/core';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {
  model: any = [];
  @Input() mainPage: boolean = false;
  @Input() newsPage: boolean = false;
  @Input() eventPage: boolean = false;
  @Input() imageEventPage: boolean = false;
  @Input() knowledgePage: boolean = false;
  @Input() lawPage: boolean = false;
  @Input() personnelPage: boolean = false;
  @Input() contactPage: boolean = false;
  @Input() importantPage: boolean = false;
  @Input() knowledgeVetPage: boolean = false;
  @Input() vetEnewsPage: boolean = false;
  @Input() expertBranchPage: boolean = false;
  @Input() trainingInstitutePage: boolean = false;
  @Input() verifyAproveUserPage: boolean = false;


  constructor(
    public serviceProviderService: ServiceProviderService,
  ) {
    // this.callRead();
  }

  ngOnInit(): void {
    // this.cModel.emit(this.data);
    this.callRead();
  }

  callRead() {
    let criteria = {
      mainPage: this.mainPage,
      newsPage: this.newsPage,
      eventPage: this.eventPage,
      imageEventPage: this.imageEventPage,
      knowledgePage: this.knowledgePage,
      lawPage: this.lawPage,
      personnelPage: this.personnelPage,
      contactPage: this.contactPage,
      importantPage: this.importantPage,
      knowledgeVetPage:this.knowledgeVetPage,
      vetEnewsPage: this.vetEnewsPage,
      expertBranchPage: this.expertBranchPage,
      trainingInstitutePages: this.trainingInstitutePage,
      verifyAproveUserPage: this.verifyAproveUserPage,
      page: 'web'
    }
    this.serviceProviderService.post('m/partner/read', criteria).subscribe(response => {
      var data: any = response;
      this.model = data.objectData || [];
      // window.scroll(0,0);

    }, err => {
    });
  }

  setWH(param) {
    if (param == 's')
      return "35%";
    else if (param == 'm')
      return "60%";
    else if (param == 'l')
      return "100%";
  }
}
