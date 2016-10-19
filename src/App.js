import React, { Component } from 'react';
import TournamentPage from './pages/tournament/TournamentPage';

// sample data
import match from './match.json';

class App extends Component {
  render() {
    console.log('DBG:match', match);
    return <TournamentPage match={match} />
  }
}

export default App;
