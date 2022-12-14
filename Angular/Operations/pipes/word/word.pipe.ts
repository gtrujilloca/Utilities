import { Pipe, PipeTransform } from '@angular/core';
import { WordFilter } from 'src/shared/modules/interfaces/select.model';
@Pipe({
  name: 'word'
})
export class WordPipe implements PipeTransform {

  transform(
    items: any[],
    {
      isObject = false,
      prop = '',
      word = '',
      minLength = 1
    }: Partial<WordFilter>
  ): any[] {
    if (word?.length <= minLength) return items;
    if (items.length <= 0) return items;
    if (isObject && prop?.length <= 0) return items;

    const reg = new RegExp(`${word}{1,}`, 'i')
    return items.filter(item =>
      isObject
        ? reg.test(item[prop])
        : reg.test(item)
    )
  }

}
