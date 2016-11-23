const rutils = require('./requestUtils');
const Promiz = require('bluebird');
const _ = require('lodash');
const config = require('./config');
const assert = require('chai').assert;

describe('Tournament', () => {
  let accessToken;
  let refreshToken;

  before(done => {
    // getting authorization tokens is a two step process
    //
    // 1. Get token credentials
    // 2. Get access token from credentials
    rutils.authenticate(config.clientId, config.clientSecret)
      .then(credentials => {
        return rutils.authorize(credentials);
      })
      .then(auth => {
        accessToken = auth.accessToken;
        refreshToken = auth.refreshToken;
        console.log('\naccessToken:\n\n' + accessToken + '\n');
        done();
      })
      .catch(done);
  });

  it('creates a tournament', done => {
    const payload = {
      version: '1',
      kind: 'partner-tournament',
      title: 'Example Partner Tournament',
      description: 'abc tournament',
      admins: [
        {authId: 'playerino1', authProvider: 'twitch'},
        {authId: 'playerino2', authProvider: 'twitch'}
      ]
    };

    rutils
      .securePost('/__api/bounties/partner', payload, accessToken)
      .then(res => res.json())
      .then((res) => {
        const tournament = res.body;
        assert.equal(tournament.status, 'ready');
        assert(Number(tournament.id) > 0);
        done();
      })
      .catch(done);
  });

  it('get tournament data as JSONP for browser', function(done) {
    const payload = {
      version: '1',
      kind: 'partner-tournament',
      title: 'JSONP Tournament',
      description: 'jsonp tournament',
      admins: [
        {authId: 'playerino1', authProvider: 'twitch'},
      ]
    };

    rutils
      // create tournament
      .securePost('/__api/bounties/partner', payload, accessToken)
      .then(res => res.json())
      .then((res) => {
        const tournament  = res.body;
        const id = Number(tournament.id);
        assert(id > 0);
        return id;
      })

      // get tournament JSON data (not browser, server only)
      .then((id) => {
        return rutils.secureGet(`/__api/bounties?id=${id}`, accessToken)
          .then(res => res.json())
          .then(data => {
            console.log('\nTo view tournament: ' + config.apiHost + '/b/' + id + '\n');
            return {id, data};
          });
      })

      // get browser safe JSONP data (browser safe, cross-site)
      .then((obj) => {
        return rutils.secureGet(`/__api/bounties?id=${obj.id}&callback=foo`, accessToken)
          .then(res => res.text())
          .then(text => {
            assert.equal(text, 'foo(' + JSON.stringify(obj.data) + ')')
            done();
          });
      })
      .catch(done);
  });
});
