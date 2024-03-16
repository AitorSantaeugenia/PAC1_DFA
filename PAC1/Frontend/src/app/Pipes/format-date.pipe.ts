import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string | Date, format: number): string {
    const date = new Date(value);
    
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();

    if (day.length === 1) {
      day = '0' + day;
    }

    if (month.length === 1) {
      month = '0' + month;
    }

    if (format === 1) {
      return day + month + year;
    } else if (format === 2) {
      return day + ' / ' + month + ' / ' + year;
    } else if (format === 3) {
      return day + '/' + month + '/' + year;
    } else if (format === 4) {
      return year + '-' + month + '-' + day;
    } else {
      return '';
    }
  }
}