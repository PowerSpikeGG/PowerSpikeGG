import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'kda',
})
export class KdaPipe extends DecimalPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return (value < 0.5) ? 'FEEDER' : super.transform(value, '1.2-2') + ' KDA'
  }

}
