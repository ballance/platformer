// Game configuration constants
export const GAME_CONFIG = {
  width: 960,
  height: 540,
  backgroundColor: "#0e1117",
  physics: {
    gravity: 850,
    playerBounce: 0.05,
  },
};

export const COLORS = {
  player: 0x4fc3f7,
  ground: 0x6dd5b1,
  platform: 0xa3a1ff,
  hazard: 0xff6b6b,
  flagPole: 0xffe66d,
  flagBanner: 0xff9f1c,
  star: 0xffd166,
};

export const SIZES = {
  player: { width: 48, height: 56 },
  ground: { width: 96, height: 24 },
  platform: { width: 72, height: 18 },
  hazard: { width: 32, height: 16 },
  flag: { width: 32, height: 375 },
  star: { size: 18 },
};

export const MOVEMENT = {
  speed: 200,
  jumpVelocity: -420,
};

export const SCORING = {
  star: 10,
  win: 50,
};
