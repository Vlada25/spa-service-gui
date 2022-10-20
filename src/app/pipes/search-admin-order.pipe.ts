import { Pipe, PipeTransform } from '@angular/core';
import { IOrder } from '../models/order';

@Pipe({
  name: 'searchAdminOrder'
})
export class SearchAdminOrderPipe implements PipeTransform {

  transform(orders: IOrder[], 
    status: string, 
    clientSurname: string,
    masterSurname: string,
    date: string): IOrder[] {

    if (status == 'All' && clientSurname == '' && masterSurname == '' && date == '')
      return orders

    if (date == '' && status == 'All')
      return orders.filter(o => 
        o.clientSurname?.toLocaleLowerCase().includes(clientSurname.toLocaleLowerCase()) &&
        o.masterSurname?.toLocaleLowerCase().includes(masterSurname.toLocaleLowerCase()) 
        )

    if (date == '' && status != 'All')
      return orders.filter(o => 
        o.clientSurname?.toLocaleLowerCase().includes(clientSurname.toLocaleLowerCase()) &&
        o.masterSurname?.toLocaleLowerCase().includes(masterSurname.toLocaleLowerCase()) &&
        o.status == status
        )

    var year = date.split('-')[0]
    var month = date.split('-')[1]
    var day = date.split('-')[2]

    if (status == 'All')
      return orders.filter(o => {
        var oYear = o.date?.split('-')[0]
        var oMonth = o.date?.split('-')[1]
        var oDay = o.date?.split('-')[2]

        return o.clientSurname?.toLocaleLowerCase().includes(clientSurname.toLocaleLowerCase()) &&
          o.masterSurname?.toLocaleLowerCase().includes(masterSurname.toLocaleLowerCase()) &&
          (day == oDay && month == oMonth && year == oYear)
      })

    return orders.filter(o => {
      var oYear = o.date?.split('-')[0]
      var oMonth = o.date?.split('-')[1]
      var oDay = o.date?.split('-')[2]

      return o.status == status &&
        o.clientSurname?.toLocaleLowerCase().includes(clientSurname.toLocaleLowerCase()) &&
        o.masterSurname?.toLocaleLowerCase().includes(masterSurname.toLocaleLowerCase()) &&
        (day == oDay && month == oMonth && year == oYear)
    });
  }

}
