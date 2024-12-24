import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }

    create() {
        // Background
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x1a2a3f, 0x1a2a3f, 0x0f1c2d, 0x0f1c2d, 1);
        bg.fillRect(0, 0, 1200, 800);

        // Game Title
        this.add.text(600, 200, 'TrialX Quest', {
            fontSize: '64px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // Subtitle
        this.add.text(600, 280, 'Clinical Trial Management Game', {
            fontSize: '32px',
            fill: '#3498db',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Start Button
        const startButton = this.add.rectangle(600, 400, 300, 80, 0x2ecc71)
            .setInteractive()
            .on('pointerover', () => startButton.setFillStyle(0x27ae60))
            .on('pointerout', () => startButton.setFillStyle(0x2ecc71))
            .on('pointerdown', () => this.scene.start('RoleSelectionScene'));

        this.add.text(600, 400, 'Start Game', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Credits
        this.add.text(600, 700, 'A Game About Clinical Trials and Research', {
            fontSize: '24px',
            fill: '#95a5a6',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    }
}