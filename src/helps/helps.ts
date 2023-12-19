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

export const formatDateFromUnixTimestamp = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Додаємо 1, оскільки місяці в JavaScript починаються з 0
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const dateToNMY = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDay = day < 10 ? `0${day}` : day.toString();
  const formattedMonth = month < 10 ? `0${month}` : month.toString();
  const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;
  return formattedDate;
};
