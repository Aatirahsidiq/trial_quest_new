export default class PuzzleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PuzzleScene' });
    }

    init(data) {
        console.log('Puzzle Scene Init:', data);
        this.trial = data.trialData;
    }

    create() {
        // Background
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x1a2a3f, 0x1a2a3f, 0x0f1c2d, 0x0f1c2d, 1);
        bg.fillRect(0, 0, 1200, 800);

        // Header
        this.add.text(600, 50, 'Slide Puzzle Challenge', {
            fontSize: '36px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // Trial name
        this.add.text(600, 100, `Trial: ${this.trial?.name || 'Loading...'}`, {
            fontSize: '24px',
            fill: '#3498db',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Simple 3x3 grid
        this.createSimplePuzzle();

        // Back button
        this.createBackButton();
    }

    createSimplePuzzle() {
        const gridSize = 3;
        const tileSize = 100;
        const startX = 450;
        const startY = 200;

        // Create 8 numbered tiles
        for (let i = 0; i < 8; i++) {
            const row = Math.floor(i / gridSize);
            const col = i % gridSize;
            
            const tile = this.add.rectangle(
                startX + (col * tileSize),
                startY + (row * tileSize),
                90,
                90,
                0x3498db
            ).setInteractive();

            this.add.text(
                startX + (col * tileSize),
                startY + (row * tileSize),
                (i + 1).toString(),
                {
                    fontSize: '32px',
                    fill: '#fff',
                    fontFamily: 'Arial'
                }
            ).setOrigin(0.5);
        }
    }

    createBackButton() {
        const button = this.add.rectangle(100, 50, 150, 50, 0x3498db)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('VolunteerTrialScene'));

        this.add.text(100, 50, '← Back', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    }
} 