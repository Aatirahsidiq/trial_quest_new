import Phaser from 'phaser';

export default class ScientistTrialScene extends Phaser.Scene {
    constructor() {
        super('ScientistStoryScene');
    }

    init() {
        if (!this.registry.get('trials')) {
            this.registry.set('trials', []);
        }
        this.scale.setGameSize(1200, 1000);
    }

    create() {
        // Background
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x1a2a3f, 0x1a2a3f, 0x0f1c2d, 0x0f1c2d, 1);
        bg.fillRect(0, 0, 1200, 1000);

        // Create scrollable container for content
        const mainContainer = this.add.container(0, 0);

        // Header
        this.createHeader();

        // Trials List with more space
        this.createTrialsList();

        // Back button (keep on top)
        this.createBackButton();
    }

    createHeader() {
        // Main title - moved up
        this.add.text(600, 30, 'Scientist Dashboard', {
            fontSize: '36px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // Subtitle - adjusted spacing
        this.add.text(600, 70, 'Trial Data Analysis', {
            fontSize: '24px',
            fill: '#3498db',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Get trials data
        const trials = this.registry.get('trials') || [];
        
        // Calculate statistics
        const activeTrials = trials.filter(t => t.status !== 'Completed').length;
        const totalVolunteers = trials.reduce((sum, trial) => sum + (trial.volunteers || 0), 0);
        const avgCompliance = trials.reduce((sum, trial) => sum + (trial.compliance || 0), 0) / trials.length || 0;

        // Stats boxes - moved down
        const stats = [
            { icon: '🔬', label: 'Active Trials', value: activeTrials, x: 300 },
            { icon: '👥', label: 'Total Volunteers', value: totalVolunteers, x: 600 },
            { icon: '📊', label: 'Avg. Compliance', value: `${Math.round(avgCompliance)}%`, x: 900 }
        ];

        // Stats container with background
        const statsBg = this.add.rectangle(600, 160, 900, 80, 0x2c3e50);

        stats.forEach(stat => {
            // Stat box background
            this.add.rectangle(stat.x, 160, 220, 60, 0x34495e)
                .setInteractive()
                .on('pointerover', function() { this.setFillStyle(0x2c3e50); })
                .on('pointerout', function() { this.setFillStyle(0x34495e); });

            // Icon
            this.add.text(stat.x - 90, 160, stat.icon, {
                fontSize: '28px'
            }).setOrigin(0.5);

            // Value
            this.add.text(stat.x, 150, stat.value.toString(), {
                fontSize: '28px',
                fill: '#fff',
                fontFamily: 'Arial',
                fontWeight: 'bold'
            }).setOrigin(0.5);

            // Label
            this.add.text(stat.x, 175, stat.label, {
                fontSize: '16px',
                fill: '#95a5a6',
                fontFamily: 'Arial'
            }).setOrigin(0.5);
        });
    }

    createTrialsList() {
        const trials = this.registry.get('trials') || [];
        const startY = 300; // Increased starting position to avoid overlap
        const spacing = 200;

        if (trials.length === 0) {
            this.add.text(600, 400, 'No active trials to analyze', {
                fontSize: '24px',
                fill: '#95a5a6',
                fontFamily: 'Arial'
            }).setOrigin(0.5);
            return;
        }

        // Create scrolling container for trials
        const scrollableArea = this.add.container(0, 0);

        trials.forEach((trial, index) => {
            const y = startY + (index * spacing);

            // Card shadow and background (taller cards)
            this.add.rectangle(605, y + 5, 900, 160, 0x000000, 0.3);
            const cardBg = this.add.rectangle(600, y, 900, 160, 0x2c3e50)
                .setInteractive()
                .on('pointerover', () => cardBg.setFillStyle(0x34495e))
                .on('pointerout', () => cardBg.setFillStyle(0x2c3e50));

            // Left Column (Trial Info)
            this.add.text(180, y - 50, trial.icon || '🔬', { 
                fontSize: '40px' 
            }).setOrigin(0.5);

            this.add.text(300, y - 50, trial.name, {
                fontSize: '24px',
                fill: '#fff',
                fontFamily: 'Arial',
                fontWeight: 'bold'
            });

            // Status
            const status = trial.status || 'Recruiting';
            const statusColor = this.getStatusColor(status);
            this.add.circle(800, y - 50, 6, statusColor);
            this.add.text(820, y - 50, status, {
                fontSize: '18px',
                fill: statusColor,
                fontFamily: 'Arial'
            }).setOrigin(0, 0.5);

            // Middle Column (Metrics) - More vertical spacing
            this.add.text(300, y + 0, `📊 Compliance: ${trial.compliance || 85}%`, {
                fontSize: '18px',
                fill: '#95a5a6',
                fontFamily: 'Arial'
            });

            this.add.text(500, y + 0, `🔍 Quality: ${trial.dataQuality || 80}%`, {
                fontSize: '18px',
                fill: '#95a5a6',
                fontFamily: 'Arial'
            });

            // Right Column (Progress) - Better positioned
            this.add.text(700, y + 40, 'Participants:', {
                fontSize: '18px',
                fill: '#fff',
                fontFamily: 'Arial'
            });

            // Progress bar
            const barWidth = 200;
            const barHeight = 12;
            this.add.rectangle(900, y + 40, barWidth, barHeight, 0x34495e);
            
            const progress = (trial.volunteers || 0) / (trial.maxVolunteers || 1);
            const fillWidth = Math.min(barWidth * progress, barWidth);
            
            this.add.rectangle(800 + (fillWidth/2), y + 40, fillWidth, barHeight, 
                this.getProgressColor(progress * 100)).setOrigin(0.5);

            this.add.text(1000, y + 40, 
                `${trial.volunteers || 0}/${trial.maxVolunteers || 0}`, {
                fontSize: '18px',
                fill: '#fff',
                fontFamily: 'Arial'
            }).setOrigin(0, 0.5);
        });
    }

    getStatusColor(status) {
        const colors = {
            'Recruiting': 0x2ecc71,
            'Full': 0xe74c3c,
            'On Hold': 0xf1c40f,
            'Completed': 0x3498db
        };
        return colors[status] || 0xffffff;
    }

    getProgressColor(progress) {
        if (progress < 30) return 0xe74c3c;
        if (progress < 70) return 0xf1c40f;
        return 0x2ecc71;
    }

    createBackButton() {
        const button = this.add.rectangle(100, 50, 150, 50, 0x3498db)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('ScientistCard'));

        this.add.text(100, 50, '← Back', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    }
} 