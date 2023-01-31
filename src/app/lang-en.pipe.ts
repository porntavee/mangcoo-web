import { Pipe, PipeTransform } from '@angular/core';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';

@Pipe({
  name: 'langEn'
})
export class LangEnPipe implements PipeTransform {

  // langModel: any = {
  //   login: {th:'เข้าสู่ระบบ', en:'Login'},
  //   news: 'News'
  // }

  constructor(public serviceProviderService: ServiceProviderService,) {
  }

  transform(param: string) {

    // return this.langModel[param];

    return this.serviceProviderService.langModel[param].en;

  }

}
