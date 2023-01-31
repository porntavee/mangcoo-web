import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'app-m-register',
  templateUrl: './m-register.component.html',
  styleUrls: ['./m-register.component.css']
})
export class MRegisterComponent implements OnInit {
  model:any = {
    username: '',
    name: '',
    password: ''
  }

  constructor(private router: Router,
    private serviceProviderService: ServiceProviderService,
    private utilities: Utilities,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  goToLogin() {
    this.router.navigate(['m/login']);
  }

  async create() {
    if(this.validate())
    return this.toastr.warning('', 'กรอกข้อมูลไม่ถูกต้อง', { timeOut: 2000 });
    let nameSplit = this.model.name.split(' ');

    let firstName = nameSplit[0];
    let lastName = nameSplit[1] != null ||  nameSplit[1] != '' ? nameSplit[1] : '';
    if(nameSplit.length > 2) {
      nameSplit.forEach((e,index) => {
        if(index > 1) lastName += ' ' + e;
      });
    }
    
    this.serviceProviderService.post('m/Register/create', {
      'username': this.model.username,
      'password': this.model.password,
      'facebookID': "",
      'appleID': "",
      'googleID': "",
      'lineID': "",
      'email': '',
      'imageUrl': "",
      'category': "guest",
      'prefixName': '',
      'firstName': firstName,
      'lastName': lastName,
      'phone': this.model.username,
      'birthDay': "",
      'status': "N",
      'platform': 'web',
      'countUnit': "[]"
    }).subscribe(response => {
      var data: any = response;
      this.router.navigate(['m/login']);

    }, err => {
    });
  }

  validate() {
    if(this.model.username.trim() == '' || this.model.username == null) return true;
    if(this.model.name.trim() == '' || this.model.name == null) return true;
    if(this.model.password.trim() == '' || this.model.password == null) return true;
    return false;
  }
}
