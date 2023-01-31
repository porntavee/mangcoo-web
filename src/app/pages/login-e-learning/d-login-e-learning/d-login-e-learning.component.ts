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
import { debug } from 'console';
import { CryptoService } from 'src/app/shares/crypto.service';

@Component({
  selector: 'app-d-login-e-learning',
  templateUrl: './d-login-e-learning.component.html',
  styleUrls: ['./d-login-e-learning.component.css']
})
export class DLoginELearningComponent implements OnInit {
  model: any = {
    username: '',
    password: '',
  };
  // username: string = '';
  // password: string = ''
  inputPassword: string = "password";
  namePassword: string = "แสดงรหัสผ่าน";

  isForgetPassword: boolean = false;
  @ViewChild('loginRef', { static: true }) loginElement: ElementRef;

  constructor(
    private router: Router,
    private serviceProviderService: ServiceProviderService,
    private utilities: Utilities,
    private ref: ChangeDetectorRef,
    public afAuth: AngularFireAuth,
    public googleFirebaseService: GoogleFirebaseService,
    public facebookService: FacebookService,
    private toastr: ToastrService,
    private cryptoService: CryptoService
  ) { }

  ngOnInit(): void {
    if (this.utilities.getUserLocalStorage().profileCode != '' && this.utilities.getUserLocalStorage().profileCode != null) {
      this.router.navigate(['']);
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

  goToRegister() {
    this.router.navigate(['register']);
  }

  setLocalStorage(param) {
    localStorage.setItem('token', param.token);
    localStorage.setItem('profileCode', param.profileCode);
    localStorage.setItem('userId', param.userId);
    localStorage.setItem('username', param.username);
    localStorage.setItem('first_name', param.first_name);
    localStorage.setItem('last_name', param.last_name);
    localStorage.setItem('email', param.email);
    localStorage.setItem('imageUrl', param.imageUrl);
  }

  signInGoogle() {
    this.googleFirebaseService.signIn();
  }

  signInFacebook() {
    this.facebookService.signIn();
  }

  login() {
    if (this.model.username == '') {
      this.toastr.warning('กรุณากรอก หมายเลขบัตรประชาชน', 'แจ้งเตือนระบบ', { timeOut: 1000 });
      return;
    }

    if (this.model.password == '') {
      this.toastr.warning('กรุณากรอก password', 'แจ้งเตือนระบบ', { timeOut: 1000 });
      return;
    }

    // debugger
    // this.cryptoService.plainText = JSON.stringify(this.model);
    // this.cryptoService.convertText('encrypt');
    // let endt = this.cryptoService.conversionEncryptOutput;

    // this.cryptoService.encryptText = endt;
    // this.cryptoService.convertText('');
    // let dcdt = this.cryptoService.conversionDecryptOutput;


    this.serviceProviderService.post('m/veterinary2/login', this.model).subscribe(res => {
      let model: any = [];
      model = res;

      if (model.status == 'S') {
        this.setLocalStorage({
          first_name: model.objectData.firstName,
          last_name: model.objectData.lastName,
          profileCode: model.objectData.code,
          username: model.objectData.username,
          imageUrl: model.objectData.imageUrl,
          email: model.objectData.email,
          userId: model.objectData.username,
        });
        this.router.navigate(['']);
      } else {
        this.toastr.warning(model.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
      }
    }, err => {
      this.toastr.warning(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    })
  }


  showPassword() {
    if (this.inputPassword === "password") {
      this.inputPassword = "text";
      this.namePassword = "ซ่อนรหัสผ่าน";
    } else {
      this.inputPassword = "password";
      this.namePassword = "แสดงรหัสผ่าน";
    }
  }

  forgetPassword() {
    if (this.model.email == '') {
      this.toastr.warning('กรุณากรอก Email', 'แจ้งเตือนระบบ', { timeOut: 1000 });
      return;
    }

    debugger

    this.serviceProviderService.post('Veterinary2/forgot/password', this.model).subscribe(res => {
      debugger
      let model: any = [];
      model = res;

      if (model.status == 'S') {
        this.toastr.success(model.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
        this.isForgetPassword = !this.forgetPassword;
      } else {
        this.toastr.warning(model.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
      }
    }, err => {
      debugger
      this.toastr.warning(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    })
  }
}
