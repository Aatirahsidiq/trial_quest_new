import Phaser from 'phaser';

export default class ScientistCard extends Phaser.Scene {
    constructor() {
        super('ScientistCard');
    }

    create() {
        // Background
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x1a2a3f, 0x1a2a3f, 0x0f1c2d, 0x0f1c2d, 1);
        bg.fillRect(0, 0, 1200, 800);

        // Card Container
        const cardContainer = this.add.container(600, 400);

        // Card Background
        const cardBg = this.add.rectangle(0, 0, 800, 500, 0x2c3e50);
        cardContainer.add(cardBg);

        // Scientist Icon
        const scientistIcon = this.add.text(-350, -200, '👨‍🔬', { 
            fontSize: '80px' 
        }).setOrigin(0.5);
        cardContainer.add(scientistIcon);

        // Role Title
        const roleTitle = this.add.text(-350, -100, 'Research Scientist', {
            fontSize: '32px',
            fill: '#3498db',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        cardContainer.add(roleTitle);

        // Responsibilities Header
        const responsibilitiesTitle = this.add.text(-350, -20, 'Key Responsibilities:', {
            fontSize: '24px',
            fill: '#f1c40f',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        cardContainer.add(responsibilitiesTitle);

        // Responsibilities List
        const responsibilities = [
            '📊 Analyze Trial Data',
            '🔍 Monitor Protocol Compliance',
            '📈 Generate Statistical Reports',
            '🧪 Evaluate Research Outcomes',
            '📋 Quality Control'
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

        // Skills Section
        const skillsTitle = this.add.text(250, -200, 'Required Skills', {
            fontSize: '28px',
            fill: '#e74c3c',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        cardContainer.add(skillsTitle);

        // Skill Bars
        const skills = [
            { name: 'Data Analysis', level: 0.9 },
            { name: 'Research Methods', level: 0.85 },
            { name: 'Statistical Analysis', level: 0.95 },
            { name: 'Protocol Design', level: 0.8 },
            { name: 'Quality Management', level: 0.85 }
        ];

        skills.forEach((skill, index) => {
            // Skill name
            const skillName = this.add.text(100, -120 + (index * 60), skill.name, {
                fontSize: '18px',
                fill: '#fff',
                fontFamily: 'Arial'
            });
            cardContainer.add(skillName);

            // Skill bar background
            const barBg = this.add.rectangle(300, -120 + (index * 60), 200, 20, 0x34495e);
            cardContainer.add(barBg);

            // Skill bar fill
            const barFill = this.add.rectangle(200 + (skill.level * 100), -120 + (index * 60), 
                200 * skill.level, 20, 0x3498db).setOrigin(0, 0.5);
            cardContainer.add(barFill);

            // Skill percentage
            const skillPercent = this.add.text(420, -120 + (index * 60), 
                `${Math.round(skill.level * 100)}%`, {
                fontSize: '16px',
                fill: '#fff',
                fontFamily: 'Arial'
            }).setOrigin(0, 0.5);
            cardContainer.add(skillPercent);
        });

        // Start Button
        const startButton = this.add.rectangle(250, 180, 250, 60, 0x2ecc71)
            .setInteractive()
            .on('pointerover', () => startButton.setFillStyle(0x27ae60))
            .on('pointerout', () => startButton.setFillStyle(0x2ecc71))
            .on('pointerdown', () => this.scene.start('ScientistStoryScene'));
        cardContainer.add(startButton);

        const startText = this.add.text(250, 180, 'Begin Research', {
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
                this.scene.start('MainMenuScene');
            });

        this.add.text(100, 50, '← Back', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    }
} 