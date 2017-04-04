import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matchDuration'
})
export class MatchDurationPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    return (value / 100).toFixed(); // keep only minutes to simplify the UI
  }

}
