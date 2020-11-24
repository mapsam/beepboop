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

const months = [
  '',
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

// 1-index month input
export function monthName(m) {
  return months[m];
};

// returns 1-index month number
export function monthNum(check) {
  return months.findIndex((m) => m === check) + 1;
}

// 1-indexed months
export function daysInMonth(year, month) {
  if (!year || !month) return 31;
  return new Date(year, month, 0).getDate();
}

export function zeros(i) {
  if (i < 10) return '0' + i;
  return i;
}