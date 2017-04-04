import './index.css';

import {Motion, spring} from 'react-motion';
import React, {Component} from 'react';

export default class Marquee extends Component {
  state = {activeIndex: 0};

  render() {
    console.log('Marquee:render', this.props);
    const {messages} = this.props;

    if (!messages) return null;
    const {activeIndex} = this.state;
    const message = messages[activeIndex];

    console.log('Marquee:render', message, activeIndex);

    //<span style={{left: values.x}}>{message}</span>

    return (
      <div>
        <div className="marquee">
          <div>
            <Motion
              key={activeIndex}
              onRest={this.moveNext}
              defaultStyle={{x: 800}}
              style={{x: spring(0, {stiffness: 100, damping: 10})}}
            >
              {values => (
                <span style={{left: values.x, verticalAlign: 'middle'}}>
                  <img width={16} height={16} src={message.avatar} /> {message.comment}
                </span>
              )}
            </Motion>
          </div>
        </div>
      </div>
    );
  }

  moveNext = () => {
    const {messages} = this.props;
    const {activeIndex} = this.state;
    const length = messages ? messages.length : 0;

    console.log('moveNext', activeIndex, (activeIndex + 1) % length);

    setTimeout(
      () => {
        this.setState({activeIndex: (activeIndex + 1) % length});
      },
      300
    );
  };
}
