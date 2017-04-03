const second = 1000;

export default {
  domain: 'matcherino.lan',
  eventId: 5732,
  // do not set interval less than 30 seconds (30000), or you will get banned
  pollSeconds: 10 * second,
  customMessages: ['Check us out on matcherino.com', 'Shout out to mgutz']
};
