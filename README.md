# Matcherino Partner Integrations

Example of Matcherino integration using server to server
client_credentials and JSONP on the client. The UI
is built with React.

## Pre-requisites

* node 6 (test with lts/boron)

## Running


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


    # install facebook utility
    npm install -g create-react-app

    # install dependencies
    npm install

    # run live-reloaded server in this project
    npm start


## Application

The starting point is `src/App.js` which renders `src/pages/tournament/TournamentPage.js`.
The TournamentPage is comprised of many tabs. The main logic is in `src/pages/tournament/MatcherinoTab.js`.

The application currently uses a fixture file for data `src/match.json`.

## Endpoints

In production use `https://matcherino.com` instead of `https://staging.matcherino.com`


To authenticate

    GET https://staging.matcherino.com/__api/auth/login?client_id=CLIENTID&client_secret=CLIENTSECRET&grant_type=client_credentials

To authorize

    POST https://staging.matcherino.com/__api/auth/token

    body: json from authentication call

To create tournament

    POST https://staging.matcherino.com/__api/bounties/partner

    header:
        Authorization: Bearer ACCESSTOKEN

    body: tournament json

To get JSONP tournament data

    POST https://staging.matcherino.com/__api/bounties?id=ID&callback=CALLBACK_NAME

    header:
        Authorization: Bearer ACCESSTOKEN

## Tests

The `test` folder contains test which show how to create a tournament
on the server and get tournament data via JSONP from Matcherino.

To run tests against `staging.matcherino.com`

    # install dependencies if not done above
    npm install

    # run tests with mocha
    mocha

