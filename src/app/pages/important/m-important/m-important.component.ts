import { NgxSpinnerService } from 'ngx-spinner';
import { Utilities } from './../../../shares/utilities';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ServiceProviderService } from './../../../shares/service-provider.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-m-important',
  templateUrl: './m-important.component.html',
  styleUrls: ['./m-important.component.css']
})
export class MImportantComponent implements OnInit {
  model: any = [];

  constructor(
    public serviceProviderService: ServiceProviderService,
    public dialog: MatDialog,
    private activetedRoute: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceDetectorService,
    private utilities: Utilities,
    private spinner: NgxSpinnerService,
    ) { }

  ngOnInit(): void {
    this.read();
  }

  read() {
    this.serviceProviderService.post('m/important/read', { }).subscribe(response => {
      let data: any = [];
      data = response;
      this.model = data.objectData;
      console.log('--> ',this.model);
    })
  }
  
  navToDetail(code: string = '') {
    this.router.navigate(['important-detail', code]);
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
