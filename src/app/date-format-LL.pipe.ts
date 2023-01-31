import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";
import { ServiceProviderService } from "./shares/service-provider.service";

@Pipe({
  name: 'dateFormatLL'
})


export class DateFormatLLPipe implements PipeTransform {

  constructor(public serviceProviderService: ServiceProviderService,) {

  }

  transform(param: string) {

    if (this.serviceProviderService.lang == 'th')
      moment.locale('th');
    else
      moment.locale('en');

    if (param == null || param == '')
      return '-';
    else
      return moment(param).add(543,'year').format('LL');
  }
}
