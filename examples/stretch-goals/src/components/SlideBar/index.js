import Component from 'inferno-component';
import EquilateralTriangle from '../EquilateralTriangle';

const MetGoal = ({x, y, height}) => (
  <line x1={x} y1={y} x2={x} y2={y + height} stroke="red" strokeDasharray="2,2" strokeWidth="1" />
);

const NextGoal = ({x, y, height}) => (
  <g>
    <line
      x1={x}
      y1={y}
      x2={x}
      y2={y + height}
      stroke="#2196F3"
      strokeDasharray="2,2"
      stroke-width="1"
    />
    <EquilateralTriangle
      cx={x}
      cy={y + height + 8}
      sideLength={20}
      stroke="#2196F3"
      stroke-width="2"
      fill="#FFF"
    />
  </g>
);

const FutureGoal = ({x, y, height}) => (
  <line x1={x} y1={y} x2={x} y2={y + height} stroke="#999" strokeDasharray="2,2" strokeWidth="1" />
);

const vbWidth = 1000;
const barHeight = 30;
const padding = 20;
const vbHeight = barHeight + 2 * padding;
const barTop = padding;
const strokeWidth = 1;
const lineMarkerOffset = 6;
const lineMarkerHeight = barHeight + 2 * lineMarkerOffset;
const lineMarkerTop = barTop - lineMarkerOffset;

function calcXY(percent) {
  return {x: percent * vbWidth, y: lineMarkerTop};
}

export default class SlideBar extends Component {
  renderNextGoal(data) {
    if (!data.nextGoal) return null;

    const {nextGoal} = data;
    const coord = calcXY(nextGoal.goal / data.goal);
    return <NextGoal x={coord.x} y={coord.y} height={lineMarkerHeight} />;
  }

  renderMetGoals(data) {
    if (!data.metGoals) return null;

    return data.metGoals.map(goal => {
      const coord = calcXY(goal.goal / data.goal);
      return <MetGoal x={coord.x} y={coord.y} height={lineMarkerHeight} />;
    });
  }

  renderFutureGoals(data) {
    if (!data.futureGoals) return null;

    return data.futureGoals.map(goal => {
      const coord = calcXY(goal.goal / data.goal);
      return <FutureGoal x={coord.x} y={coord.y} height={lineMarkerHeight} />;
    });
  }

  render(props) {
    // viewBox constrains the drawing primitives
    // width and height can scale the viewbox
    const {data} = props;
    if (!data) return null;
    console.log('RENDER bar', props, this.props);

    const fundPercent = data.goal ? data.balance / data.goal : 0;

    const progressX = Math.floor(fundPercent * vbWidth);
    console.log('progressX', fundPercent, progressX);

    return (
      <svg viewBox={`0 0 ${vbWidth} ${vbHeight}`} preserveAspectRatio="xMidYMid meet">
        {/* total line */}
        <rect
          x="0"
          y={barTop}
          width={vbWidth}
          height={barHeight}
          stroke="#999"
          fill="#EEE"
          strokeWidth={strokeWidth}
        />

        {/* progress */}
        <rect
          x={strokeWidth}
          y={barTop + strokeWidth}
          width={progressX - strokeWidth}
          height={barHeight - strokeWidth}
          fill="#FFC107"
        />

        {this.renderNextGoal(data)}
        {this.renderMetGoals(data)}
        {this.renderFutureGoals(data)}
      </svg>
    );
  }
}
