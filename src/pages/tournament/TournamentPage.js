import React from 'react';
import {Button, Content, Header, HeaderRow, HeaderTabs, Layout, ProgressBar, Tab} from 'react-mdl';
import MatcherinoTab from './MatcherinoTab';
import PlaceholderTab from './PlaceholderTab';
import {centsToCurrency} from '../../common/format';

import './styles.css';

const _tabs = [
  {title: 'OVERVIEW'},
  {title: 'PRIZES'},
  {title: 'MATCHERINO', component: MatcherinoTab},
  {title: 'SETUP & MATCHUPS'},
];

export default class TournamentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTabId: 2
    };
  }

  render() {
    const {activeTabId} = this.state;
    const {match} = this.props;
    const goalPercentage =  Math.floor(match.balance / match.goal * 100);

    return (
      <Layout fixedHeader fixedTabs>
        <Header>
          <HeaderRow title={match.title}>
            <Button raised accent>Donate</Button>
          </HeaderRow>
          <HeaderRow className="mno-progress">
            <ProgressBar progress={goalPercentage} />
            <span>
              {centsToCurrency(match.balance)} of {centsToCurrency(match.meta.goal)}
            </span>
          </HeaderRow>
          <Tabs activeTabId={activeTabId} onChange={this.doChangeTab()} />
        </Header>
        <Content>
          <ActiveTabContent activeTabId={activeTabId} match={match} />
        </Content>
      </Layout>
    );
  }

  doChangeTab() {
    return (tabId) => {
      this.setState({activeTabId: tabId});
    };
  }
}

function ActiveTabContent({activeTabId, match}) {
  let TabComponent = _tabs[activeTabId].component;
  if (!TabComponent) {
    TabComponent = PlaceholderTab;
  }
  return <TabComponent match={match} />;
}

function Tabs({activeTabId, onChange}) {
  return (
    <HeaderTabs activeTab={activeTabId} onChange={onChange} ripple>
      {_tabs.map((tab, i) => <Tab key={i}>{tab.title}</Tab>)}
    </HeaderTabs>
  );
}
