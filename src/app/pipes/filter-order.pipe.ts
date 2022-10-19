import { Pipe, PipeTransform } from '@angular/core';
import { IOrder } from '../models/order';

@Pipe({
  name: 'filterOrder'
})
export class FilterOrderPipe implements PipeTransform {

  transform(orders: IOrder[], status: string): IOrder[] {
    if (status == 'All')
      return orders
      
    return orders.filter(o => o.status == status);
  }

}
