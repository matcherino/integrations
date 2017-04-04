import {Motion, spring} from 'react-motion';
import React, {Component} from 'react';

import MotionLoop from '../MotionLoop';

const MetGoal = ({cx, cy}) => (
  <circle cx={cx} cy={cy} r={8} stroke="#FF851B" strokeWidth="2" fill="#FF851B" />
);

const viewBoxHeight = 100;
const viewBoxWidth = 1000;
const centerY = viewBoxHeight / 2;

class NextGoal extends Component {
  state = {index: 0};

  render() {
    const {cx, cy, goal} = this.props;
    const {index} = this.state;
    console.log('NextGoal:render', index);
    return (
      <MotionLoop
        styleFrom={{r: spring(8, {stiffness: 120, damping: 5})}}
        styleTo={{r: spring(18, {stiffness: 120, damping: 5})}}
      >
        {motion => (
          <g>
            <text
              textAnchor="middle"
              x={cx}
              y={cy - motion.r - 8}
              fill="#FF851B"
              fontSize={motion.r * 1.2}
            >
              {goal.goal / 100}
            </text>
            <circle cx={cx} cy={cy} {...motion} stroke="#FF851B" strokeWidth="4" fill="white" />
          </g>
        )}
      </MotionLoop>
    );
  }
}

const FutureGoal = ({cx, cy}) => (
  <circle cx={cx} cy={cy} r={8} stroke="#999" strokeWidth="2" fill="#999" />
);

const strokeWidth = 3;

function calcXY(percent) {
  return {x: percent * viewBoxWidth, y: centerY};
}

export default class Bar extends Component {
  renderNextGoal(data) {
    if (!data.nextGoal) return null;

    const {nextGoal} = data;
    const coord = calcXY(nextGoal.goal / data.goal);
    return <NextGoal key={nextGoal.id} cx={coord.x} cy={coord.y} goal={data.nextGoal} />;
  }

  renderMetGoals(data) {
    if (!data.metGoals) return null;

    return data.metGoals.map(goal => {
      const coord = calcXY(goal.goal / data.goal);
      return <MetGoal key={goal.id} cx={coord.x} cy={coord.y} />;
    });
  }

  renderFutureGoals(data) {
    if (!data.futureGoals) return null;

    return data.futureGoals.map(goal => {
      const coord = calcXY(goal.goal / data.goal);
      return <FutureGoal key={goal.id} cx={coord.x} cy={coord.y} />;
    });
  }

  render() {
    // viewBox constrains the drawing primitives
    // width and height can scale the viewbox
    const {data} = this.props;
    if (!data) return null;
    console.log('RENDER bar', this.props);

    const fundPercent = data.goal ? data.balance / data.goal : 0;

    const progressX = Math.floor(fundPercent * viewBoxWidth);
    console.log('progressX', fundPercent, progressX);

    return (
      <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} version="1.1">
        {/* total line */}
        <line
          strokeLinecap="round"
          x1={strokeWidth}
          y1={centerY}
          x2={viewBoxWidth - strokeWidth}
          y2={centerY}
          stroke="#999"
          strokeWidth={strokeWidth}
        />

        {/* progress line */}
        {progressX &&
          <line
            strokeLinecap="round"
            x1={strokeWidth}
            y1={centerY}
            x2={progressX}
            y2={centerY}
            stroke="#FF851B"
            strokeWidth={strokeWidth * 2}
          />}

        {this.renderMetGoals(data)}
        {this.renderNextGoal(data)}
        {this.renderFutureGoals(data)}
      </svg>
    );
  }
}
