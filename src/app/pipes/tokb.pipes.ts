import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'toKB'
})

export class ToKbPipes implements PipeTransform {
  transform(value: string): number {
    return parseFloat(value)/1024;
  }
}