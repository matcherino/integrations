import config from '../config';
import sortBy from 'lodash/sortBy';
import {toNumber} from './common';

/*

returns

{
  "balance": 100,
  "goal": 1000000,
  "metGoals": [],
  "nextGoal": {
    "desc": "Will kick ass.",
    "goal": 1000,
    "id": "BkxTlSa2x",
    "title": "First Goal"
  },
  "futureGoals": [],
  "highestDonor": {
    "action": "donate",
    "amount": 100,
    "authProvider": "twitch",
    "avatar": "https://static-cdn.jtvnw.net/jtv_user_pictures/mgutz-profile_image-cb812e33654044ae-300x300.png",
    "comment": "my comment",
    "createdAt": "2017-04-01T15:45:11.977199Z",
    "displayName": "mgutz",
    "id": 1134,
    "userId": 1001,
    "userName": "mgutz"
  },
  "latestDonor": null,
  "customMessages": [
    "Check us out on matcherino.com",
    "Shout out to mgutz"
  ]
}

*/

export default function simplifyData(tournament) {
  const {balance} = tournament;
  const {meta} = tournament;
  const goal = meta.goal;

  const result = {
    balance, // actual funding balance
    goal, // desired funding goal
    metGoals: [], // stretch goals which have been met
    nextGoal: null,
    futureGoals: [],
    highestDonor: null,
    latestDonor: null
  };

  const stretchGoals = sortBy(meta.stretchGoals, 'goal');
  for (const sg of meta.stretchGoals) {
    if (sg.goal <= balance) {
      result.metGoals.push(sg);
    } else if (!result.nextGoal) {
      result.nextGoal = sg;
    } else {
      result.futureGoals.push(sg);
    }
  }

  let highestDonor;
  const transactions = sortBy(tournament.transactions, it => new Date(it.createdAt).getTime());
  for (const tn of transactions) {
    if (!highestDonor) highestDonor = tn;
    if (tn.amount > highestDonor.amount) {
      highestDonor = tn;
    }
  }

  result.highestDonor = highestDonor;
  result.latestDonor = transactions[transactions.length - 1];
  // do not repeat highest and latest
  if (result.latestDonor == result.highestDonor) {
    result.latestDonor = null;
  }

  result.customMessages = config.customMessages;
  return result;
}
