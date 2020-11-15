export function createDay(date, account, text) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = date.getDay();

  return {
    year,
    month,
    day,
    weekday,
    text,
    account: account,
    _id: `${session.userId}:${doc.year}${doc.month}${doc.day}`;
  };
};