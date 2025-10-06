import { GAME_CONFIG } from "./config.js";

const LEVEL_DATA = {
  1: {
    playerStart: { x: 80, y: GAME_CONFIG.height - 24 - 80 },
    ground: [100, 196, 292, 388, 484, 580, 676, 772, 868],
    platforms: [
      { x: 200, y: 420 },
      { x: 360, y: 360 },
      { x: 530, y: 300 },
      { x: 700, y: 260 },
      { x: 820, y: 220 },
    ],
    hazards: [
      { x: 330, y: GAME_CONFIG.height - 24 - 12 },
      { x: 360, y: GAME_CONFIG.height - 24 - 12 },
      { x: 390, y: GAME_CONFIG.height - 24 - 12 },
    ],
    coins: [
      { x: 360, y: 320 },
      { x: 530, y: 260 },
      { x: 700, y: 220 },
    ],
    flag: { x: 900, y: GAME_CONFIG.height - 24 - 188 },
  },
  2: {
    playerStart: { x: 80, y: GAME_CONFIG.height - 24 - 80 },
    ground: [100, 196, 580, 676, 772, 868], // Gaps for lava pits
    platforms: [
      { x: 250, y: 430 }, // Player can only jump 430, so the first platform can't be too high
      { x: 340, y: 350 },
      { x: 430, y: 300 }, // Bridge between pits
      { x: 520, y: 350 },
      { x: 630, y: 320 },
      { x: 740, y: 280 },
      { x: 850, y: 240 },
      { x: 900, y: 180 }, // Platform near flag
    ],
    hazards: [
      // First lava pit
      { x: 292, y: GAME_CONFIG.height - 24 - 12 },
      { x: 324, y: GAME_CONFIG.height - 24 - 12 },
      { x: 356, y: GAME_CONFIG.height - 24 - 12 },
      { x: 388, y: GAME_CONFIG.height - 24 - 12 },
      // Second lava pit
      { x: 484, y: GAME_CONFIG.height - 24 - 12 },
      { x: 516, y: GAME_CONFIG.height - 24 - 12 },
      { x: 548, y: GAME_CONFIG.height - 24 - 12 },
    ],
    coins: [
      { x: 340, y: 310 },
      { x: 520, y: 310 },
      { x: 740, y: 240 },
      { x: 900, y: 140 },
    ],
    flag: { x: 920, y: GAME_CONFIG.height - 24 - 188 },
  },
  3: {
    playerStart: { x: 80, y: GAME_CONFIG.height - 24 - 80 },
    ground: [100, 196, 580, 676, 772, 868], // Gaps for lava pits
    platforms: [
      { x: 250, y: 430 }, // Player can only jump 430, so the first platform can't be too high
      { x: 340, y: 350 },
      { x: 430, y: 300 }, // Bridge between pits
      { x: 520, y: 350 },
      { x: 630, y: 320 },
      { x: 740, y: 280 },
      { x: 850, y: 240 },
      { x: 900, y: 180 }, // Platform near flag
    ],
    hazards: [
      // First lava pit
      { x: 292, y: GAME_CONFIG.height - 24 - 12 },
      { x: 324, y: GAME_CONFIG.height - 24 - 12 },
      { x: 356, y: GAME_CONFIG.height - 24 - 12 },
      { x: 388, y: GAME_CONFIG.height - 24 - 12 },
      // Second lava pit
      { x: 484, y: GAME_CONFIG.height - 24 - 12 },
      { x: 516, y: GAME_CONFIG.height - 24 - 12 },
      { x: 548, y: GAME_CONFIG.height - 24 - 12 },
    ],
    coins: [
      { x: 340, y: 310 },
      { x: 520, y: 310 },
      { x: 740, y: 240 },
      { x: 900, y: 140 },
    ],
    flag: { x: 920, y: GAME_CONFIG.height - 24 - 188 },
  },
};

export class Level {
  constructor(scene, levelNumber = 1) {
    this.scene = scene;
    this.levelNumber = levelNumber;
    this.platforms = null;
    this.hazards = null;
    this.coins = null;
    this.flag = null;
    this.levelData = LEVEL_DATA[levelNumber];
  }

  create() {
    this.createPlatforms();
    this.createHazards();
    this.createCollectibles();
    this.createGoal();
  }

  clear() {
    if (this.platforms) this.platforms.clear(true, true);
    if (this.hazards) this.hazards.clear(true, true);
    if (this.coins) this.coins.clear(true, true);
    if (this.flag) this.flag.destroy();
  }

  createPlatforms() {
    this.platforms = this.scene.physics.add.staticGroup();

    const groundY = GAME_CONFIG.height - 24;

    this.levelData.ground.forEach((x) => {
      this.addStaticElement("groundTex", x, groundY, this.platforms);
    });

    // Floating platforms
    this.levelData.platforms.forEach((platform) => {
      this.addStaticElement(
        "platformTex",
        platform.x,
        platform.y,
        this.platforms,
      );
    });
  }

  createHazards() {
    this.hazards = this.scene.physics.add.staticGroup();

    this.levelData.hazards.forEach((hazard) => {
      this.addStaticElement("hazardTex", hazard.x, hazard.y, this.hazards);
    });
  }

  createCollectibles() {
    this.coins = this.scene.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    this.levelData.coins.forEach((coin) => {
      const coinImage = this.scene.physics.add.image(coin.x, coin.y, "coinTex");
      coinImage.body.setAllowGravity(false);
      // Store the coin image for rotation updates
      coinImage.rotationSpeed = 2; // Degrees per frame
      this.coins.add(coinImage);
    });
  }

  createGoal() {
    this.flag = this.scene.physics.add.staticImage(
      this.levelData.flag.x,
      this.levelData.flag.y,
      "flagTex",
    );
  }

  getPlayerStartPosition() {
    return this.levelData.playerStart;
  }

  addStaticElement(key, x, y, group) {
    const img = this.scene.physics.add.staticImage(x, y, key);
    group.add(img);
    return img;
  }

  addImage(key, x, y, group) {
    const img = this.scene.add.image(x, y, key);
    if (group) group.add(img);
    return img;
  }

  getPlatforms() {
    return this.platforms;
  }

  getHazards() {
    return this.hazards;
  }

  getCoins() {
    return this.coins;
  }

  getFlag() {
    return this.flag;
  }

  update() {
    // Rotate all coins
    if (this.coins) {
      this.coins.children.entries.forEach((coin) => {
        if (coin.active) {
          coin.rotation += Phaser.Math.DegToRad(coin.rotationSpeed);
        }
      });
    }
  }
}
