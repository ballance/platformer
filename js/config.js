// Game configuration constants
export const GAME_CONFIG = {
  width: 960,
  height: 540,
  // backgroundColor: "#0e1117",
  // backgroundColor: "#87CEEB",
  backgroundColor: "#1a0033",  // Halloween dark purple night sky
  physics: {
    gravity: 850,
    playerBounce: 0.05,
  },
};

export const COLORS = {
  player: 0x0c0c0c,
  ground: 0x2a1a4e,      // Dark purple ground
  platform: 0xff6600,    // Halloween orange platforms
  hazard: 0x8b0000,      // Dark red for lava
  flagPole: 0x4a4a4a,    // Gray pole
  flagBanner: 0xffa500,  // Orange banner
  coin: 0xffd700,        // Keep gold coins
};

export const SIZES = {
  player: { width: 48, height: 56 },
  ground: { width: 96, height: 24 },
  platform: { width: 72, height: 18 },
  hazard: { width: 32, height: 16 },
  flag: { width: 32, height: 375 },
  coin: { size: 15 },
};

export const MOVEMENT = {
  speed: 200,
  jumpVelocity: -420,
};

export const SCORING = {
  coin: 10,
  win: 50,
};
