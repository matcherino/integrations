import config from '../config';

const endpoint = `https://${config.domain}/__api/bounties`;

const makeUrl = (id, cbName) => endpoint + `?id=${id}&callback=${cbName}`;

export function isNumber(v) {
  return !Array.isArray(v) && v - parseFloat(v) + 1 >= 0;
}

export function toNumber(v) {
  if (!isNumber(v)) {
    return 0;
  }

  return Number(v);
}

function scriptLoader(id, url) {
  return function() {
    const el = document.createElement('script');
    el.setAttribute('src', url);
    el.id = id;
    document.body.appendChild(el);
  };
}

export function getMatcherinoData(id, intervalMs, cb) {
  const callbackName = `__mno_jsonp_callback_${id}`;
  window[callbackName] = data => {
    // remove old script
    const el = document.getElementById(callbackName);
    document.body.removeChild(el);
    cb(data);
  };
  const url = makeUrl(id, callbackName);
  const addScript = scriptLoader(callbackName, url);
  addScript();
  setInterval(addScript, intervalMs);
}
