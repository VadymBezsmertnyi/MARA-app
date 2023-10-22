export const searchTextInArray = <T extends Array<Record<string, string | number>>>(
  value: string,
  array: T,
): T => {
  if (!value) return array;
  const result = array.filter(item => {
    const keys = Object.keys(item);
    if (!keys.length) return false;
    return (
      keys.findIndex(key => {
        const currentItem = item[key];
        return typeof currentItem === 'string'
          ? currentItem.toLowerCase().includes(value.toLowerCase())
          : false;
      }) >= 0
    );
  });

  return result as T;
};
