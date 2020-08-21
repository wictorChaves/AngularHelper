import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'treePoints'
})
export class TreePointsPipe implements PipeTransform {

  transform(value: string, qtPoints: number): any {
    if (value.length <= qtPoints)
      return value;
    return value.substring(0, qtPoints) + " ...";
  }

}
