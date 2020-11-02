export function createDay(date, account, text) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const weekday = date.getDay();

  return {
    year,
    month,
    day,
    weekday,
    text,
    account: account
  };
};