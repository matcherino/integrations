const second = 1000;

export default {
  domain: 'staging.matcherino.com',
  eventId: 5724,
  // do not set interval less than 30 seconds (30000), or you will get banned
  pollSeconds: 10 * second,
  customMessages: [
    {
      avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/mgutz-profile_image-cb812e33654044ae-300x300.png',
      comment: 'Check us out on matcherino.com'
    },
    {
      avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/mgutz-profile_image-cb812e33654044ae-300x300.png',
      comment: 'Shout out to mgutz'
    }
  ],
  donationThreshold: 5
};
