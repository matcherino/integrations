# Matcherino Partner Integrations

Example of Matcherino integration using server-server client_credentials and JSONP on the client.

## Running

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


    # install facebook utility
    npm install -g create-react-app

    # run live-reloaded server in this project
    npm start


## Application

The starting point is `src/App.js` which renders `src/pages/tournament/TournamentPage.js`.
The TournamentPage is comprised of many tags, the main logic is in `src/pages/tournament/MatcherinoTab.js`.

The application currently uses a fixture file for data `src/match.json`. The example
will be updated by end of week (October 22, 2016) to use proper
OAUTH and JSON API.

