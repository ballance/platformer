import { COLORS, SIZES } from "./config.js";

export class TextureFactory {
  constructor(scene) {
    this.scene = scene;
  }

  createAll() {
    this.createStickManTexture(
      "playerTex",
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
    graphics.fillStyle(poleColor, 1).fillRect(6, 0, 4, height);
    graphics.fillStyle(flagColor, 1).fillTriangle(10, 4, 10, 22, 26, 13);
    graphics.lineStyle(2, 0x000000, 0.15).strokeRect(6, 0, 4, height);
    graphics.generateTexture(key, 32, height);
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

  createStickManTexture(key, width, height) {
    const graphics = this.scene.add.graphics();

    // Stick figure color (black lines)
    const stickColor = 0xcccccc;
    const lineWidth = 2;

    graphics.lineStyle(lineWidth, stickColor, 1);

    // Head (circle)
    graphics.strokeCircle(12, 7, 5);

    // Body (vertical line)
    graphics.moveTo(12, 12);
    graphics.lineTo(12, 20);
    graphics.strokePath();

    // Arms (diagonal lines)
    graphics.moveTo(12, 14);
    graphics.lineTo(6, 18);
    graphics.strokePath();

    graphics.moveTo(12, 14);
    graphics.lineTo(18, 18);
    graphics.strokePath();

    // Legs (diagonal lines)
    graphics.moveTo(12, 20);
    graphics.lineTo(8, 26);
    graphics.strokePath();

    graphics.moveTo(12, 20);
    graphics.lineTo(16, 26);
    graphics.strokePath();

    // Eyes (small dots)
    graphics.fillStyle(stickColor, 1);
    graphics.fillCircle(10, 6, 1);
    graphics.fillCircle(14, 6, 1);

    // Smile
    graphics.lineStyle(1, stickColor, 1);
    graphics.strokePoints(
      [
        { x: 10, y: 9 },
        { x: 12, y: 10 },
        { x: 14, y: 9 },
      ],
      false,
    );

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
