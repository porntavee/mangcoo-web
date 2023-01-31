import { sequence } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { interval, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { FacebookService } from 'src/app/shares/facebook.service';
import { GoogleFirebaseService } from 'src/app/shares/google-firebase.service';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'app-d-t1-footer',
  templateUrl: './d-t1-footer.component.html',
  styleUrls: ['./d-t1-footer.component.css']
})
export class DT1FooterComponent implements OnInit {
  @Input() cartNumber: number = 0;
  isMousePrice = false;
  aboutUs: any = {};
  modelRelateAgency: any = [];
  modelRelateAgencyItems: any = [];
  mouseOvered: boolean = false;
  mouseOvered1: number = 999;
  mouseOvered2: boolean = false;
  mouseOvered3: boolean = false;
  mouseOvered4: boolean = false;
  mouseOvered5: boolean = false;
  mouseOvered6: boolean = false;
  mouseOvered7: boolean = false;
  mouseOvered8: number = 999;
  modelUni: any = [
    { title: 'ม.เกษตรศาสตร์', link: '' },
    { title: 'ม.จุฬาลงกรณ์', link: '' },
    { title: 'ม.ขอนแก่น', link: '' },
    { title: 'ม.มหิดล', link: '' },
    { title: 'ม.เชียงใหม่', link: '' },
    { title: 'ม.เทคโนโลยีมหานคร', link: '' },
    { title: 'ม.เทคโนโลยีราชมงคลตะวันออก', link: '' },
    { title: 'ม.มหาสารคาม', link: '' },
    { title: 'ม.เทคโนโลยีราชมงคลศรีวิชัย', link: '' },
    { title: 'ม.เวสเทิร์น', link: '' },
    { title: 'ม.สงขลานครินทร์', link: '' },
    { title: 'ม.วลัยลักษณ์', link: '' },
  ]
  countNU = '0';
  countU = '0';
  countYear = '0';
  countMonth = '0';
  countWeek = '0';
  countDay = '0';
  pageLoaded: moment.Moment;
  dateNow: Observable<string>;

  constructor(
    private router: Router,
    private utilities: Utilities,
    public googleFirebaseService: GoogleFirebaseService,
    public facebookService: FacebookService,
    public serviceProviderService: ServiceProviderService,
  ) { }

  ngOnInit(): void {
    this.pageLoaded = moment(new Date());
    this.pageLoaded.locale('th')
    this.dateNow = interval(1000).pipe(
      map(() => this.pageLoaded.format('dddd MMMM Do YYYY, H:mm:ss')),
      distinctUntilChanged()
    );
    this.callRead();
    // this.callReadRelateAgency();
    // this.callReadCount();
  }

  siteMap() {
    this.router.navigate(['site-map']);
  }

  callRead() {
    this.serviceProviderService.post('aboutUs/read', { center: "" }).subscribe(data => {
      debugger
      let model: any = {};
      model = data;
      this.aboutUs = model.objectData[0];
      // console.log('AAAAAA', this.aboutUs);

    }, err => {
      console.log(' err Shop --> ', err);
    });
  }

  callReadRelateAgency() {
    this.serviceProviderService.post('m/relateAgency/read', { center: "" }).subscribe(data => {
      let model: any = {};
      model = data;
      this.modelRelateAgency = model.objectData.sort();

    }, err => {
      console.log(' err Shop --> ', err);
    });
  }

  callReadCount() {
    this.serviceProviderService.getUrlServer('ip/readCount').subscribe(data => {
      let model: any = {};
      model = data;
      if (model.status == "S") {
        this.countNU = model.objectData?.countNU || "0";
        this.countU = model.objectData?.countU || "0";
        this.countYear = model.objectData?.countYear || "0";
        this.countMonth = model.objectData?.countMonth || "0";
        this.countWeek = model.objectData?.countWeek || "0";
        this.countDay = model.objectData?.countDay || "0";
      }
    }, err => {
      console.log(' err Shop --> ', err);
    });
  }

  openFacebook() {
    window.open('https://www.facebook.com/profile.php?id=100050175092653', "_blank");
  }



  chkMousePriceIn() {
    this.isMousePrice = true;
  }

  chkMousePriceOut() {
    this.isMousePrice = false;
  }

}
