import { Pipe, PipeTransform } from '@angular/core';
import { IOrder } from '../models/order';
import { ISchedule } from '../models/schedule';

@Pipe({
  name: 'searchMasterOrderDate'
})
export class SearchMasterOrderDatePipe implements PipeTransform {

  transform(schedules: ISchedule[], date: string): ISchedule[] {
    if (date == '')
      return schedules
    
    var year = date.split('-')[0]
    var month = date.split('-')[1]
    var day = date.split('-')[2]

    return schedules.filter(sch => {
      var schYear = sch.startTime.split('T')[0].split('-')[0]
      var schMonth = sch.startTime.split('T')[0].split('-')[1]
      var schDay = sch.startTime.split('T')[0].split('-')[2]

      return schYear == year && schMonth == month && schDay == day
    });
  }

}
