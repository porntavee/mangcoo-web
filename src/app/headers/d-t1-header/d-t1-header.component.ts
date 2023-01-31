import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService } from 'src/app/shares/facebook.service';
import { GoogleFirebaseService } from 'src/app/shares/google-firebase.service';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'app-d-t1-header',
  templateUrl: './d-t1-header.component.html',
  styleUrls: ['./d-t1-header.component.css']

})
export class DT1HeaderComponent implements OnInit {
  @Input() cartNumber: number = 0;
  userData: any = { profileCode: '' };
  isOpenedDownload = false;
  isOpenedNotification = false;
  isOpenedCart = false;
  modelCartCount: any = [];
  isMousePrice = false;
  shopName = "";
  manageShop = [];
  keysearch = "";
  path = "";
  showBar: boolean = false;
  showSearch: boolean = false;
  showMenu: boolean = false;
  oldWeb = '';
  profileCode = "";

  constructor(
    private router: Router,
    private utilities: Utilities,
    public googleFirebaseService: GoogleFirebaseService,
    public facebookService: FacebookService,
    public serviceProviderService: ServiceProviderService,
  ) { }

  ngOnInit(): void {
    this.path = window.location.origin + '/';
    this.oldWeb = 'http://209.15.98.88';

    // console.log(this.serviceProviderService.lang);

    if (this.utilities.getUserLocalStorage().profileCode != '' && this.utilities.getUserLocalStorage().profileCode != null) {
      this.userData = this.utilities.getUserLocalStorage();
      this.profileCode = this.userData.profileCode;
    }
    // this.readCartCount();
    // this.readManageShop();
  }

  changeShowSearch() {
    this.showSearch = !this.showSearch;
  }

  changeShowMenu() {
    this.showMenu = !this.showMenu;
  }

  readManageShop() {
    this.serviceProviderService.post('m/manageShop/read', { "code": this.utilities.getUserLocalStorage().referenceShopCode }).subscribe(res => {
      let model: any = [];
      model = res;
      this.manageShop = model.objectData;

    }, err => {
      console.log(' err Shop --> ', err);
    })
  }

  selectManageShop(param) {
    localStorage.setItem('referenceShopCode', param.shopCode);
    localStorage.setItem('referenceShopName', param.referenceShopName ?? "");
    this.ngOnInit();
  }


  readCartCount() {
    this.serviceProviderService.post('m/cart/count', {}).subscribe(data => {
      let model: any = [];
      model = data;
      this.cartNumber = model.objectData.count;
    })
  }

  openFacebook() {
    window.open('https://www.facebook.com/profile.php?id=100050175092653', "_blank");
  }

  goToNotification() {
    if (this.utilities.getUserLocalStorage().profileCode == '' || this.utilities.getUserLocalStorage().profileCode == null) {
      return this.router.navigate(['/login']);
    } else
      this.router.navigate(['notification']);
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  goToProfile(page) {
    this.router.navigate(['register'], { queryParams: { type: page, code: this.utilities.getUserLocalStorage().profileCode } }).then(() => { window.location.reload(); });
  }

  goToCart() {
    this.router.navigate(['cart']);
  }

  goToMain() {
    this.router.navigate(['']);
  }

  nav(nav: string) {
    switch (nav) {
      case 'center':
        this.router.navigate(['/center']).then(() => {
          window.location.reload();
        });
        break;
      case 'news':
        this.router.navigate(['/news']);
        break;
      case 'eventcalendar':
        this.router.navigate(['eventcalendar']);
        break;
      case 'knowledge':
        this.router.navigate(['knowledge']);
        break;
      case 'contact-us':
        this.router.navigate(['contact-us']);
        break;
      case 'personnel':
        this.router.navigate(['personnel']);
        break;
      case 'search-content':
        this.router.navigate(['search-content'], { queryParams: { code: this.keysearch } }).then(() => {
          window.location.reload();
        });
        break;
      case 'important':
        this.router.navigate(['/important']);
        break;
      case 'law':
        this.router.navigate(['law']);
        break;
      case 'oldweb':
        window.open(this.oldWeb);
        break;
      default:
        this.router.navigate(['']);
        break;
    }
  }

  logout() {
    localStorage.clear();
    this.userData.profileCode = '';
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
    // window.location.reload();
  }

  chkMousePriceIn() {
    this.isMousePrice = true;
  }

  chkMousePriceOut() {
    this.isMousePrice = false;
  }

  setLang(param) {
    localStorage.setItem('lang', param);
    window.location.reload();
  }

}
