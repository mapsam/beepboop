MongoDB

## API

### days

#### `/api/days/:account`

List days for an account. Defaults to all days within the current month.

* `?year=YYYY` - specify a year (2018)
* `?month=MM` - specify a month (Janauary = 1)
* `?day=DD` - specify a day (First day of month = 1)
* `?weekday=Sunday` - specify a day of the week
* `?between=YYYY-MM-DD:YYYY-MM-DD` - get all days between two dates (inclusive). Negates any other parameters in the query. Query can be granular by day, month, or year. For example, `?between=2010:2013` gets all days within the years 2010 and 2013.

## DB Collections

### days

`db.days.find()`

```js
{
  "_id": ObjectId("asdf"),
  "userId": ObjectId("1234"),
  "text": "the thing happened!",
  "year": 2020,
  "month": 11,
  "day": 8,
  "weekday": 0,
  "date": 1604793600000,
  "createdAt": 1605982636061,
  "updatedAt": 1605982636061
}
```