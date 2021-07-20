import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitHyphen'
})
export class SplitHyphenPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const formatValue = value.split('-').join(' ');
    // console.log(formatValue)
    const words = [];
    for (let word of formatValue.split(' ')) {
      words.push(word[0].toUpperCase() + word.slice(1));
    }
    return words.join(" ");
  }

}
