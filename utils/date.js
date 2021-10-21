import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export function weekday(n) {
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  return weekdays[n];
}

export const months = [
  'January',
  'Febrary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const monthNumbers = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12
];

// 1-index month input
export function monthName(m) {
  return months[m - 1];
};

// returns 1-index month number
export function monthNum(check) {
  return months.findIndex((m) => m === check) + 1;
}

// 1-indexed months
export function daysInMonth(year, month) {
  console.log(typeof year, typeof month, new Date(year, month, 0).getDate());
  return new Date(year, month, 0).getDate();
}

export function zeros(i) {
  if (i < 10) return '0' + i;
  return i;
}

export function isToday({ year, month, day }) {
  console.log('isToday', year, month, day);
  return moment().format('YYYY-M-D') === `${year}-${month}-${day}`;
}

export function today() {
  const m = moment();
  return {
    day: m.date(),
    month: m.month() + 1,
    year: m.year(),
    weekday: m.day()
  }
}

export function fillDays(list, start, end) {
  const range = moment.range(start, end);

  return Array.from(range.reverseBy('day')).map((day) => {
    const y = +day.format('YYYY');
    const m = +day.format('MM');
    const d = +day.format('DD');
    const w = +day.format('d');

    let entry = list.find((dbDay) => {
      return dbDay.year === y && dbDay.month === m && dbDay.day === d;
    });

    if (!entry) entry = {
      empty: true,
      year: y,
      month: m,
      day: d,
      weekday: w
    };

    return entry;
  });
}