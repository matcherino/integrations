const second = 1000;

function publicUrl(path) {
  return path.replace('PUBLIC_URL', process.env.PUBLIC_URL);
}

export default {
  domain: 'staging.matcherino.com',
  eventId: 5724,
  // do not set interval less than 30 seconds (30000), or you will get banned
  pollSeconds: 10 * second,

  sounds: {
    coupon: publicUrl('PUBLIC_URL/audio/342759__rhodesmas__score-counter-01.wav'),
    donation: publicUrl('PUBLIC_URL/342759__rhodesmas__score-counter-01.wav'),
    goal: publicUrl('PUBLIC_URL/320672__rhodesmas__win-01.wav')
  },

  enableSounds: false,

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
