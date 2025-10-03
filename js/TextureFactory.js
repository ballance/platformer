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
    graphics.generateTexture(key, size * 2, size * 2);
    graphics.destroy();
  }

  createStickManStandingTexture(key, width, height) {
    const graphics = this.scene.add.graphics();

    // Stick figure color (black lines)
    const stickColor = 0xcccccc;
    const lineWidth = 4;

    graphics.lineStyle(lineWidth, stickColor, 1);

    // Head (circle)
    graphics.strokeCircle(24, 14, 10);

    // Body (vertical line)
    graphics.moveTo(24, 24);
    graphics.lineTo(24, 40);
    graphics.strokePath();

    // Arms (diagonal lines down)
    graphics.moveTo(24, 28);
    graphics.lineTo(12, 36);
    graphics.strokePath();

    graphics.moveTo(24, 28);
    graphics.lineTo(36, 36);
    graphics.strokePath();

    // Legs (diagonal lines)
    graphics.moveTo(24, 40);
    graphics.lineTo(16, 52);
    graphics.strokePath();

    graphics.moveTo(24, 40);
    graphics.lineTo(32, 52);
    graphics.strokePath();

    // Eyes (small dots)
    graphics.fillStyle(stickColor, 1);
    graphics.fillCircle(20, 12, 2);
    graphics.fillCircle(28, 12, 2);

    // Smile
    graphics.lineStyle(2, stickColor, 1);
    graphics.strokePoints(
      [
        { x: 20, y: 18 },
        { x: 24, y: 20 },
        { x: 28, y: 18 },
      ],
      false,
    );

    graphics.generateTexture(key, width, height);
    graphics.destroy();
  }

  createStickManRunningTexture(key, width, height) {
    const graphics = this.scene.add.graphics();

    // Stick figure color (black lines)
    const stickColor = 0xcccccc;
    const lineWidth = 4;

    graphics.lineStyle(lineWidth, stickColor, 1);

    // Head (circle) - positioned forward for running pose
    graphics.strokeCircle(28, 14, 10);

    // Body (diagonal line leaning forward)
    graphics.moveTo(26, 24);
    graphics.lineTo(20, 40);
    graphics.strokePath();

    // Front arm (forward)
    graphics.moveTo(24, 30);
    graphics.lineTo(36, 28);
    graphics.strokePath();

    // Back arm (backward)
    graphics.moveTo(24, 30);
    graphics.lineTo(14, 38);
    graphics.strokePath();

    // Front leg (forward stride)
    graphics.moveTo(20, 40);
    graphics.lineTo(30, 52);
    graphics.strokePath();

    // Back leg (back stride)
    graphics.moveTo(20, 40);
    graphics.lineTo(10, 50);
    graphics.strokePath();

    // Eyes (looking right)
    graphics.fillStyle(stickColor, 1);
    graphics.fillCircle(27, 12, 2);
    graphics.fillCircle(32, 12, 2);

    // Determined expression (straight line)
    graphics.lineStyle(2, stickColor, 1);
    graphics.moveTo(26, 18);
    graphics.lineTo(32, 18);
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
