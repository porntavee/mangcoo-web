import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';
import { Utilities } from 'src/app/shares/utilities';

@Component({
  selector: 'shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.css']
})
export class ShopInfoComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  @Input() model: any = {};
  follower:number = 0;
  following:number = 0;

  constructor(
    private serviceProviderService: ServiceProviderService,
    private utilities:Utilities,
    ) { }

  ngOnInit(): void {
    this.model;
    this.callReadFollower();
    this.callReadFollowing();
  }

  callReadFollower() {
    this.serviceProviderService.post(this.utilities.curDevice() + 'follow/follower/read', { 'referenceShopCode': this.model.code}).subscribe(response => {
      var data: any = response;
      this.follower = data.objectData.length;
      
    }, err => {
    });
  }

  callReadFollowing() {
    this.serviceProviderService.post(this.utilities.curDevice() + 'm/follow/following/read', { 'referenceShopCode': this.model.code}).subscribe(response => {
      var data: any = response;
      this.following = data.objectData.length;
    }, err => {
    });
  }

}
