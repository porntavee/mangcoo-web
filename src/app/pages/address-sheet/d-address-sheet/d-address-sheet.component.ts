import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Router } from '@angular/router';
import { Utilities } from 'src/app/shares/utilities';



@Component({
  selector: 'app-d-address-sheet',
  templateUrl: './d-address-sheet.component.html',
  styleUrls: ['./d-address-sheet.component.css']
})
export class DAddressSheetComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public serviceProviderService: ServiceProviderService,
    private spinner: NgxSpinnerService,
    private utilities: Utilities,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params.code;
    });
  }
  temp: any = [];
  model: any = [];
  code: string = '';
  isdownload: boolean = false;

  ngOnInit(): void {
    if (this.code != '')
      this._callRead();
  }

  _callRead() {
    console.log('code :: ',this.code);
    
    this.serviceProviderService.SendIPAddress("AddressSheet");
    this.serviceProviderService.post('m/Veterinary2/read', { code: this.code }).subscribe(data => {
      this.temp = data;
      this.model = this.temp.objectData;
    }, err => {
    });
  }


  goToProfile() {
    this.router.navigate(['register',this.code]);
  }

  goToHome() {
    this.router.navigate([''], { queryParams: { code: this.code } });
  }

  downloadPDF() {
    
    // this.spinner.show();
    if (!this.isdownload) {
      this.spinner.show();
      this.isdownload = true;
      
      let json = JSON.stringify(this.model);

      // 'report/printOut'
      // 'printOut/printOut'
      this.serviceProviderService.postReport('report/printOut', this.model).subscribe(data => {
        // this.serviceProviderService.postReport('printOut/printOut', this.model).subscribe(data => {
        
        this.spinner.hide();
        let blob = new Blob([data], { type: "application/pdf" });
        let url = window.URL.createObjectURL(blob);
        let pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
          alert('Please disable your Pop-up blocker and try again.');
        }
        this.isdownload = false;
        // console.log("shopShowAllLength",this.shopShowAllLength);
      }, err => {
        debugger
        this.spinner.hide();
      });
    }
    // else
    // {

    // }
  }
}
