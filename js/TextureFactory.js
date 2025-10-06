import { COLORS, SIZES } from "./config.js";

export class TextureFactory {
  constructor(scene) {
    this.scene = scene;
  }

  createAll() {
    this.createStickManStandingTexture(
      "playerTex",
      SIZES.player.width,
      SIZES.player.height,
    );
    this.createStickManRunningTexture(
      "playerRunTex",
      SIZES.player.width,
      SIZES.player.height,
    );
    this.createBlockTexture(
      "groundTex",
      SIZES.ground.width,
      SIZES.ground.height,
      COLORS.ground,
    );
    this.createBlockTexture(
      "platformTex",
      SIZES.platform.width,
      SIZES.platform.height,
      COLORS.platform,
    );
    this.createBlockTexture(
      "hazardTex",
      SIZES.hazard.width,
      SIZES.hazard.height,
      COLORS.hazard,
    );
    this.createFlagTexture(
      "flagTex",
      SIZES.flag.width,
      SIZES.flag.height,
      COLORS.flagPole,
      COLORS.flagBanner,
    );
    this.createCoinTexture("coinTex", SIZES.coin.size, COLORS.coin);
  }

  createBlockTexture(key, width, height, color) {
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(color, 1).fillRoundedRect(0, 0, width, height, 4);
    graphics
      .lineStyle(2, 0x000000, 0.15)
      .strokeRoundedRect(0, 0, width, height, 4);
    graphics.generateTexture(key, width, height);
    graphics.destroy();
  }

  createFlagTexture(key, width, height, poleColor, flagColor) {
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(poleColor, 1).fillRect(14, 0, 4, height);
    graphics.fillStyle(flagColor, 1).fillTriangle(18, 4, 18, 22, 32, 13);
    graphics.lineStyle(2, 0x000000, 0.15).strokeRect(14, 0, 4, height);
    graphics.generateTexture(key, width, height);
    graphics.destroy();
  }

  createCoinTexture(key, size, color) {
    const graphics = this.scene.add.graphics();

    const centerX = size;
    const centerY = size;

    // Fill the main coin circle with gold color
    graphics.fillStyle(color, 1);
    graphics.fillCircle(centerX, centerY, size);

    // Add a darker gold outer ring for depth
    graphics.lineStyle(2, 0xb8860b, 1);
    graphics.strokeCircle(centerX, centerY, size);

    // Add inner circle for coin effect
    graphics.lineStyle(1, 0xffed4e, 0.6);
    graphics.strokeCircle(centerX, centerY, size * 0.8);

    // Draw a simple dollar sign using lines
    graphics.lineStyle(3, 0xb8860b, 1);
    // Vertical line through S
    graphics.moveTo(centerX, centerY - size * 0.5);
    graphics.lineTo(centerX, centerY + size * 0.5);
    graphics.strokePath();

    // S curves (simplified)
    graphics.moveTo(centerX + size * 0.3, centerY - size * 0.2);
    graphics.lineTo(centerX - size * 0.3, centerY - size * 0.2);
    graphics.strokePath();

    graphics.moveTo(centerX - size * 0.3, centerY + size * 0.2);
    graphics.lineTo(centerX + size * 0.3, centerY + size * 0.2);
    graphics.strokePath();

    // Add shine effect (small highlight)
    graphics.fillStyle(0xffed4e, 0.3);
    graphics.fillCircle(centerX - size * 0.3, centerY - size * 0.3, size * 0.15);

    graphics.generateTexture(key, size * 2, size * 2);
    graphics.destroy();
  }

