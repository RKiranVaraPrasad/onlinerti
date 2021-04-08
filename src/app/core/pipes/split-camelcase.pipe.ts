import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitCamelcase'
})
export class SplitCamelcasePipe implements PipeTransform {

  transform(value: string): string {
    return value.split(/[\s_]+|(?=[A-Z])/).join(" ")
  }

}
