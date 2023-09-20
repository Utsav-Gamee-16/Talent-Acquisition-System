import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'commonDate'
})
export class CommonDatePipe implements PipeTransform {

  transform(value: any, format: string): any {
    if (!value || value === '') {
      return '';
    }
    return moment(value).format(format);
  }
  abstractDateFormCurrent(value: any, type: any): any {
    if (!value || value === '') {
      return '';
    }
    const date = new Date(moment().subtract(value, type).format()).getTime();
    return date;
  }

  addDateFormCurrent(value: any, type: any): any {
    if (!value || value === '') {
      return '';
    }
    const date = new Date(moment().add(value, type).format()).getTime();
    return date;
  }
}
