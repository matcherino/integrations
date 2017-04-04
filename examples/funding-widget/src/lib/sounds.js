import config from '../config';

export function playAudio(kind) {
  const sound = config.sounds[kind];
  if (!sound || !config.enableSounds) return;

  var audio = new Audio(sound);
  audio.play();
}
