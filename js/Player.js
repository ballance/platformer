import { GAME_CONFIG, MOVEMENT } from "./config.js";

export class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = null;
    this.cursors = null;
    this.alternateKeys = {};
    this.startX = x;
    this.startY = y;
    this.isDancing = false;
    this.danceKey = null;
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

    // Add dance key
    this.danceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
  }

  update() {
    this.handleDance();

    // Don't handle normal movement if dancing
    if (!this.isDancing) {
      this.handleMovement();
      this.handleJump();
    } else {
      // Update celebration text position to follow the player
      if (this.celebrationText) {
        this.celebrationText.x = this.sprite.x;
      }
    }
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

  handleDance() {
    // Start dancing when Q is pressed (only if not already dancing)
    if (Phaser.Input.Keyboard.JustDown(this.danceKey) && !this.isDancing) {
      this.startDance();
    }
  }

  startDance() {
    this.isDancing = true;
    const onGround = this.sprite.body.blocked.down;

    // Stop horizontal movement
    this.sprite.setVelocityX(0);

    // Create a fun dance animation with tweens
    // First, create a spinning jump effect
    if (onGround) {
      this.sprite.setVelocityY(-300); // Small jump
    }

    // Add rotation tween - 2 full spins (720 degrees)
    this.danceTween = this.scene.tweens.add({
      targets: this.sprite,
      angle: 720,
      duration: 1600,
      repeat: 0,
      ease: 'Linear',
      onComplete: () => {
        this.stopDance();
      }
    });

    // Add scale pulsing effect - matches dance duration
    this.scaleTween = this.scene.tweens.add({
      targets: this.sprite,
      scaleX: { from: 1, to: 1.2 },
      scaleY: { from: 1, to: 0.8 },
      duration: 200,
      yoyo: true,
      repeat: 7, // 8 pulses total during 1600ms
      ease: 'Sine.inOut'
    });

    // Add color tinting effect - stops after dance duration
    this.colorInterval = this.scene.time.addEvent({
      delay: 100,
      callback: () => {
        const colors = [0xffff00, 0xff00ff, 0x00ffff, 0xff0000, 0x00ff00, 0x0000ff];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.sprite.setTint(randomColor);
      },
      repeat: 15 // 16 color changes during 1600ms
    });

    // Add celebration text
    this.celebrationText = this.scene.add.text(
      this.sprite.x,
      this.sprite.y - 60,
      '🎉 PARTY TIME! 🎉',
      {
        fontSize: '24px',
        fontStyle: 'bold',
        color: '#ffff00',
        stroke: '#ff00ff',
        strokeThickness: 3
      }
    );
    this.celebrationText.setOrigin(0.5, 0.5);
    this.celebrationText.setDepth(100);

    // Make the text bob up and down - matches dance duration
    this.textTween = this.scene.tweens.add({
      targets: this.celebrationText,
      y: this.sprite.y - 80,
      duration: 400,
      yoyo: true,
      repeat: 3, // 4 bobs total during 1600ms
      ease: 'Sine.inOut'
    });
  }

  stopDance() {
    this.isDancing = false;

    // Stop all tweens
    if (this.danceTween) {
      this.danceTween.stop();
      this.danceTween = null;
    }
    if (this.scaleTween) {
      this.scaleTween.stop();
      this.scaleTween = null;
    }
    if (this.textTween) {
      this.textTween.stop();
      this.textTween = null;
    }

    // Remove color interval
    if (this.colorInterval) {
      this.colorInterval.destroy();
      this.colorInterval = null;
    }

    // Remove celebration text
    if (this.celebrationText) {
      this.celebrationText.destroy();
      this.celebrationText = null;
    }

    // Reset sprite properties
    this.sprite.setAngle(0);
    this.sprite.setScale(1, 1);
    this.sprite.clearTint();
    this.sprite.setTexture("playerTex");
  }

  respawn() {
    // Stop dancing if respawning
    if (this.isDancing) {
      this.stopDance();
    }

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
    // Stop dancing if stopping
    if (this.isDancing) {
      this.stopDance();
    }
    this.sprite.setVelocity(0, 0);
  }

  respawnAt(x, y) {
    // Stop dancing if respawning at new position
    if (this.isDancing) {
      this.stopDance();
    }

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
