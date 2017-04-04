import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matchDuration',
})
export class MatchDurationPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    return (value / 60).toFixed();
  }

}
