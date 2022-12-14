import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { PricePipe } from './price.pipe';
import esCO from '@angular/common/locales/es-CO';

registerLocaleData(esCO);

describe('PricePipe', () => {
  let pricePipe = new PricePipe(new CurrencyPipe('es-co', 'COP'));

  it('create an instance', () => {
    expect(pricePipe).toBeTruthy();
  });

  it('Should transform price pipes', () => {
    let result = pricePipe.transform(49000);
    let regex = /&nbsp;|\u00a0/g;
    result = result.replace(regex, ' ');
    expect(result).toBe('$ 49.000');
  });

  it('Should print Gratis', () => {
    let result = pricePipe.transform(-1);
    expect(result).toEqual('Gratis');
  });
});
