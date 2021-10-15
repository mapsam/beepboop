# beepboop

Beepboop is a little journal for simple writing. Sign up at [beepboop.mapsam.vercel.app](https://beepboop.mapsam.vercel.app). Built with MongoDB, Next.js, and Vercel.

![](/public/readme.png)

## Database

Uses MongoDB for all data storage. All user & session collections are managed by [next-auth](next-auth.js.org/). The primary collection is called `days` and has the following schema:

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

## API

### Authentication

The API only works with sessions that are provided to the running application. This is not a public API. There are no API tokens available to use these endpoints.

### `GET /days`

Get one or more days for an account. This endpoint is used for getting a single day, paginating days, or getting days between two dates. All results are returned in descending order by date.

**Basic query parameters:**

The following can be used all together to get a list of days. To get a single day (i.e. a permalink) use year, month, and day query parameters all together.

* `?year=YYYY` - get all days that match the specified year
* `?month=MM` - get all days that match the specified month
* `?day=DD` - get all days that match the specified day
* `?weekday=[1-7]` - get all days that match the given weekday (1 = Sunday)

**Extended query parameters:**

* `?between=START:END` - load all days between two dates in YYYY-MM-DD format. Example `&?between=2021-01-01:2021-02-15`. All other query parameters are ignored if this is set.
* `?page=NUMBER` - load 30 days at a time, page by page. Must be a value greater or equal to `1`. All other query parameters are ignored if this is set.


### `POST /days`

Upsert a day. This performs a get then write operation.

Request body:

```json
{
  "year": 2021,
  "month": 1,
  "day": 1,
  "text": "I did this thing"
}
```

### `DELETE /days`

Remove a day. This is a permanent action. There are no soft deletes.

Request body:

```json
{
  "year": 2021,
  "month": 1,
  "day": 1
}
```

### `GET /account`

Get a single account or download account data.

A request without query parameters will return the full account object from the database. Example account object:

```JSON
{
  "_id": "abcdefg562ec50008ec3f52",
  "name": "Leslie Knope",
  "email": "waffles@parksandrec.pawnee.in.gov",
  "image": "https://lh3.googleusercontent.com/abcd",
  "createdAt": 1605982254639,
  "updatedAt": 1605982254639
}
```

A request with the `?download` query parameter will download all data in the format specified. Values can be `json` or `csv`. The response includes the `Content-Disposition: attachment; filename=` header, which signals the client to download the response as a file.