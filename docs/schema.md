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

```
{
  "_id": ObjectId("asdf"),
  "created": "date",
  "modified": "date",
  "year": "int",
  "month": "int",
  "day": "int",
  "weekday": "int",
  "text": "string",
  "location": "object<Location>",
  "account": "object<Account>",
  "image": {
    "data": "binData",
    "type": "string"
  }
}
```

Indexes

* year
* month
* day
* weekday
* account

### users

```
{
  "_id" : ObjectId("asdf"),
  "name" : "Leslie Knope",
  "email" : "leslie.knope@gmail.com",
  "image" : "https://lh3.googleusercontent.com/...",
  "createdAt" : ISODate("2020-11-07T01:30:52.997Z")
  "updatedAt" : ISODate("2020-11-07T01:30:52.997Z")
}
```

### images

`Image`

```
{
  "_id":
}
```

### locations

`Location`

```
{
  "_id": "...",
  "date": "date",
  "text": "string",
  "location": "object<Location>"
}
```

