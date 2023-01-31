import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService } from 'src/app/shares/facebook.service';
import { GoogleFirebaseService } from 'src/app/shares/google-firebase.service';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'app-m-t1-header',
  templateUrl: './m-t1-header.component.html',
  styleUrls: ['./m-t1-header.component.css']
})
export class MT1HeaderComponent implements OnInit {
  keysearch = "";
  showSearch: boolean = false;
  showMenu: boolean = false;

  constructor(
    private router: Router,
    private utilities: Utilities,
    public googleFirebaseService: GoogleFirebaseService,
    public facebookService: FacebookService,
    public serviceProviderService: ServiceProviderService,
  ) { }

  ngOnInit(): void {
  }

  goToMain() {
    this.router.navigate(['m']);
  }

  changeShowSearch() {
    this.showSearch = !this.showSearch;
  }

  changeShowMenu() {
    this.showMenu = !this.showMenu;
  }

  nav(nav: string) {
    switch (nav) {
      case 'center':
        this.router.navigate(['m/center']);
        break;
      case 'news':
        this.router.navigate(['m/news']);
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
      case 'oldweb':
        var url = 'http://209.15.98.88';
        window.open(url);
        break;

      default:
        this.router.navigate(['/m']);
        break;
    }
  }

  setLang(param) {
    localStorage.setItem('lang', param);
    window.location.reload();
  }

}