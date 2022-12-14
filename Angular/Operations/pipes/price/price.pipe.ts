import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import localeCo from '@angular/common/locales/es-CO';

registerLocaleData(localeCo, 'co');

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {}
  transform(value: number): string {
    return value > 0
      ? (this.currencyPipe.transform(
          value,
          'COP',
          'symbol',
          '1.0-0',
          'co'
        ) as string)
      : 'Gratis';
  }
}
