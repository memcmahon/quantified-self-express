# Quantified-Self Node.js

This is one of three identical APIs build as part of the [Quantified Self](http://backend.turing.io/module4/projects/quantified-self/quantified-self) project while at Turing.  Built over 4 days using Node.js and Express, this is a RESTful JSON API that is designed to be used as a daily meal tracker.

The [endpoints](#endpoints) below can be explored using [curl](https://curl.haxx.se/), [Postman](https://www.getpostman.com/) or your preferred client.  This API is deployed at https://evening-reef-62953.herokuapp.com/

## Local Installation

If you would like to clone and use this repo locally, please follow the steps below:

```$ git clone https://github.com/memcmahon/quantified-self-express.git```

```$ cd quantified-self-express```

```$ npm install```

```$ psql 

CREATE DATABASE quantified_self_express;

CREATE DATABASE quantified_self_express_test;```

```$ knex migrate:latest```

```$ knex seed:run```

```$ npm start```

You can now navigate to `localhost:3000` and use the [endpoints](#endpoints) described below

## Schema

![Imgur](https://i.imgur.com/T6ImmLI.png)

## <a name='endpoints'>Endpoints</a>

### Food Endpoints

```
GET /api/v1/foods
```
```
GET /api/v1/foods/:id
```
```
POST /api/v1/foods
   with body: { "food": { "name": "Name of food here", "calories": "Calories here"} }
```
```
PATCH /api/v1/foods
   with body: { "food": { "name": "Name of food here", "calories": "Calories here"} }
```
```
DELETE /api/v1/foods/:id
```

### Meal Endpoints
```
GET /api/v1/meals
```
```
GET /api/v1/meals/:meal_id/foods
```
```
POST /api/v1/meals/:meal_id/foods/:food_id
```
```
DELETE /api/v1/meals/:meal_id/foods/:food_id
```

## Prerequisites
* PostgreSQL
* Knex
