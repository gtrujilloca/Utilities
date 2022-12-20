export interface WordFilter {
  isObject: boolean;
  props: string[];
  word: string;
  minLength: number;
}

export const filterByWord = (
  { isObject = false, props = [], word = '', minLength = 1 }: Partial<WordFilter>,
  items: any[] = [],
) => {
  if (word?.length <= minLength) return items;
  if (items.length <= 0) return items;
  if (isObject && props?.length <= 0) return items;

  const reg = new RegExp(`${word}{1,}`, 'i');
  return items.filter((item) => {
    if (!isObject) return reg.test(item);
    return props.some((prop) => reg.test(item[prop]));
  });
};
