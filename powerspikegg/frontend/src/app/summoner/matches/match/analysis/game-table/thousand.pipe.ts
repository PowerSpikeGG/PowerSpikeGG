import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandPipe',
})
export class ThousandPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value > 1000 ? (value / 1000).toFixed() + 'K' : value;
  }

}
