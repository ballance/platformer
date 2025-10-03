import { GAME_CONFIG, MOVEMENT } from './config.js';

export class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = null;
    this.cursors = null;
    this.alternateKeys = {};
    this.startX = x;
    this.startY = y;
  }

  create() {
    this.sprite = this.scene.physics.add.image(this.startX, this.startY, 'playerTex');
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setBounce(GAME_CONFIG.physics.playerBounce);
    this.sprite.body.setGravityY(GAME_CONFIG.physics.gravity);
    this.sprite.body.setSize(18, 24).setOffset(3, 3);

    // Set up input
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.alternateKeys = {
      left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    };
  }

  update() {
    this.handleMovement();
    this.handleJump();
  }

  handleMovement() {
    const movingLeft = this.cursors.left.isDown || this.alternateKeys.left.isDown;
    const movingRight = this.cursors.right.isDown || this.alternateKeys.right.isDown;

    if (movingLeft && !movingRight) {
      this.sprite.setVelocityX(-MOVEMENT.speed);
    } else if (movingRight && !movingLeft) {
      this.sprite.setVelocityX(MOVEMENT.speed);
    } else {
      this.sprite.setVelocityX(0);
    }
  }

  handleJump() {
    const onGround = this.sprite.body.blocked.down;
    const jumpPressed =
      Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
      Phaser.Input.Keyboard.JustDown(this.alternateKeys.up) ||
      Phaser.Input.Keyboard.JustDown(this.cursors.space);

    if (jumpPressed && onGround) {
      this.sprite.setVelocityY(MOVEMENT.jumpVelocity);
    }
  }

  respawn() {
    this.scene.cameras.main.flash(150, 255, 80, 80);
    this.sprite.setVelocity(0, 0);
    this.sprite.setPosition(this.startX, this.startY);
  }

  stop() {
    this.sprite.setVelocity(0, 0);
  }

  getSprite() {
    return this.sprite;
  }
}