
export const monthInfo = [
  { label: 'Jan', value: 1, days: 31 },
  { label: 'Feb', value: 2, days: 29 },
  { label: 'Mar', value: 3, days: 31 },
  { label: 'Apr', value: 4, days: 30 },
  { label: 'May', value: 5, days: 31 },
  { label: 'Jun', value: 6, days: 30 },
  { label: 'Jul', value: 7, days: 31 },
  { label: 'Aug', value: 8, days: 31 },
  { label: 'Sep', value: 9, days: 30 },
  { label: 'Oct', value: 10, days: 31 },
  { label: 'Nov', value: 11, days: 30 },
  { label: 'Dec', value: 12, days: 31 }
];

export function parseISODate(date: string|undefined) {
  if (typeof date === 'string') {
    const [year, month, day] = date.split('-', 3);

    return {
      month: month === 'XX' ? '' : Number(month).toString(),
      day: day === 'XX' ? '' : Number(day).toString(),
      year: year === 'XXXX' ? '' : year
    };
  }

  return {
    month: '',
    day: '',
    year: ''
  };
}

export type ISODateParts = {
  month: string;
  day: string;
  year: string;
};
export function formatISOPartialDate({ month, day, year }: ISODateParts) {
  const padTo = (value: string, pad: number) => ("0000"+value).substr(-pad);

  if (month || day || year) {
    return `${padTo(year, 4)}-${padTo(month, 2)}-${padTo(day, 2)}`;
  }

  return undefined;
}
