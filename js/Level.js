import { GAME_CONFIG } from './config.js';

export class Level {
  constructor(scene) {
    this.scene = scene;
    this.platforms = null;
    this.hazards = null;
    this.stars = null;
    this.flag = null;
  }

  create() {
    this.createPlatforms();
    this.createHazards();
    this.createCollectibles();
    this.createGoal();
  }

  createPlatforms() {
    this.platforms = this.scene.physics.add.staticGroup();

    const groundY = GAME_CONFIG.height - 24;
    const groundPositions = [100, 196, 292, 388, 484, 580, 676, 772, 868];

    groundPositions.forEach(x => {
      this.addStaticElement('groundTex', x, groundY, this.platforms);
    });

    // Floating platforms
    const platformData = [
      { x: 200, y: 420 },
      { x: 360, y: 360 },
      { x: 530, y: 300 },
      { x: 700, y: 260 },
      { x: 820, y: 220 }
    ];

    platformData.forEach(platform => {
      this.addStaticElement('platformTex', platform.x, platform.y, this.platforms);
    });
  }

  createHazards() {
    this.hazards = this.scene.physics.add.staticGroup();
    const groundY = GAME_CONFIG.height - 24;

    const hazardPositions = [330, 360, 390];
    hazardPositions.forEach(x => {
      this.addStaticElement('hazardTex', x, groundY - 12, this.hazards);
    });
  }

  createCollectibles() {
    this.stars = this.scene.physics.add.group({
      allowGravity: false,
      immovable: true
    });

    const starPositions = [
      { x: 360, y: 320 },
      { x: 530, y: 260 },
      { x: 700, y: 220 }
    ];

    starPositions.forEach(star => {
      const starImage = this.scene.physics.add.image(star.x, star.y, 'starTex');
      starImage.body.setAllowGravity(false);
      this.stars.add(starImage);
    });
  }

  createGoal() {
    this.flag = this.scene.physics.add.staticImage(900, 188, 'flagTex');
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

  getStars() {
    return this.stars;
  }

  getFlag() {
    return this.flag;
  }
}