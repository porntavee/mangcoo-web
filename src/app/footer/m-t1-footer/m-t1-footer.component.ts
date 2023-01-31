import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService } from 'src/app/shares/facebook.service';
import { GoogleFirebaseService } from 'src/app/shares/google-firebase.service';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'app-m-t1-footer',
  templateUrl: './m-t1-footer.component.html',
  styleUrls: ['./m-t1-footer.component.css']
})
export class MT1FooterComponent implements OnInit {
  @Input() cartNumber: number = 0;
  isMousePrice = false;
  aboutUs: any = {};

  constructor(
    private router: Router,
    private utilities: Utilities,
    public googleFirebaseService: GoogleFirebaseService,
    public facebookService: FacebookService,
    private serviceProviderService: ServiceProviderService,
  ) { }

  ngOnInit(): void {
    this.callRead();
  }

  callRead() {
    this.serviceProviderService.post('aboutUs/read', { center: "" }).subscribe(data => {
      let model: any = {};
      model = data;
      this.aboutUs = model.objectData[0];

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
