import { COLORS, SIZES } from './config.js';

export class TextureFactory {
  constructor(scene) {
    this.scene = scene;
  }

  createAll() {
    this.createBlockTexture('playerTex', SIZES.player.width, SIZES.player.height, COLORS.player);
    this.createBlockTexture('groundTex', SIZES.ground.width, SIZES.ground.height, COLORS.ground);
    this.createBlockTexture('platformTex', SIZES.platform.width, SIZES.platform.height, COLORS.platform);
    this.createBlockTexture('hazardTex', SIZES.hazard.width, SIZES.hazard.height, COLORS.hazard);
    this.createFlagTexture('flagTex', SIZES.flag.width, SIZES.flag.height, COLORS.flagPole, COLORS.flagBanner);
    this.createStarTexture('starTex', SIZES.star.size, COLORS.star);
  }

  createBlockTexture(key, width, height, color) {
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(color, 1).fillRoundedRect(0, 0, width, height, 4);
    graphics.lineStyle(2, 0x000000, 0.15).strokeRoundedRect(0, 0, width, height, 4);
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
    const points = this.generateStarPoints(centerX, centerY, size, size * 0.5, 5);

    graphics.fillPoints(points, true);
    graphics.generateTexture(key, size * 2, size * 2);
    graphics.destroy();
  }

  generateStarPoints(centerX, centerY, outerRadius, innerRadius, spikes) {
    const points = [];
    let rotation = Math.PI / 2 * 3;
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