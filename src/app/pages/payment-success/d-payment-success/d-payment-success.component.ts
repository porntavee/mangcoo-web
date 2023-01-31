import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { SignalRService } from 'src/app/shares/signal-r.service';


@Component({
  selector: 'app-d-payment-success',
  templateUrl: './d-payment-success.component.html',
  styleUrls: ['./d-payment-success.component.css']
})
export class DPaymentSuccessComponent implements OnInit {

  constructor(private router: Router, private serviceProviderService: ServiceProviderService, public signalRService: SignalRService) { }

  ngOnInit(): void {
    // this.signalRService.startConnection();
    // this.signalRService.addTransferChartDataListener();   
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
      case 'mypurchase':
        this.router.navigate(['mypurchase']);
        break;
      case 'main':
        this.router.navigate(['']);
        break;

      default:
        break;
    }
  }
}
