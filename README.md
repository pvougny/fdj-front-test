# ParisSportifs

The frontend project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.2.

## Tools

- Angular Material
- Angular Router
- NgRx component store

## Installation

Install dependencies:

```shell
cd paris-sportifs
npm install
```

## Local server

Run the application locally:

```shell
npm start
```

## Tests

Run tests:

```shell
npm test
```

## API

Documentation: <https://www.thesportsdb.com/api.php>

API Key: 50130162

* Get list of available leagues: [/api/v1/json/50130162/all_leagues.php](https://www.thesportsdb.com/api/v1/json/50130162/all_leagues.php)
* Get teams of a league: [/api/v1/json/50130162/search_all_teams.php?l=French%20Ligue%201](https://www.thesportsdb.com/api/v1/json/50130162/search_all_teams.php?l=French%20Ligue%201)
* Get team details: [/api/v1/json/50130162/searchteams.php?t=Paris%20SG](https://www.thesportsdb.com/api/v1/json/50130162/searchteams.php?t=Paris%20SG)
