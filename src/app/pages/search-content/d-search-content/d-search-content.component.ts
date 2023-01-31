import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-d-search-content',
  templateUrl: './d-search-content.component.html',
  styleUrls: ['./d-search-content.component.css']
})
export class DSearchContentComponent implements OnInit {
  model: any = [];
  content: any = [];
  tempModel: any = [];
  keyword: string = '';
  total: number = 0;
  totalcontent: number = 0;
  totalmodel: number = 0;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public serviceProviderService: ServiceProviderService,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.keyword = params.code;
    });
    this.read();
  }


  ngOnInit(): void {
    // if (this.keyword != '' && this.keyword != null) {
    //   this.model = this.tempModel.filter(c => c.fname == this.keyword || c.lname == this.keyword);
    // }
    // else {
    //   this.model = this.tempModel;
    // }
    // this.total = this.model.length;
    this.read();
  }

  read() {
    this.serviceProviderService.post('contentKeyword/readContentKeyword', { keyword: this.keyword }).subscribe(response => {
      let data: any = [];
      data = response;
      this.content = data.objectData["content"];
      this.model = data.objectData["keyword"];
      this.totalcontent = this.content.length;
      this.totalmodel = this.model.length;
      this.total = this.totalcontent + this.totalmodel;
    })
  }

  nav(params) {
    switch (params.cpCode) {
      case "news":
        this.router.navigate(['news-detail', params.code]);
        break;
      case "knowledge":
        this.router.navigate(['knowledge-detail', params.code]);
      case "knowledge-vet":
        this.router.navigate(['knowledge-vet-detail', params.code]);
        break;
      case "important":
        this.router.navigate(['important-detail', params.code]);
        break;
      case "eventCalendar":
        this.router.navigate(['eventcalendar-detail', params.code]);
        break;
      case "imageEvent":
        this.router.navigate(['image-event-detail', params.code]);
        break;
      case "vetEnews":
        this.router.navigate(['vet-enews-detail', params.code]);
        break;
      case 'seminar':
        this.router.navigate(['seminar-detail'], params.code);
        break;
      default:
        break;
    }
  }

}
