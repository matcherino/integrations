import './index.css';

import {Motion, spring} from 'react-motion';

import Component from 'inferno-component';
import React from 'react';

export default class Marquee extends Component {
  componentWillReceiveProps() {}
  render(props, state) {
    console.log('Marquee:render', props, state);
    const {messages} = props;

    if (!messages) return null;

    const message = messages[0];

    return (
      <div>
        <div>
          <Motion defaultStyle={{x: 0}} style={{x: spring(10)}}>
            {values => <span style={{left: values.x}}>{message}</span>}
          </Motion>
        </div>
      </div>
    );
  }
}
