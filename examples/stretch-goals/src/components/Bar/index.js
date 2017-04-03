import Component from 'inferno-component';

const MetGoal = ({cx, cy}) => (
  <circle cx={cx} cy={cy} r={8} stroke="#FF851B" strokeWidth="2" fill="#FF851B" />
);

const NextGoal = ({cx, cy}) => (
  <circle cx={cx} cy={cy} r={10} stroke="#FF851B" strokeWidth="4" fill="white" />
);

const FutureGoal = ({cx, cy}) => (
  <circle cx={cx} cy={cy} r={8} stroke="#999" strokeWidth="2" fill="#999" />
);

const viewBoxWidth = 1000;
const strokeWidth = 3;
const fixedY = 20; //strokeWidth / 2;

function calcXY(percent) {
  return {x: percent * viewBoxWidth, y: fixedY};
}

export default class Bar extends Component {
  renderNextGoal(data) {
    if (!data.nextGoal) return null;

    const {nextGoal} = data;
    const coord = calcXY(nextGoal.goal / data.goal);
    return <NextGoal cx={coord.x} cy={coord.y} />;
  }

  renderMetGoals(data) {
    if (!data.metGoals) return null;

    return data.metGoals.map(goal => {
      const coord = calcXY(goal.goal / data.goal);
      return <MetGoal cx={coord.x} cy={coord.y} />;
    });
  }

  renderFutureGoals(data) {
    if (!data.futureGoals) return null;

    return data.futureGoals.map(goal => {
      const coord = calcXY(goal.goal / data.goal);
      return <FutureGoal cx={coord.x} cy={coord.y} />;
    });
  }

  render(props) {
    // viewBox constrains the drawing primitives
    // width and height can scale the viewbox
    const {data} = props;
    if (!data) return null;
    console.log('RENDER bar', props, this.props);

    const fundPercent = data.goal ? data.balance / data.goal : 0;

    const progressX = Math.floor(fundPercent * viewBoxWidth);
    console.log('progressX', fundPercent, progressX);

    return (
      <svg viewBox="0 0 1000 100" version="1.1">
        {/* total line */}
        <line
          stroke-linecap="round"
          x1={strokeWidth}
          y1={fixedY}
          x2={viewBoxWidth - strokeWidth}
          y2={fixedY}
          stroke="#999"
          strokeWidth={strokeWidth}
        />

        {/* progress line */}
        {progressX &&
          <line
            stroke-linecap="round"
            x1={strokeWidth}
            y1={fixedY}
            x2={progressX}
            y2={fixedY}
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
