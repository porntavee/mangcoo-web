import { EventEmitter, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Component({
  selector: 'app-d-center-e-learning',
  templateUrl: './d-center-e-learning.component.html',
  styleUrls: ['./d-center-e-learning.component.css']
})
export class DCenterELearningComponent implements OnInit {
  @Input() messageInput: any = [];
  watchModelDiffer: KeyValueDiffer<string, any>;

  constructor(
    public serviceProviderService: ServiceProviderService,
    private differs: KeyValueDiffers
  ) { }

  model: any = [];


  ngOnInit(): void {
    // this.callRead();

    this.watchModelDiffer = this.differs.find(this.messageInput).create();
  }

  callRead() {
    this.serviceProviderService.post('center/content/read', { "reference": this.messageInput.code }).subscribe(res => {
      let model: any = [];
      model = res;
      this.model = model.objectData[0];
      this.messageInput.subTitle = this.messageInput.subTitle ? this.messageInput.subTitle : this.messageInput.title;
    }, err => {
      console.log(' err Shop --> ', err);
    })
  }

  ngDoCheck(): void {

    const changes = this.watchModelDiffer.diff(this.messageInput);
    if (changes) {
      // console.log('helloooooooo');
      this.callRead();
    }
  }

}
