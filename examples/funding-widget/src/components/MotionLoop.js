import {Motion} from 'react-motion';
import React from 'react';

export default class MotionLoop extends React.Component {
  state = {flag: true};

  propTypes: {
    styleFrom: React.PropTypes.object.isRequired,
    styleTo: React.PropTypes.object.isRequired
  };

  componentWillUnmount() {
    cancelAnimationFrame(this.raf);
  }

  onRest = () => {
    this.raf = requestAnimationFrame(() => this.setState({flag: !this.state.flag}));
  };

  render() {
    const {styleFrom, styleTo, ...props} = this.props;
    const {flag} = this.state;
    const defaultStyle = Object.keys(styleFrom).reduce(
      (result, key) => ({
        ...result,
        [key]: typeof styleFrom[key] === 'object' ? styleFrom[key].val : styleFrom[key]
      }),
      {}
    );
    const style = flag ? styleTo : styleFrom;

    return <Motion defaultStyle={defaultStyle} onRest={this.onRest} style={style} {...props} />;
  }
}
