import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ServiceProviderService } from './shares/service-provider.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecom-web';
  deviceInfo = null;
  device:string = '';

  constructor(
    private deviceService: DeviceDetectorService, 
    private router: Router, 
    private serviceProviderService: ServiceProviderService,
    ) { 
    this.epicFunction();
  }

  ngOnInit(): void {
  }

  epicFunction() {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.

      // this.router.navigate(['m']);
    //   if (isMobile)
    // {
    //   this.device = 'm';
    //   this.router.navigate(['m']);
    // }
    // else if (isTablet)
    // {
    //   this.device = 'm';
    //   this.router.navigate(['m']);
    // }
  }

}
