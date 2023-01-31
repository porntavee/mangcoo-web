import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-d-notification',
  templateUrl: './d-notification.component.html',
  styleUrls: ['./d-notification.component.css']
})
export class DNotificationComponent implements OnInit {

  menuActive = 'noti';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToNotification() {
    this.menuActive = 'noti';
    this.router.navigate(['notification']);
  }

  goToMyPurchase() {
    this.menuActive = 'myOrder';
    this.router.navigate(['mypurchase']);
  }

}
