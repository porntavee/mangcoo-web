import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';
import { GoogleFirebaseService } from 'src/app/shares/google-firebase.service';
import { FacebookService } from 'src/app/shares/facebook.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-d-login',
  templateUrl: './d-login.component.html',
  styleUrls: ['./d-login.component.css']
})
export class DLoginComponent implements OnInit {
  model: any = {};
  username: string = '';
  password: string = '';
  userData: any = {};
  @ViewChild('loginRef', { static: true }) loginElement: ElementRef;

  constructor(
    private router: Router,
    public serviceProviderService: ServiceProviderService,
    private utilities: Utilities,
    private ref: ChangeDetectorRef,
    public afAuth: AngularFireAuth,
    public googleFirebaseService: GoogleFirebaseService,
    public facebookService: FacebookService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    if (this.utilities.getUserLocalStorage().profileCode != '' && this.utilities.getUserLocalStorage().profileCode != null) {
      this.userData = this.utilities.getUserLocalStorage();
    }
  }

  callRead() {
    this.serviceProviderService.post('m/v2/register/login', {}).subscribe(data => {
      var model = data;
    }, err => {
    });
  }

  clickTest() {
    console.log('test');
  }

  goToLogin(nav : string) {
    switch (nav) {
      case 'login-e-learning':
        this.router.navigate(['login-e-learning']);
        break;
      default:
        this.router.navigate(['']);
        break;
    }
  }

  goToRegister() {
    // this.router.navigate(['register'])
    window.open('http://209.15.98.88/vet_member/register.member.php', '_blank');
  }

  goToAdmin() {
    window.open('http://209.15.98.88/vet_member/admin/login.php', "_blank");
  }

  openVetcouncill() {
    window.open('http://www.vetcouncil.or.th/', "");
  }

  goToMainIns() {
    window.open('http://209.15.98.88/vet_member/index.php?b=login', "_blank");
  }

  goToCMS() {
    var url = this.serviceProviderService.urlcms;
    window.open(url);
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
    localStorage.setItem('isShop', param.isShop);
    localStorage.setItem('referenceShopCode', param.referenceShopCode);
    localStorage.setItem('referenceShopName', param.referenceShopName ?? "");
  }

  signInGoogle() {
    this.googleFirebaseService.signIn();
  }

  signInFacebook() {
    this.facebookService.signIn();
  }

  login() {
    if (this.username == '') {
      this.toastr.warning('กรุณากรอก username', 'แจ้งเตือนระบบ', { timeOut: 1000 });
      return;
    }

    if (this.password == '') {
      this.toastr.warning('กรุณากรอก password', 'แจ้งเตือนระบบ', { timeOut: 1000 });
      return;
    }
    if (this.username != '') {
      this.model.username = this.username;
      this.model.password = this.password;
    }
    this.serviceProviderService.post('m/register/login', this.model).subscribe(res => {
      let model: any = [];
      model = res;
      console.log(' pop --> ', model.objectData);

      if (model.status == 'S') {
        this.setLocalStorage({
          first_name: model.objectData.firstName,
          last_name: model.objectData.lastName,
          profileCode: model.objectData.code,
          username: model.objectData.username,
          imageUrl: model.objectData.imageUrl,
          isShop: model.objectData.isShop,
          referenceShopCode: model.objectData.referenceShopCode,
          referenceShopName: model.objectData.referenceShopName
        });
        this.router.navigate(['']);
      } else {
        this.toastr.warning(model.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
      }
    }, err => {
      this.toastr.warning(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    })
  }

}
