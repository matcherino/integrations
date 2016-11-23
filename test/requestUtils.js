const fetch = require('node-fetch');
const config = require('./config');

function queryParams(params) {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
}

function absUrl(path, options) {
  const p = path[0] === '/' ? path : ('/' + path);
  if (options && options.queryParams) {
    const qs = queryParams(options.queryParams);
    if (qs) {
      p += '?' + qs;
    }
  }
  return config.apiHost + p;
}

function bearerToken(accessToken) {
  return 'Bearer ' + accessToken;
}

function get(path, options) {
  const opts = Object.assign({method: 'GET'}, options);
  const url = absUrl(path, options);
  return fetch(url, options);
};
exports.get = get;

function post(path, body) {
  const url = absUrl(path);
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body)
  });
};
exports.post = post;

exports.secureGet = (path, accessToken) => {
  const url = absUrl(path);
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: bearerToken(accessToken)
    }
  });
};

exports.securePost = (path, body, accessToken) => {
  const url = absUrl(path);
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: bearerToken(accessToken)
    }
  });
};


/**
 * Gets a refresh token using client_id and client_secret. A refresh token is later
 * exchanged for an access token.
 */
exports.authenticate = (clientId, clientSecret) => {
  const path = `/__api/auth/login?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;

  return get(path)
    .then(res => res.json())
    .then(res => {
      return res.body;
    })
    .catch(err => console.error(err));
}

/**
 * Exchanges a refresh token for an access token and a new refresh token.
 * The access token is short-lived for about 15 minutes. The refresh token is has
 * a much longer life and can be used to get a new access token. Access token 
 * are required to securely access Matcherino's API.
 */
exports.authorize = (credentials) => {
  const path = `/__api/auth/token`;

  return post(path, credentials)
    .then(res => res.json())
    .then(res => {
      return res.body;
    })
    .catch(err => console.error(err));
}
