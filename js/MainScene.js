import { GAME_CONFIG } from './config.js';
import { TextureFactory } from './TextureFactory.js';
import { Level } from './Level.js';
import { Player } from './Player.js';
import { UIManager } from './UIManager.js';

export class MainScene extends Phaser.Scene {
  constructor() {
    super('main');
    this.textureFactory = null;
    this.level = null;
    this.player = null;
    this.uiManager = null;
    this.currentLevel = 1;
  }

  preload() {
    this.textureFactory = new TextureFactory(this);
    this.textureFactory.createAll();
  }

  create() {
    this.cameras.main.setBackgroundColor(GAME_CONFIG.backgroundColor);
    this.physics.world.setBounds(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);

    // Initialize managers
    this.level = new Level(this, this.currentLevel);
    const startPos = this.level.getPlayerStartPosition();
    this.player = new Player(this, startPos.x, startPos.y);
    this.uiManager = new UIManager(this);

    // Create game objects
    this.level.create();
    this.player.create();
    this.uiManager.create();
    this.uiManager.updateLevel(this.currentLevel);

    // Set up collisions and interactions
    this.setupCollisions();
  }

  update() {
    this.player.update();
  }

  setupCollisions() {
    // Player collisions with platforms
    this.physics.add.collider(this.player.getSprite(), this.level.getPlatforms());

    // Star collection
    this.physics.add.overlap(
      this.player.getSprite(),
      this.level.getStars(),
      this.collectStar.bind(this)
    );

    // Hazard collision
    this.physics.add.overlap(
      this.player.getSprite(),
      this.level.getHazards(),
      this.hitHazard.bind(this)
    );

    // Win condition
    this.physics.add.overlap(
      this.player.getSprite(),
      this.level.getFlag(),
      this.reachGoal.bind(this)
    );
  }

  collectStar(playerSprite, star) {
    star.disableBody(true, true);
    this.uiManager.showStarCollected();
  }

  hitHazard() {
    this.player.respawn();
  }

  reachGoal() {
    this.player.stop();

    if (this.currentLevel === 1) {
      // Show level complete and transition to level 2
      this.uiManager.showLevelComplete();

      this.time.delayedCall(2000, () => {
        this.loadLevel(2);
      });
    } else {
      // Game complete
      this.uiManager.showGameComplete();
    }
  }

  loadLevel(levelNumber) {
    this.currentLevel = levelNumber;

    // Clear current level
    this.level.clear();

    // Create new level
    this.level = new Level(this, this.currentLevel);
    this.level.create();

    // Reset player position
    const startPos = this.level.getPlayerStartPosition();
    this.player.respawnAt(startPos.x, startPos.y);

    // Update UI
    this.uiManager.updateLevel(this.currentLevel);

    // Re-setup collisions
    this.setupCollisions();
  }
}