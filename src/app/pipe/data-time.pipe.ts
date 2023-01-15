import { Pipe, PipeTransform } from '@angular/core';
import { CoachGroupList } from '../models/coach-list-model';

@Pipe({
  name: 'dateTime',
})
export class DateTimePipe implements PipeTransform {
    constructor() {
    }

    transform(date: string): string {
        const x =new Date(date);
        return this.formatDate(new Date(x.getTime() + 7200000));
        
    }
     padTo2Digits(num: any) {
        return num.toString().padStart(2, '0');
      }
     formatDate(date: any) {
        return [
          this.padTo2Digits(date.getDate()),
          this.padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join(' ');
      }
}
