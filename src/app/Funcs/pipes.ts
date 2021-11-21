import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortObject',
  pure: false,
})
export class SortObjectPipe implements PipeTransform {
  constructor() {}

  transform(items: any[]): any[] {
    return items.sort((a, b) => b.value - a.value);
  }
}