  createStickManStandingTexture(key, width, height) {
    const graphics = this.scene.add.graphics();

    // Skeleton colors
    const boneColor = 0xffffff;  // White/bone color
    const shadowColor = 0x888888;  // Gray for depth
    const lineWidth = 3;

    // Skull (larger than stick figure head)
    graphics.fillStyle(boneColor, 1);
    graphics.fillEllipse(24, 14, 20, 22);
    graphics.lineStyle(1, shadowColor, 0.5);
    graphics.strokeEllipse(24, 14, 20, 22);

    // Eye sockets (dark hollow circles)
    graphics.fillStyle(0x000000, 1);
    graphics.fillCircle(19, 12, 4);
    graphics.fillCircle(29, 12, 4);

    // Nasal cavity (small triangle)
    graphics.fillStyle(0x000000, 1);
    graphics.fillTriangle(24, 16, 22, 19, 26, 19);

    // Teeth/jaw
    graphics.lineStyle(1, 0x000000, 0.8);
    graphics.moveTo(18, 20);
    graphics.lineTo(30, 20);
    graphics.strokePath();
    // Individual teeth
    for (let i = 0; i < 4; i++) {
      graphics.moveTo(19 + i * 3, 20);
      graphics.lineTo(19 + i * 3, 22);
      graphics.strokePath();
    }

    // Spine (vertebrae)
    graphics.lineStyle(lineWidth, boneColor, 1);
    graphics.moveTo(24, 24);
    graphics.lineTo(24, 40);
    graphics.strokePath();

    // Add vertebrae notches
    graphics.lineStyle(1, shadowColor, 0.5);
    for (let i = 0; i < 3; i++) {
      graphics.strokeCircle(24, 28 + i * 4, 2);
    }

    // Ribcage
    graphics.lineStyle(2, boneColor, 1);
    // Left ribs
    graphics.moveTo(24, 28);
    graphics.lineTo(16, 30);
    graphics.strokePath();
    graphics.moveTo(24, 31);
    graphics.lineTo(17, 33);
    graphics.strokePath();
    graphics.moveTo(24, 34);
    graphics.lineTo(18, 35);
    graphics.strokePath();

    // Right ribs
    graphics.moveTo(24, 28);
    graphics.lineTo(32, 30);
    graphics.strokePath();
    graphics.moveTo(24, 31);
    graphics.lineTo(31, 33);
    graphics.strokePath();
    graphics.moveTo(24, 34);
    graphics.lineTo(30, 35);
    graphics.strokePath();

    // Arms (bones with joints)
    graphics.lineStyle(lineWidth, boneColor, 1);
    // Left arm
    graphics.moveTo(24, 28);
    graphics.lineTo(18, 32);
    graphics.strokePath();
    graphics.strokeCircle(18, 32, 2); // Elbow joint
    graphics.moveTo(18, 32);
    graphics.lineTo(12, 36);
    graphics.strokePath();
    graphics.strokeCircle(12, 36, 2); // Hand

    // Right arm
    graphics.moveTo(24, 28);
    graphics.lineTo(30, 32);
    graphics.strokePath();
    graphics.strokeCircle(30, 32, 2); // Elbow joint
    graphics.moveTo(30, 32);
    graphics.lineTo(36, 36);
    graphics.strokePath();
    graphics.strokeCircle(36, 36, 2); // Hand

    // Pelvis
    graphics.lineStyle(2, boneColor, 1);
    graphics.strokeEllipse(24, 40, 8, 4);

    // Legs (bones with joints)
    graphics.lineStyle(lineWidth, boneColor, 1);
    // Left leg
    graphics.moveTo(22, 40);
    graphics.lineTo(18, 46);
    graphics.strokePath();
    graphics.strokeCircle(18, 46, 2); // Knee joint
    graphics.moveTo(18, 46);
    graphics.lineTo(16, 52);
    graphics.strokePath();
    graphics.strokeCircle(16, 52, 2); // Foot

    // Right leg
    graphics.moveTo(26, 40);
    graphics.lineTo(30, 46);
    graphics.strokePath();
    graphics.strokeCircle(30, 46, 2); // Knee joint
    graphics.moveTo(30, 46);
    graphics.lineTo(32, 52);
    graphics.strokePath();
    graphics.strokeCircle(32, 52, 2); // Foot

    graphics.generateTexture(key, width, height);
    graphics.destroy();
  }

