import React from 'react';
import {Cell, Grid} from 'react-mdl';
import Pane from './Pane';
import Payouts from './Payouts';
import Rewards from './Rewards';
import StretchGoals from './StretchGoals';

export default function MatcherinoTab({match}) {
  return (
    <div className="mno-tab">
      <Grid>
        <Cell col={8}><Details match={match} /></Cell>
        <Cell col={4}><Sidebar match={match} /></Cell>
      </Grid>
    </div>
  );
}

function Details({match}) {
  // match.description is sanitized on the Matcherino server and
  // only allows basic tags and whitelisted attributes
  return (
    <Pane className="details" title="DETAILS">
      <div dangerouslySetInnerHTML={ {__html: match.description} }/>
    </Pane>
  );
}

function Sidebar({match}) {
  const {payouts, rewards, meta, balance} = match;
  const {stretchGoals} = meta;

  return (
    <div>
      <StretchGoals goals={stretchGoals} balance={balance} />
      <Payouts payouts={payouts} />
      <Rewards rewards={rewards} />
    </div>
  );
}

