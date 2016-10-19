import React from 'react';
import Pane from './Pane';
import {Card, CardText, CardTitle} from 'react-mdl';

function Item({reward}) {
  return (
    <li>
      <Card shadow={0}>
        <CardTitle>{reward.title}</CardTitle>
        <CardText>{reward.sanitizedHtml}</CardText>
      </Card>
    </li>
  );
}

export default function Rewards({rewards}) {
  return (
      <Pane title="DONATION PACKS">
        <ul className="mno-list">
          {rewards.map((reward, i) => <Item reward={reward} key={i} />)}
        </ul>
      </Pane>
  );
}