  createStickManRunningTexture(key, width, height) {
    const graphics = this.scene.add.graphics();

    // Skeleton colors
    const boneColor = 0xffffff;  // White/bone color
    const shadowColor = 0x888888;  // Gray for depth
    const lineWidth = 3;

    // Skull (positioned forward for running, slightly tilted)
    graphics.fillStyle(boneColor, 1);
    graphics.fillEllipse(28, 14, 20, 22);
    graphics.lineStyle(1, shadowColor, 0.5);
    graphics.strokeEllipse(28, 14, 20, 22);

    // Eye sockets (looking forward)
    graphics.fillStyle(0x000000, 1);
    graphics.fillCircle(26, 12, 4);
    graphics.fillCircle(34, 12, 4);

    // Nasal cavity
    graphics.fillStyle(0x000000, 1);
    graphics.fillTriangle(30, 16, 28, 19, 32, 19);

    // Gritted teeth (determined expression)
    graphics.lineStyle(1, 0x000000, 0.8);
    graphics.moveTo(24, 20);
    graphics.lineTo(36, 20);
    graphics.strokePath();
    // Clenched teeth
    for (let i = 0; i < 4; i++) {
      graphics.moveTo(25 + i * 3, 20);
      graphics.lineTo(25 + i * 3, 22);
      graphics.strokePath();
    }

    // Spine (diagonal, leaning forward)
    graphics.lineStyle(lineWidth, boneColor, 1);
    graphics.moveTo(26, 24);
    graphics.lineTo(20, 40);
    graphics.strokePath();

    // Add vertebrae notches along diagonal spine
    graphics.lineStyle(1, shadowColor, 0.5);
    graphics.strokeCircle(25, 28, 2);
    graphics.strokeCircle(23, 32, 2);
    graphics.strokeCircle(21, 36, 2);

    // Ribcage (angled for running)
    graphics.lineStyle(2, boneColor, 1);
    // Left ribs
    graphics.moveTo(25, 28);
    graphics.lineTo(17, 29);
    graphics.strokePath();
    graphics.moveTo(24, 31);
    graphics.lineTo(16, 32);
    graphics.strokePath();
    graphics.moveTo(23, 34);
    graphics.lineTo(16, 35);
    graphics.strokePath();

    // Right ribs
    graphics.moveTo(25, 28);
    graphics.lineTo(33, 29);
    graphics.strokePath();
    graphics.moveTo(24, 31);
    graphics.lineTo(32, 32);
    graphics.strokePath();
    graphics.moveTo(23, 34);
    graphics.lineTo(31, 35);
    graphics.strokePath();

    // Arms in running position
    graphics.lineStyle(lineWidth, boneColor, 1);

    // Front arm (forward, bent)
    graphics.moveTo(24, 30);
    graphics.lineTo(32, 28);
    graphics.strokePath();
    graphics.strokeCircle(32, 28, 2); // Elbow joint
    graphics.moveTo(32, 28);
    graphics.lineTo(36, 24);
    graphics.strokePath();
    graphics.strokeCircle(36, 24, 2); // Fist

    // Back arm (backward, bent)
    graphics.moveTo(24, 30);
    graphics.lineTo(16, 34);
    graphics.strokePath();
    graphics.strokeCircle(16, 34, 2); // Elbow joint
    graphics.moveTo(16, 34);
    graphics.lineTo(14, 38);
    graphics.strokePath();
    graphics.strokeCircle(14, 38, 2); // Fist

    // Pelvis (tilted for running)
    graphics.lineStyle(2, boneColor, 1);
    graphics.strokeEllipse(20, 40, 8, 4);

    // Legs in running stride
    graphics.lineStyle(lineWidth, boneColor, 1);

    // Front leg (forward stride, bent knee)
    graphics.moveTo(22, 40);
    graphics.lineTo(26, 46);
    graphics.strokePath();
    graphics.strokeCircle(26, 46, 2); // Knee joint
    graphics.moveTo(26, 46);
    graphics.lineTo(30, 52);
    graphics.strokePath();
    graphics.strokeCircle(30, 52, 2); // Foot

    // Back leg (back stride, extended)
    graphics.moveTo(18, 40);
    graphics.lineTo(12, 46);
    graphics.strokePath();
    graphics.strokeCircle(12, 46, 2); // Knee joint
    graphics.moveTo(12, 46);
    graphics.lineTo(10, 52);
    graphics.strokePath();
    graphics.strokeCircle(10, 52, 2); // Foot

    // Motion lines for speed effect
    graphics.lineStyle(1, boneColor, 0.3);
    graphics.moveTo(15, 14);
    graphics.lineTo(8, 14);
    graphics.strokePath();
    graphics.moveTo(15, 30);
    graphics.lineTo(5, 30);
    graphics.strokePath();
    graphics.moveTo(15, 45);
    graphics.lineTo(6, 45);
    graphics.strokePath();

    graphics.generateTexture(key, width, height);
    graphics.destroy();
  }

  generateStarPoints(centerX, centerY, outerRadius, innerRadius, spikes) {
    const points = [];
    let rotation = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;

    for (let i = 0; i < spikes; i++) {
      // Outer point
      let x = centerX + Math.cos(rotation) * outerRadius;
      let y = centerY + Math.sin(rotation) * outerRadius;
      points.push(x, y);
      rotation += step;

      // Inner point
      x = centerX + Math.cos(rotation) * innerRadius;
      y = centerY + Math.sin(rotation) * innerRadius;
      points.push(x, y);
      rotation += step;
    }

    return points;
  }
}
