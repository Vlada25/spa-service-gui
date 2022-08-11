import { Pipe, PipeTransform } from '@angular/core';
import { IServiceType } from '../models/service-type';

@Pipe({
  name: 'searchServiceTypes'
})
export class SearchServiceTypesPipe implements PipeTransform {

  transform(serviceTypes: IServiceType[], search: string): IServiceType[] {

    if (search.length === 0) return serviceTypes

    return serviceTypes.filter(s => s.name.toLocaleLowerCase()
      .includes(search.toLocaleLowerCase()));
  }

}
