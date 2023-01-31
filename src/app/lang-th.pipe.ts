import { Pipe, PipeTransform } from '@angular/core';
import { ServiceProviderService } from 'src/app/shares/service-provider.service';


@Pipe({
  name: 'langTh'
})
export class LangThPipe implements PipeTransform {

  // langModel: any = {
  //   login: 'เข้าสู่ระบบ',
  //   news: 'ข่าวสารประชาสัมพันธ์'
  // }

  constructor(public serviceProviderService: ServiceProviderService,) {
  }

  transform(param: string) {

    return this.serviceProviderService.langModel[param].th;

  }

}
