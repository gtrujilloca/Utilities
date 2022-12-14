import { WordPipe } from './word.pipe';

describe('WordPipe', () => {
  const wordPipe = new WordPipe();
  const itemList = [
    {
      name: 'apple',
      price: 49000
    },
    {
      name: 'orange',
      price: 3400
    },
    {
      name: 'watermelon',
      price: 2000
    },
    {
      name: 'coconut',
      price: 1200
    },
    {
      name: 'banana',
      price: 100
    },
    {
      name: 'pineapple',
      price: 3000
    },
  ]

  it('create an instance', () => {
    const pipe = new WordPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should return equal items if word length is lower than minLength', () => {
    const result = wordPipe.transform(itemList, {
      isObject: true,
      minLength: 2,
      prop: 'name',
      word: 'f'
    })

    expect(result).toEqual(itemList);
    expect(result.length).toEqual(itemList.length);
  })

  it('Should return empty array if items are less than or equal to zero', () => {
    const result = wordPipe.transform([], {
      isObject: true,
      minLength: 2,
      prop: 'name',
      word: 'ffff'
    })

    expect(result).toEqual([]);
    expect(result.length).toEqual(0);
  })

  it('Should return equal items if is an object and prop length is less than or equal to zero', () => {
    const result = wordPipe.transform(itemList, {
      isObject: true,
      minLength: 2,
      prop: '',
      word: 'ffff'
    })

    expect(result).toEqual(itemList);
    expect(result.length).toEqual(itemList.length);
  })

  it('Should return equal items if send default props', () => {
    const result = wordPipe.transform(itemList,{})
    expect(result).toEqual(itemList);
    expect(result.length).toEqual(itemList.length);
  })

  it('Should return two items if is not object', () => {
    const fruits = ['apple', 'orange', 'watermelon', 'coconut', 'pineapple'];
    const result = wordPipe.transform(fruits,{
      isObject: false,
      minLength: 2,
      prop: '',
      word: 'apple'
    })
    expect(result).toEqual(['apple', 'pineapple']);
    expect(result.length).toEqual(2);
  })

  it('Should return array with two items', () => {
    const result = wordPipe.transform(itemList, {
      isObject: true,
      minLength: 2,
      prop: 'name',
      word: 'appl'
    })

    expect(result).toEqual([
      {
        name: 'apple',
        price: 49000
      },
      {
        name: 'pineapple',
        price: 3000
      },
    ]);
    expect(result.length).toEqual(2);
  })
});
