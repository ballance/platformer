import { GAME_CONFIG, SCORING } from './config.js';

export class UIManager {
  constructor(scene) {
    this.scene = scene;
    this.score = 0;
    this.scoreText = null;
    this.levelText = null;
    this.banner = null;
  }

  create() {
    this.createScoreDisplay();
    this.createLevelDisplay();
    this.createBanner();
  }

  createScoreDisplay() {
    this.scoreText = this.scene.add.text(12, 12, 'Score: 0', {
      fontSize: '18px',
      color: '#f1f5f9',
      stroke: '#000000',
      strokeThickness: 3
    }).setScrollFactor(0);
  }

  createLevelDisplay() {
    this.levelText = this.scene.add.text(12, 36, 'Level: 1', {
      fontSize: '18px',
      color: '#f1f5f9',
      stroke: '#000000',
      strokeThickness: 3
    }).setScrollFactor(0);
  }

  createBanner() {
    this.banner = this.scene.add.text(GAME_CONFIG.width / 2, 60, '', {
      fontSize: '28px',
      fontStyle: '700',
      color: '#e2e8f0',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);
  }

  addScore(points) {
    this.score += points;
    this.updateScoreDisplay();
  }

  updateScoreDisplay() {
    this.scoreText.setText(`Score: ${this.score}`);
  }

  showWinMessage() {
    this.banner.setText('You Win! 🎉');
    this.scene.time.delayedCall(1200, () => {
      this.banner.setText('');
    });
  }

  showCoinCollected() {
    this.addScore(SCORING.coin);
  }

  showLevelComplete() {
    this.banner.setText('Level Complete!');
    this.addScore(SCORING.win);
    this.scene.time.delayedCall(1500, () => {
      this.banner.setText('');
    });
  }

  showGameComplete() {
    this.banner.setText('Game Complete! 🎉');
    this.addScore(SCORING.win * 2); // Bonus for completing the game
  }

  updateLevel(levelNumber) {
    this.levelText.setText(`Level: ${levelNumber}`);
  }

  reset() {
    this.score = 0;
    this.updateScoreDisplay();
    this.banner.setText('');
    this.updateLevel(1);
  }
}