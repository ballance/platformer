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
    movingPlatforms: [], // No moving platforms in level 1
    hazards: [
      { x: 330, y: GAME_CONFIG.height - 24 - 12 },
      { x: 360, y: GAME_CONFIG.height - 24 - 12 },
      { x: 390, y: GAME_CONFIG.height - 24 - 12 },
    ],
    stars: [
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
    movingPlatforms: [], // No moving platforms in level 2
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
    stars: [
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
    movingPlatforms: [], // No moving platforms in level 3
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
    stars: [
      { x: 340, y: 310 },
      { x: 520, y: 310 },
      { x: 740, y: 240 },
      { x: 900, y: 140 },
    ],
    flag: { x: 920, y: GAME_CONFIG.height - 24 - 188 },
  },
  4: {
    playerStart: { x: 80, y: GAME_CONFIG.height - 24 - 80 },
    ground: [100, 196, 868], // Minimal ground tiles, focus on moving platforms
    platforms: [
      { x: 250, y: 460 }, // First static platform - lowered to be reachable
      { x: 750, y: 400 }, // Platform near the end
      { x: 850, y: 320 }, // Platform before flag
    ],
    movingPlatforms: [
      {
        x: 350,
        y: 440,
        moveType: "horizontal",
        range: 100,
        speed: 60
      },
      {
        x: 500,
        y: 400,
        moveType: "vertical",
        range: 80,
        speed: 50
      },
      {
        x: 620,
        y: 360,
        moveType: "horizontal",
        range: 120,
        speed: 70
      },
      {
        x: 400,
        y: 300,
        moveType: "circular",
        radius: 60,
        speed: 0.02
      },
      {
        x: 550,
        y: 250,
        moveType: "vertical",
        range: 100,
        speed: 45
      },
    ],
    hazards: [
      // Large lava pits requiring moving platforms to cross
      { x: 292, y: GAME_CONFIG.height - 24 - 12 },
      { x: 324, y: GAME_CONFIG.height - 24 - 12 },
      { x: 356, y: GAME_CONFIG.height - 24 - 12 },
      { x: 388, y: GAME_CONFIG.height - 24 - 12 },
      { x: 420, y: GAME_CONFIG.height - 24 - 12 },
      { x: 452, y: GAME_CONFIG.height - 24 - 12 },
      { x: 484, y: GAME_CONFIG.height - 24 - 12 },
      { x: 516, y: GAME_CONFIG.height - 24 - 12 },
      { x: 548, y: GAME_CONFIG.height - 24 - 12 },
      { x: 580, y: GAME_CONFIG.height - 24 - 12 },
      { x: 612, y: GAME_CONFIG.height - 24 - 12 },
      { x: 644, y: GAME_CONFIG.height - 24 - 12 },
      { x: 676, y: GAME_CONFIG.height - 24 - 12 },
      { x: 708, y: GAME_CONFIG.height - 24 - 12 },
      { x: 740, y: GAME_CONFIG.height - 24 - 12 },
      { x: 772, y: GAME_CONFIG.height - 24 - 12 },
      { x: 804, y: GAME_CONFIG.height - 24 - 12 },
      { x: 836, y: GAME_CONFIG.height - 24 - 12 },
    ],
    stars: [
      { x: 350, y: 400 }, // On first moving platform
      { x: 500, y: 330 }, // On vertical moving platform
      { x: 620, y: 320 }, // On horizontal moving platform
      { x: 400, y: 240 }, // Center of circular platform path
      { x: 850, y: 280 }, // Near the flag
    ],
    flag: { x: 920, y: GAME_CONFIG.height - 24 - 188 },
  },
};

export class Level {
  constructor(scene, levelNumber = 1) {
    this.scene = scene;
    this.levelNumber = levelNumber;
    this.platforms = null;
    this.movingPlatforms = null;
    this.hazards = null;
    this.stars = null;
    this.flag = null;
    this.levelData = LEVEL_DATA[levelNumber];
  }

