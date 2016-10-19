import React from 'react';
import Pane from './Pane';
import * as fmt from '../../common/format';

/**
 * Payouts have different strategies such as 'fixed' amount and
 * 'percentage' amounts.
 */
function strategyDescription(strategy, amount) {
  if (strategy === 'percentage') {
    return fmt.basisPointsToPercentage(amount);
  } else if (strategy === 'fixed') {
    return fmt.centsToCurrency(amount)
  }

  return 'Unknown';
}


function Item({payout}) {
  const {title, strategy} = payout;
  const description = strategyDescription(strategy, payout.payout);

  return (
    <li className="mno-payout">
      {title}
      <span>{description}</span>
    </li>
  );
}

export default function Payouts({payouts}) {
  return (
      <Pane title="PAYOUTS">
        <ul className="mno-list">
          {payouts.map((payout, i) => <Item payout={payout} key={i} />)}
        </ul>
      </Pane>
  );
}
