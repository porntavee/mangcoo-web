import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  selector: 'app-main-dialog',
  templateUrl: './main-dialog.component.html',
  styleUrls: ['./main-dialog.component.css']
})
export class MainDialogComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private deviceService: DeviceDetectorService,) { }
    isShowDialog = false;

  ngOnInit(): void {
    setInterval(() => {
      if (this.data[0].index == (this.data.length - 1))
        this.data[0].index = 0;
      else
        this.data[0].index = this.data[0].index + 1
    }, 5000);

    const isMobile = this.deviceService.isMobile();
    if (isMobile) {
      this.isShowDialog = false;
    }
    else {
      this.isShowDialog = true;
    }
  }

}
