import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceProviderService } from './service-provider.service';
declare var FB: any;

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor(
    private router: Router,
    private serviceProviderService: ServiceProviderService,
  ) {
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '1028829847522996',
        cookie: true,
        xfbml: true,
        version: 'v11.0'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
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
    // FB.login();
    FB.login((response) => {
      if (response.authResponse) {
        // this.toastr.successToastr('login successful', 'Success!');

        console.log(response.authResponse);
        let obj = response.authResponse;
        this.serviceProviderService.getUrl("https://graph.facebook.com/v2.12/me?fields=name,first_name,last_name, birthday,email&access_token=" + obj.accessToken).subscribe(data => {
          let model = {
            token: obj.accessToken,
            userId: data['id'],
            username: data["email"],
            first_name: data["first_name"],
            last_name: data["last_name"],
            imageUrl: 'https://graph.facebook.com/' + data['id'] + '/picture?type=large&width=720&height=720',
            email: data["email"],
            type: "facebook",
          };
          this.serviceProviderService.post('w/login/login', model).subscribe(data => {
            model["profileCode"] = data["objectData"].code;
            this.setLocalStorage(model);
            this.router.navigate(['']);
          }, err => {
          });
        }, err => {
        });
        //this.serviceProviderService.post('m/goods/read',{obj});
      }
      else {
        // this.toastr.successToastr('User login failed', 'Success!');
      }
    });
  }


  signOut() {
    FB.signOut();
  }

}
