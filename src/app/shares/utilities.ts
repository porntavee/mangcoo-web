
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
    providedIn: 'root'
})
export class Utilities {
    deviceInfo = null;
    constructor(
        private http: HttpClient,
        private router: Router,
        private deviceService: DeviceDetectorService,
    ) { }

    curDevice() {
        // this.deviceInfo = this.deviceService.getDeviceInfo();
        // const isMobile = this.deviceService.isMobile();
        // const isTablet = this.deviceService.isTablet();
        // const isDesktopDevice = this.deviceService.isDesktop();
        // if (isMobile) {
        //     return 'm/'
        // }
        // else if (isTablet) {
        //     return 'm/'
        // }

        return '';
    }

    navTo(param) {
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
            case 'confirm-order':
                this.router.navigate(['confirm-order']);
                break;
            case 'confirm-order':
                this.router.navigate(['confirm-order']);
                break;

            default:
                this.router.navigate(['']);
                break;
        }
    }

    cf(param) {
        return new Intl.NumberFormat('en-US', {
            // style: 'currency',
            // currency: 'THB',
        }).format(param);
    }

    getUserLocalStorage() {
        const token = localStorage.getItem('token');
        const profileCode = localStorage.getItem('profileCode');
        const userId = localStorage.getItem('userId');
        const username = localStorage.getItem('username');
        const first_name = localStorage.getItem('first_name');
        const last_name = localStorage.getItem('last_name');
        const email = localStorage.getItem('email');
        const type = localStorage.getItem('type');
        const imageUrl = localStorage.getItem('imageUrl');
        const isShop = localStorage.getItem('isShop');
        const referenceShopCode = localStorage.getItem('referenceShopCode');
        const referenceShopName = localStorage.getItem('referenceShopName');
        return {
            'token': token,
            'profileCode': profileCode,
            'userId': userId,
            'username': username,
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'type': type,
            'imageUrl': imageUrl,
            'isShop': isShop,
            'referenceShopCode': referenceShopCode,
            'referenceShopName': referenceShopName,
        }
    }

    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    logLocal() {
        return console.log('local data ---> ', this.getUserLocalStorage());
    }
    
    getDaysInMonthUTC(month, year) {
        var date = new Date(Date.UTC(year, month, 1));
        var days = [];
        while (date.getUTCMonth() === month) {
          days.push(new Date(date));
          date.setUTCDate(date.getUTCDate() + 1);
        }
        return days;
      }
}

