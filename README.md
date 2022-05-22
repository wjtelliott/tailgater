# Tailgater Backend

A backend api for our front end `thehood`

***

## Cars data structure

We will include the following data on our database for the listed cars:

| Car Data | Data Type |
| -------- | --------- |
| make | string |
| model | string |
| year | number |
| color | string |
| milage | number |
| condition | number |
| userId | user collection reference |

***

## User data structure

We will include the following data on our database for the signed up users:

| User Data | Data Type |
| --------- | --------- |
| name (alias) | string |
| selling state | string |
| selling city | string |
| phone | string |
| email | string |
| psw | string |

***

## API / Routes

| Route Type | Path | Purpose |
| ---------- | ---- | ------- |
| GET | `/users` | Get user information |
| POST | `/users` | Add a new signed up user |
| PUT | `/users` | Update user information |
| GET | `/users/:id` | Get user info from a mongo id |
| GET | `/users/myprofile/:id` | Get currect logged in user profile info from auth0 id |
| \/\/\/ | \/\/\/ | \/\/\/ |
| GET | `/cars` | Get car listings |
| POST | `/cars` | Post new car listing |
| PUT | `/cars` | Update a car listing |
| GET | `/cars/:start/:amount` | Get listings of cars using pagination |