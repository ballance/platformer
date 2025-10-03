import { GAME_CONFIG, MOVEMENT } from "./config.js";

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
    this.sprite = this.scene.physics.add.image(
      this.startX,
      this.startY,
      "playerTex",
    );
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setBounce(GAME_CONFIG.physics.playerBounce);
    this.sprite.body.setGravityY(GAME_CONFIG.physics.gravity);
    this.sprite.body.setSize(36, 48).setOffset(6, 6);

    // Set up input
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.alternateKeys = {
      left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
    };
  }

  update() {
    this.handleMovement();
    this.handleJump();
  }

  handleMovement() {
    const movingLeft =
      this.cursors.left.isDown || this.alternateKeys.left.isDown;
    const movingRight =
      this.cursors.right.isDown || this.alternateKeys.right.isDown;

    if (movingLeft && !movingRight) {
      this.sprite.setVelocityX(-MOVEMENT.speed);
      this.sprite.setFlipX(true);  // Face left
      this.sprite.setTexture("playerRunTex"); // Use running texture
    } else if (movingRight && !movingLeft) {
      this.sprite.setVelocityX(MOVEMENT.speed);
      this.sprite.setFlipX(false); // Face right (default)
      this.sprite.setTexture("playerRunTex"); // Use running texture
    } else {
      this.sprite.setVelocityX(0);
      this.sprite.setTexture("playerTex"); // Use standing texture
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

    // Display LAVA!!! banner
    const lavaText = this.scene.add.text(
      this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY,
      'LAVA!!!',
      {
        fontSize: '72px',
        fontStyle: 'bold',
        color: '#ff0000',
        stroke: '#ffffff',
        strokeThickness: 6,
        shadow: {
          offsetX: 4,
          offsetY: 4,
          color: '#000000',
          blur: 8,
          fill: true
        }
      }
    );

    lavaText.setOrigin(0.5, 0.5);
    lavaText.setDepth(1000); // Make sure it appears on top

    // Animate the text
    this.scene.tweens.add({
      targets: lavaText,
      scaleX: 1.5,
      scaleY: 1.5,
      alpha: 0,
      duration: 800,
      ease: 'Power2',
      onComplete: () => {
        lavaText.destroy();
      }
    });
  }

  stop() {
    this.sprite.setVelocity(0, 0);
  }

  respawnAt(x, y) {
    this.startX = x;
    this.startY = y;
    this.sprite.setVelocity(0, 0);
    this.sprite.setPosition(x, y);
    this.sprite.setTexture("playerTex"); // Reset to standing texture
    this.sprite.setFlipX(false); // Face right by default
  }

  getSprite() {
    return this.sprite;
  }
}
