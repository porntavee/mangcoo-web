import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-routing-object',
  templateUrl: './routing-object.component.html',
  styleUrls: ['./routing-object.component.css']
})
export class RoutingObjectComponent implements OnInit {

  model: any;
  constructor(private route: ActivatedRoute, private req: Request) { 
    debugger

    var forms = parent.document.getElementsByName("payment_form");


    // this.model = new FormData();
    // var x = this.model.get('respURL');

    // if(this.route.snapshot.queryParams) 
    // {
    //   console.log(this.route.snapshot.params); // e.g. :param1 in routeConfig
    //   this.model = this.route.snapshot.queryParams;
    // }
    // if(this.route.snapshot.queryParamMap.get('param1'))
    // {
    //   console.log(this.route.snapshot.queryParamMap.get('param1')); // e.g. in URI ?param1=blah
    //   this.model = this.route.snapshot.queryParamMap.get('param1');
    // }
      

    // this.route.queryParams.subscribe(params => { 
    //   let model: any = params;
    //   if (model) {
    //     // this.id = JSON.parse(model.special);
    //     this.model = JSON.parse(model.special);
    //   }
    // });
  }

  ngOnInit(): void {
  }

}
