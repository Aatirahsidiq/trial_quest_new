import Phaser from 'phaser';

export default class RoleSelectionScene extends Phaser.Scene {
    constructor() {
        super('RoleSelectionScene');
    }

    create() {
        // Background
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x1a2a3f, 0x1a2a3f, 0x0f1c2d, 0x0f1c2d, 1);
        bg.fillRect(0, 0, 1200, 800);

        // Header
        this.add.text(600, 100, 'Select Your Role', {
            fontSize: '48px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // Create role cards with proper spacing
        this.createRoleCard(300, 400, '👨‍⚕️', 'Doctor', 
            'Manage clinical trials and patient care', 'DoctorCard', 0x3498db);
        
        this.createRoleCard(600, 400, '🙋', 'Volunteer', 
            'Participate in medical trials', 'VolunteerCard', 0x2ecc71);
        
        this.createRoleCard(900, 400, '👨‍🔬', 'Scientist', 
            'Analyze data and monitor trials', 'ScientistCard', 0xe74c3c);

        // Back button
        this.createBackButton();
    }

    createRoleCard(x, y, icon, title, description, targetScene, color) {
        // Card container
        const container = this.add.container(x, y);

        // Card background
        const cardBg = this.add.rectangle(0, 0, 280, 350, 0x2c3e50)
            .setInteractive()
            .on('pointerover', () => {
                cardBg.setFillStyle(0x34495e);
                container.setScale(1.05);
            })
            .on('pointerout', () => {
                cardBg.setFillStyle(0x2c3e50);
                container.setScale(1);
            })
            .on('pointerdown', () => this.scene.start(targetScene));
        container.add(cardBg);

        // Role icon
        const roleIcon = this.add.text(0, -100, icon, {
            fontSize: '80px'
        }).setOrigin(0.5);
        container.add(roleIcon);

        // Colored accent bar
        const accentBar = this.add.rectangle(0, -40, 240, 4, color);
        container.add(accentBar);

        // Role title
        const roleTitle = this.add.text(0, 0, title, {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        container.add(roleTitle);

        // Role description
        const roleDesc = this.add.text(0, 60, description, {
            fontSize: '18px',
            fill: '#95a5a6',
            fontFamily: 'Arial',
            align: 'center',
            wordWrap: { width: 240 }
        }).setOrigin(0.5);
        container.add(roleDesc);

        // Start button
        const startButton = this.add.rectangle(0, 120, 200, 50, color)
            .setInteractive()
            .on('pointerover', () => startButton.setAlpha(0.8))
            .on('pointerout', () => startButton.setAlpha(1))
            .on('pointerdown', () => this.scene.start(targetScene));
        container.add(startButton);

        const buttonText = this.add.text(0, 120, 'Select Role', {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        container.add(buttonText);
    }

    createBackButton() {
        const button = this.add.rectangle(100, 50, 150, 50, 0x3498db)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('MainMenuScene');
            });

        this.add.text(100, 50, '← Back', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    }
} 