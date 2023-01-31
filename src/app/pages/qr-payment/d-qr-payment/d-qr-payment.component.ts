import { Subscription, interval } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { ToastrService } from 'ngx-toastr';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { SignalRService } from 'src/app/shares/signal-r.service';
import { Utilities } from 'src/app/shares/utilities';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-d-qr-payment',
  templateUrl: './d-qr-payment.component.html',
  styleUrls: ['./d-qr-payment.component.css']
})
export class DQrPaymentComponent implements OnInit {
  code: string = '';
  codes: string = '';
  codeArray: any = [];
  orderNoData: any = {};
  addressCode: string = '';
  addressObj: any = {};
  name: string = 'QR Payment';
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  model: any = {};
  check: boolean = false;
  userData: any = {};


  respMethod: string = '';
  respTransaction: string = '';
  respNumber: string = '';
  respCheck: string = '';
  respAmount: string = '';
  respCurrency: string = '';
  respIssuing: string = '';
  respStatus: string = '';
  respMessage: string = '';
  respReference: string = '';
  respURL: string = '';
  subscription: Subscription;


  constructor
    (
      private serviceProviderService: ServiceProviderService,
      public dialog: MatDialog,
      private activetedRoute: ActivatedRoute,
      private utilities: Utilities,
      private router: Router,
      private signalRService: SignalRService,
      private toastr: ToastrService,
      private spinner: NgxSpinnerService,
  ) {
    this.activetedRoute.queryParams.subscribe(params => {
      this.code = params.code;
    });

    if (this.utilities.getUserLocalStorage().profileCode != '' && this.utilities.getUserLocalStorage().profileCode != null) {
      this.userData = this.utilities.getUserLocalStorage();
    } else {
      this.router.navigate(['login']);
    }
  }
  ngOnInit(): void {
    if (this.utilities.getUserLocalStorage().profileCode != '' && this.utilities.getUserLocalStorage().profileCode != null) {
      this.userData = this.utilities.getUserLocalStorage();
    } else {
      this.goTo('login');
    }
    this.spinner.show();
    //emit value in sequence every 10 second
    const source = interval(5000);
    const text = 'Your Text Here';
    this.subscription = source.subscribe(val => this.callRead());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  callRead() {
    this.serviceProviderService.post('paymentlog/read', { 'code': this.code, 'profileCode': this.userData.profileCode }).subscribe(response => {
      var data: any = response;
      this.model = data.objectData;
      debugger
      this.spinner.hide();
      if (data.objectData.respStatus == '2') {
        this.subscription.unsubscribe();
        this.callUpdateStatus();
      }
    }, err => {
      this.spinner.hide();
    });
  }

  callUpdateStatus() {
    this.serviceProviderService.post('m/cart/update/status', { code: this.code, 'status': 'W' }).subscribe(response => {
      var data: any = response;
      this.addressObj = data.objectData[0];
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  backClicked() {
    this.router.navigate(['']);
  }

  goTo(param) {
    switch (param) {
      case 'notification':
        this.router.navigate(['notification']);
        break;
      case 'contactHelp':
        this.router.navigate(['']);
        break;
      case 'register':
        this.router.navigate(['register']);
        break;
      case 'login':
        this.router.navigate(['login']);
        break;
      case 'profile':
        this.router.navigate(['profile']);
        break;
      case 'confirm-order':
        this.router.navigate(['confirm-order']);
        break;

      default:
        break;
    }
  }

}
