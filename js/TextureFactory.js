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
    this.createStarTexture("starTex", SIZES.star.size, COLORS.star);
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

  createStarTexture(key, size, color) {
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(color, 1);

    const centerX = size;
    const centerY = size;
    const points = this.generateStarPoints(
      centerX,
      centerY,
      size,
      size * 0.5,
      5,
    );

    graphics.fillPoints(points, true);
    // Add a white outline to make the star more visible
    graphics.lineStyle(3, 0xffffff, 0.8);
    graphics.strokePoints(points, true);
    graphics.generateTexture(key, size * 2, size * 2);
    graphics.destroy();
  }

  createStickManStandingTexture(key, width, height) {
    const graphics = this.scene.add.graphics();

    // Mario-style colors
    const skinColor = 0xfdbcb4;  // Peach skin color
    const hatColor = 0xff0000;    // Red hat
    const overallsColor = 0x0066cc;  // Blue overalls
    const shirtColor = 0xff0000;  // Red shirt
    const brownColor = 0x8b4513;  // Brown shoes
    const mustacheColor = 0x000000;  // Black mustache
    const whiteColor = 0xffffff;  // White gloves

    // Cap/Hat with "M" emblem
    graphics.fillStyle(hatColor, 1);
    graphics.fillRoundedRect(14, 6, 20, 10, 3);
    // Hat brim
    graphics.fillRect(12, 14, 24, 3);

    // White circle for M emblem
    graphics.fillStyle(whiteColor, 1);
    graphics.fillCircle(24, 11, 5);

    // Draw "M" on hat
    graphics.lineStyle(2, hatColor, 1);
    graphics.moveTo(20, 9);
    graphics.lineTo(20, 13);
    graphics.moveTo(20, 9);
    graphics.lineTo(22, 11);
    graphics.lineTo(24, 9);
    graphics.lineTo(26, 11);
    graphics.lineTo(28, 9);
    graphics.lineTo(28, 13);
    graphics.strokePath();

    // Face
    graphics.fillStyle(skinColor, 1);
    graphics.fillEllipse(24, 19, 16, 12);

    // Eyes (simple black dots)
    graphics.fillStyle(0x000000, 1);
    graphics.fillCircle(20, 18, 2);
    graphics.fillCircle(28, 18, 2);

    // Eye whites
    graphics.fillStyle(whiteColor, 1);
    graphics.fillCircle(20, 17, 1);
    graphics.fillCircle(28, 17, 1);

    // Mustache (thick and iconic)
    graphics.fillStyle(mustacheColor, 1);
    graphics.fillEllipse(24, 22, 10, 3);
    graphics.fillCircle(16, 22, 2);
    graphics.fillCircle(32, 22, 2);

    // Nose
    graphics.fillStyle(skinColor, 1);
    graphics.fillCircle(24, 20, 3);

    // Body - Red shirt
    graphics.fillStyle(shirtColor, 1);
    graphics.fillRect(18, 26, 12, 8);

    // Overall straps
    graphics.fillStyle(overallsColor, 1);
    graphics.fillRect(18, 26, 3, 8);
    graphics.fillRect(27, 26, 3, 8);

    // Overalls body
    graphics.fillRect(16, 34, 16, 8);

    // Overall buttons (gold/yellow)
    graphics.fillStyle(0xffd700, 1);
    graphics.fillCircle(20, 30, 1);
    graphics.fillCircle(28, 30, 1);

    // Arms with white gloves
    graphics.fillStyle(shirtColor, 1);
    // Left arm
    graphics.fillRect(12, 28, 6, 8);
    // Right arm
    graphics.fillRect(30, 28, 6, 8);

    // White gloves
    graphics.fillStyle(whiteColor, 1);
    graphics.fillCircle(12, 37, 3);
    graphics.fillCircle(36, 37, 3);

    // Legs
    graphics.fillStyle(overallsColor, 1);
    // Left leg
    graphics.fillRect(18, 42, 5, 6);
    // Right leg
    graphics.fillRect(25, 42, 5, 6);

    // Brown shoes
    graphics.fillStyle(brownColor, 1);
    // Left shoe
    graphics.fillRoundedRect(16, 48, 8, 6, 2);
    // Right shoe
    graphics.fillRoundedRect(24, 48, 8, 6, 2);

    graphics.generateTexture(key, width, height);
    graphics.destroy();
  }

  createStickManRunningTexture(key, width, height) {
    const graphics = this.scene.add.graphics();

    // Mario-style colors
    const skinColor = 0xfdbcb4;  // Peach skin color
    const hatColor = 0xff0000;    // Red hat
    const overallsColor = 0x0066cc;  // Blue overalls
    const shirtColor = 0xff0000;  // Red shirt
    const brownColor = 0x8b4513;  // Brown shoes
    const mustacheColor = 0x000000;  // Black mustache
    const whiteColor = 0xffffff;  // White gloves

    // Cap/Hat (tilted forward for running)
    graphics.fillStyle(hatColor, 1);
    graphics.fillRoundedRect(16, 5, 20, 10, 3);
    // Hat brim
    graphics.fillRect(14, 13, 24, 3);

    // White circle for M emblem
    graphics.fillStyle(whiteColor, 1);
    graphics.fillCircle(26, 10, 5);

    // Draw "M" on hat
    graphics.lineStyle(2, hatColor, 1);
    graphics.moveTo(22, 8);
    graphics.lineTo(22, 12);
    graphics.moveTo(22, 8);
    graphics.lineTo(24, 10);
    graphics.lineTo(26, 8);
    graphics.lineTo(28, 10);
    graphics.lineTo(30, 8);
    graphics.lineTo(30, 12);
    graphics.strokePath();

    // Face (leaning forward)
    graphics.fillStyle(skinColor, 1);
    graphics.fillEllipse(26, 18, 16, 12);

    // Eyes (looking determined)
    graphics.fillStyle(0x000000, 1);
    graphics.fillCircle(24, 17, 2);
    graphics.fillCircle(32, 17, 2);

    // Eye whites
    graphics.fillStyle(whiteColor, 1);
    graphics.fillCircle(25, 16, 1);
    graphics.fillCircle(33, 16, 1);

    // Mustache (flowing with motion)
    graphics.fillStyle(mustacheColor, 1);
    graphics.fillEllipse(26, 21, 10, 3);
    graphics.fillCircle(18, 21, 2);
    graphics.fillCircle(34, 21, 2);

    // Nose
    graphics.fillStyle(skinColor, 1);
    graphics.fillCircle(26, 19, 3);

    // Body - Red shirt (leaning forward)
    graphics.fillStyle(shirtColor, 1);
    graphics.beginPath();
    graphics.moveTo(20, 25);
    graphics.lineTo(32, 25);
    graphics.lineTo(30, 33);
    graphics.lineTo(18, 33);
    graphics.closePath();
    graphics.fillPath();

    // Overall straps
    graphics.fillStyle(overallsColor, 1);
    graphics.fillRect(20, 25, 3, 8);
    graphics.fillRect(29, 25, 3, 8);

    // Overalls body (angled)
    graphics.beginPath();
    graphics.moveTo(18, 33);
    graphics.lineTo(30, 33);
    graphics.lineTo(28, 41);
    graphics.lineTo(16, 41);
    graphics.closePath();
    graphics.fillPath();

    // Overall buttons
    graphics.fillStyle(0xffd700, 1);
    graphics.fillCircle(22, 29, 1);
    graphics.fillCircle(30, 29, 1);

    // Running arms with white gloves
    graphics.fillStyle(shirtColor, 1);

    // Front arm (pumping forward)
    graphics.beginPath();
    graphics.moveTo(32, 27);
    graphics.lineTo(38, 24);
    graphics.lineTo(40, 28);
    graphics.lineTo(34, 31);
    graphics.closePath();
    graphics.fillPath();

    // Back arm (pumping back)
    graphics.beginPath();
    graphics.moveTo(18, 27);
    graphics.lineTo(10, 32);
    graphics.lineTo(8, 36);
    graphics.lineTo(16, 31);
    graphics.closePath();
    graphics.fillPath();

    // White gloves
    graphics.fillStyle(whiteColor, 1);
    graphics.fillCircle(40, 26, 3);  // Front hand
    graphics.fillCircle(8, 34, 3);   // Back hand

    // Running legs
    graphics.fillStyle(overallsColor, 1);

    // Front leg (extended forward)
    graphics.beginPath();
    graphics.moveTo(24, 41);
    graphics.lineTo(29, 41);
    graphics.lineTo(32, 47);
    graphics.lineTo(27, 47);
    graphics.closePath();
    graphics.fillPath();

    // Back leg (extended back)
    graphics.beginPath();
    graphics.moveTo(16, 41);
    graphics.lineTo(21, 41);
    graphics.lineTo(14, 47);
    graphics.lineTo(9, 47);
    graphics.closePath();
    graphics.fillPath();

    // Brown shoes
    graphics.fillStyle(brownColor, 1);
    // Front shoe
    graphics.fillRoundedRect(28, 47, 10, 6, 2);
    // Back shoe
    graphics.fillRoundedRect(6, 47, 10, 6, 2);

    // Motion lines for speed effect
    graphics.lineStyle(2, 0xffffff, 0.4);
    graphics.moveTo(14, 10);
    graphics.lineTo(6, 10);
    graphics.strokePath();
    graphics.moveTo(14, 25);
    graphics.lineTo(4, 25);
    graphics.strokePath();
    graphics.moveTo(14, 40);
    graphics.lineTo(5, 40);
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
