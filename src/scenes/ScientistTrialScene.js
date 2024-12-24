import Phaser from 'phaser';

export default class ScientistTrialScene extends Phaser.Scene {
    constructor() {
        super('ScientistStoryScene');
    }

    init() {
        this.trials = this.registry.get('trials');
    }

    create() {
        // Background
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x1a2a3f, 0x1a2a3f, 0x0f1c2d, 0x0f1c2d, 1);
        bg.fillRect(0, 0, 1200, 800);

        // Header
        this.add.text(600, 50, 'Research Scientist Dashboard', {
            fontSize: '36px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // Analytics Summary
        this.createAnalyticsSummary();

        // Trial List with Analysis Tools
        this.createTrialAnalytics();

        // Create back button
        this.createBackButton();
    }

    createAnalyticsSummary() {
        const totalParticipants = this.trials.reduce((sum, trial) => sum + trial.volunteers, 0);
        const activeTrials = this.trials.filter(t => t.status === 'Recruiting').length;
        const completedTrials = this.trials.filter(t => t.status === 'Completed').length;

        // Summary cards
        this.createSummaryCard(300, 120, '🧬', 'Active Trials', activeTrials, '#2ecc71');
        this.createSummaryCard(600, 120, '👥', 'Total Participants', totalParticipants, '#3498db');
        this.createSummaryCard(900, 120, '📊', 'Completed Trials', completedTrials, '#e67e22');
    }

    createSummaryCard(x, y, icon, title, value, color) {
        const cardBg = this.add.rectangle(x, y, 250, 80, 0x2c3e50);
        
        this.add.text(x - 100, y - 20, icon, {
            fontSize: '30px'
        }).setOrigin(0.5);

        this.add.text(x + 20, y - 20, title, {
            fontSize: '18px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0, 0.5);

        this.add.text(x + 20, y + 20, value.toString(), {
            fontSize: '24px',
            fill: color,
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0, 0.5);
    }

    createTrialAnalytics() {
        this.trials.forEach((trial, index) => {
            const y = 250 + (index * 150);

            // Trial card background
            const cardBg = this.add.rectangle(600, y, 900, 120, 0x2c3e50)
                .setInteractive()
                .on('pointerover', () => cardBg.setFillStyle(0x3c546c))
                .on('pointerout', () => cardBg.setFillStyle(0x2c3e50))
                .on('pointerdown', () => this.showDetailedAnalysis(trial));

            // Trial identifier
            const icon = this.add.text(200, y - 30, '👨‍🔬', {
                fontSize: '40px'
            }).setOrigin(0, 0.5);

            const name = this.add.text(260, y - 30, trial.name, {
                fontSize: '24px',
                fill: '#fff',
                fontFamily: 'Arial'
            });

            // Progress bar
            this.createProgressBar(trial, y);

            // Analysis buttons
            this.createAnalysisButtons(trial, y);

            // Compliance indicator
            const compliance = this.calculateCompliance(trial);
            const complianceText = this.add.text(800, y - 30, 
                `Protocol Compliance: ${compliance}%`, {
                fontSize: '18px',
                fill: this.getComplianceColor(compliance),
                fontFamily: 'Arial'
            });

            // Data quality score
            const dataQuality = this.calculateDataQuality(trial);
            const qualityText = this.add.text(800, y + 20, 
                `Data Quality: ${dataQuality}%`, {
                fontSize: '18px',
                fill: this.getQualityColor(dataQuality),
                fontFamily: 'Arial'
            });
        });
    }

    createProgressBar(trial, y) {
        // Background bar
        this.add.rectangle(500, y, 200, 15, 0x34495e);

        // Progress fill
        const progress = trial.volunteers / trial.maxVolunteers;
        const fillWidth = 200 * progress;
        this.add.rectangle(400 + (fillWidth/2), y, fillWidth, 15, this.getProgressColor(progress))
            .setOrigin(0.5);

        // Percentage text
        this.add.text(520, y, `${Math.round(progress * 100)}%`, {
            fontSize: '14px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0, 0.5);
    }

    createAnalysisButtons(trial, y) {
        // View Data button
        const dataButton = this.add.rectangle(1000, y - 20, 120, 30, 0x3498db)
            .setInteractive()
            .on('pointerover', () => dataButton.setFillStyle(0x2980b9))
            .on('pointerout', () => dataButton.setFillStyle(0x3498db))
            .on('pointerdown', () => this.viewData(trial));

        this.add.text(1000, y - 20, 'View Data', {
            fontSize: '16px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Export Report button
        const reportButton = this.add.rectangle(1000, y + 20, 120, 30, 0x2ecc71)
            .setInteractive()
            .on('pointerover', () => reportButton.setFillStyle(0x27ae60))
            .on('pointerout', () => reportButton.setFillStyle(0x2ecc71))
            .on('pointerdown', () => this.exportReport(trial));

        this.add.text(1000, y + 20, 'Export Report', {
            fontSize: '16px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    }

    calculateCompliance(trial) {
        // Simulated compliance calculation
        return Math.min(100, Math.round((trial.volunteers / trial.maxVolunteers) * 100 + Math.random() * 20));
    }

    calculateDataQuality(trial) {
        // Simulated data quality calculation
        return Math.min(100, Math.round(85 + Math.random() * 15));
    }

    getProgressColor(progress) {
        if (progress < 0.3) return 0xe74c3c;
        if (progress < 0.7) return 0xf1c40f;
        return 0x2ecc71;
    }

    getComplianceColor(compliance) {
        if (compliance < 70) return '#e74c3c';
        if (compliance < 90) return '#f1c40f';
        return '#2ecc71';
    }

    getQualityColor(quality) {
        if (quality < 75) return '#e74c3c';
        if (quality < 90) return '#f1c40f';
        return '#2ecc71';
    }

    showDetailedAnalysis(trial) {
        console.log('Show detailed analysis for:', trial.name);
    }

    viewData(trial) {
        console.log('View data for:', trial.name);
    }

    exportReport(trial) {
        console.log('Export report for:', trial.name);
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