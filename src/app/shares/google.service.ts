import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceProviderService } from './service-provider.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  auth2: any;
  @ViewChild('loginRef', { static: true }) loginElement: ElementRef;
  constructor(
    private router: Router,
    private serviceProviderService: ServiceProviderService,
  ) {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '844740746751-bnpah9u2c7usjamokknau4koqrkqdsts.apps.googleusercontent.com',
          cookie_policy: 'single_host_origin',
          scope: 'profile email'
        });
      });
    }
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }


  setLocalStorage(param) {
    localStorage.setItem('token', param.token);
    localStorage.setItem('profileCode', param.profileCode);
    localStorage.setItem('userId', param.userId);
    localStorage.setItem('username', param.username);
    localStorage.setItem('first_name', param.first_name);
    localStorage.setItem('last_name', param.last_name);
    localStorage.setItem('email', param.email);
    localStorage.setItem('type', param.type);
    localStorage.setItem('imageUrl', param.imageUrl);
  }

  signIn() {
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        let model = {
          token: googleUser.getAuthResponse().id_token,
          userId: profile.getId(),
          username: profile.getEmail(),
          first_name: profile.getGivenName(),
          last_name: profile.getFamilyName(),
          imageUrl: profile.getImageUrl(),
          email: profile.getEmail(),
          type: 'google',
        };
        this.setLocalStorage(model);
        this.serviceProviderService.post('w/login/login', model).subscribe(data => {
          model["profileCode"] = data["objectData"].code;
          this.setLocalStorage(model);
          this.router.navigate(['']);

        }, err => {
        });
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }


  signOut() {
    this.auth2.signOut();
  }
}