  create() {
    this.createPlatforms();
    this.createMovingPlatforms();
    this.createHazards();
    this.createCollectibles();
    this.createGoal();
  }

  clear() {
    if (this.platforms) this.platforms.clear(true, true);
    if (this.movingPlatforms) this.movingPlatforms.clear(true, true);
    if (this.hazards) this.hazards.clear(true, true);
    if (this.stars) this.stars.clear(true, true);
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

  createMovingPlatforms() {
    this.movingPlatforms = this.scene.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    if (this.levelData.movingPlatforms) {
      this.levelData.movingPlatforms.forEach((platformData) => {
        const platform = this.scene.physics.add.image(
          platformData.x,
          platformData.y,
          "platformTex"
        );

        platform.body.setAllowGravity(false);
        platform.body.setImmovable(true);
        platform.body.setVelocity(0, 0);

        // Store movement properties on the platform
        platform.moveType = platformData.moveType;
        platform.startX = platformData.x;
        platform.startY = platformData.y;
        platform.range = platformData.range;
        platform.speed = platformData.speed;
        platform.radius = platformData.radius;
        platform.angle = 0; // For circular movement
        platform.direction = 1; // For linear movement

        this.movingPlatforms.add(platform);
      });
    }
  }

  createHazards() {
    this.hazards = this.scene.physics.add.staticGroup();

    this.levelData.hazards.forEach((hazard) => {
      this.addStaticElement("hazardTex", hazard.x, hazard.y, this.hazards);
    });
  }

  createCollectibles() {
    this.stars = this.scene.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    this.levelData.stars.forEach((star) => {
      const starImage = this.scene.physics.add.image(star.x, star.y, "starTex");
      starImage.body.setAllowGravity(false);
      // Store the star image for rotation updates
      starImage.rotationSpeed = 2; // Degrees per frame
      this.stars.add(starImage);
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

  getMovingPlatforms() {
    return this.movingPlatforms;
  }

  getHazards() {
    return this.hazards;
  }

  getStars() {
    return this.stars;
  }

  getFlag() {
    return this.flag;
  }

  update() {
    // Rotate all stars
    if (this.stars) {
      this.stars.children.entries.forEach((star) => {
        if (star.active) {
          star.rotation += Phaser.Math.DegToRad(star.rotationSpeed);
        }
      });
    }

    // Update moving platforms
    if (this.movingPlatforms) {
      this.movingPlatforms.children.entries.forEach((platform) => {
        if (platform.active) {
          this.updateMovingPlatform(platform);
        }
      });
    }
  }

  updateMovingPlatform(platform) {
    switch (platform.moveType) {
      case "horizontal":
        // Move platform left and right
        platform.x += platform.speed * platform.direction * (1/60); // Normalize for 60fps

        // Reverse direction at range limits
        if (Math.abs(platform.x - platform.startX) > platform.range) {
          platform.direction *= -1;
          platform.x = platform.startX + platform.range * platform.direction;
        }

        platform.body.setVelocityX(platform.speed * platform.direction);
        break;

      case "vertical":
        // Move platform up and down
        platform.y += platform.speed * platform.direction * (1/60);

        // Reverse direction at range limits
        if (Math.abs(platform.y - platform.startY) > platform.range) {
          platform.direction *= -1;
          platform.y = platform.startY + platform.range * platform.direction;
        }

        platform.body.setVelocityY(platform.speed * platform.direction);
        break;

      case "circular":
        // Move platform in a circle
        platform.angle += platform.speed;
        platform.x = platform.startX + Math.cos(platform.angle) * platform.radius;
        platform.y = platform.startY + Math.sin(platform.angle) * platform.radius;

        // Calculate velocity for physics body
        const nextAngle = platform.angle + platform.speed;
        const nextX = platform.startX + Math.cos(nextAngle) * platform.radius;
        const nextY = platform.startY + Math.sin(nextAngle) * platform.radius;
        platform.body.setVelocity((nextX - platform.x) * 60, (nextY - platform.y) * 60);
        break;
    }
  }
}
