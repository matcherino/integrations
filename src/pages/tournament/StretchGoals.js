import React from 'react';
import Pane from './Pane';
import {centsToCurrency} from '../../common/format';

/**
 * goal = {
 *  desc: string,
 *  goal: number      // in cents
 * }
 *
 * balance: number    // in cents
 */
function Goal({goal, balance}) {
  let iconClasses = 'material-icons goal';

  if (isGoalMet(goal, balance)) {
    iconClasses += ' met';
  }

  return (
    <li className="mno-goal">
      <span>
        <i className={iconClasses}>check_circle</i>
      </span>
      <span>
        {centsToCurrency(goal.goal)}
      </span>
      <span>
        {goal.desc}
      </span>
    </li>
  );
}

function isGoalMet(goal, balance) {
  return goal.goal <= balance;
}

export default function StretchGoals({goals, balance}) {
  return (
      <Pane title="STRETCH GOALS">
        <ul className="mno-list">
          {goals.map((goal, i) => <Goal goal={goal} balance={balance} key={i} />)}
        </ul>
      </Pane>
  );
}
