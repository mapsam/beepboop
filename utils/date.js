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

export function zeros(i) {
  if (i < 10) return '0' + i;
  return i;
}