import './App.css';

import React, {Component} from 'react';

import Bar from './components/Bar';
import Dump from './components/Dump';
import Marquee from './components/Marquee';
import SlideBar from './components/SlideBar';
import config from './config';
import {getMatcherinoData} from './lib/common';
import simplifyData from './lib/simplifyData';

class App extends Component {
  state = {};

  componentDidMount() {
    getMatcherinoData(config.eventId, config.pollSeconds, matcherinoData => {
      const data = simplifyData(matcherinoData);
      console.log('matcherinoData', matcherinoData, data);
      this.setState({data});
    });
  }

  render() {
    console.log('RENDER', this.props, this.state);
    const {data} = this.state;

    if (!data) return null;

    return (
      <div className="App">
        <div style={{padding: '30px'}}>
          <div style={{width: 800}}>
            <Bar data={data} />
          </div>
          <div style={{width: 800}}>
            <SlideBar data={data} />
          </div>
          <div>
            <Marquee messages={data.messages} />
          </div>
          <Dump it={data} />
        </div>
      </div>
    );
  }
}

export default App;
