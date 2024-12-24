import Phaser from 'phaser';

export default class VolunteerCard extends Phaser.Scene {
    constructor() {
        super('VolunteerCard');
    }

    create() {
        // Background
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x1a2a3f, 0x1a2a3f, 0x0f1c2d, 0x0f1c2d, 1);
        bg.fillRect(0, 0, 1200, 800);

        // Card Container
        const cardContainer = this.add.container(600, 400);

        // Card Background
        const cardBg = this.add.rectangle(0, 0, 1000, 500, 0x2c3e50);
        cardContainer.add(cardBg);

        // Volunteer Icon
        const volunteerIcon = this.add.text(-350, -200, '🙋', { 
            fontSize: '80px' 
        }).setOrigin(0.5);
        cardContainer.add(volunteerIcon);

        // Role Title
        const roleTitle = this.add.text(-350, -100, 'Trial Volunteer', {
            fontSize: '32px',
            fill: '#2ecc71',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        cardContainer.add(roleTitle);

        // Responsibilities Header
        const responsibilitiesTitle = this.add.text(-350, -20, 'Your Journey:', {
            fontSize: '24px',
            fill: '#f1c40f',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        cardContainer.add(responsibilitiesTitle);

        // Responsibilities List
        const responsibilities = [
            '🎯 Find Matching Trials',
            '📝 Complete Requirements',
            '🤝 Join Clinical Studies',
            '📅 Follow Trial Schedule',
            '🏆 Earn Points & Progress'
        ];

        responsibilities.forEach((resp, index) => {
            const respText = this.add.text(-350, 30 + (index * 40), resp, {
                fontSize: '20px',
                fill: '#fff',
                fontFamily: 'Arial'
            }).setOrigin(0.5);
            cardContainer.add(respText);
        });

        // Vertical Divider
        const divider = this.add.rectangle(-50, 0, 4, 450, 0x34495e);
        cardContainer.add(divider);

        // Requirements Section
        const requirementsTitle = this.add.text(250, -200, 'What You Need', {
            fontSize: '28px',
            fill: '#e74c3c',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        cardContainer.add(requirementsTitle);

        // Requirements List
        const requirements = [
            '✓ Basic Health Information',
            '✓ Age & Gender Details',
            '✓ Medical History',
            '✓ Time Commitment',
            '✓ Participation Agreement'
        ];

        requirements.forEach((req, index) => {
            const reqText = this.add.text(250, -120 + (index * 40), req, {
                fontSize: '20px',
                fill: '#fff',
                fontFamily: 'Arial'
            }).setOrigin(0.5);
            cardContainer.add(reqText);
        });

        // Start Button
        const startButton = this.add.rectangle(250, 180, 250, 60, 0x2ecc71)
            .setInteractive()
            .on('pointerover', () => startButton.setFillStyle(0x27ae60))
            .on('pointerout', () => startButton.setFillStyle(0x2ecc71))
            .on('pointerdown', () => this.scene.start('VolunteerStoryScene'));
        cardContainer.add(startButton);

        const startText = this.add.text(250, 180, 'Join Trials', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        cardContainer.add(startText);

        // Back Button
        this.createBackButton();
    }

    createBackButton() {
        const button = this.add.rectangle(100, 50, 150, 50, 0x3498db)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('RoleSelectionScene');
            });

        this.add.text(100, 50, '← Back', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    }
} 