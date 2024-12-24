import Phaser from 'phaser';

export default class VolunteerTrialScene extends Phaser.Scene {
    constructor() {
        super('VolunteerStoryScene');
        this.score = 0;
        this.currentStep = 'age';
        this.currentTrialIndex = 0;

        // Define icons and symbols
        this.genderIcons = {
            'Male': '♂️',
            'Female': '♀️',
            'Any': '⚥',
            'Other': '⚪'
        };

        this.conditionIcons = {
            'Cancer': '🦠',
            'Heart Disease': '❤️',
            'Diabetes': '🍬',
            'Asthma': '🫁',
            'Arthritis': '🦴'
        };

        this.trials = [
            {
                name: "Early Cancer Detection Trial",
                minAge: 25,
                maxAge: 45,
                gender: 'Female',
                condition: 'Cancer',
                icon: '🔬',
                difficulty: 'Easy',
                volunteers: 0,
                maxVolunteers: 10
            },
            {
                name: "Advanced Heart Treatment Study",
                minAge: 40,
                maxAge: 60,
                gender: 'Any',
                condition: 'Heart Disease',
                icon: '💊',
                difficulty: 'Medium',
                volunteers: 0,
                maxVolunteers: 15
            },
            {
                name: "Experimental Diabetes Research",
                minAge: 30,
                maxAge: 50,
                gender: 'Male',
                condition: 'Diabetes',
                icon: '🧬',
                difficulty: 'Hard',
                volunteers: 0,
                maxVolunteers: 20
            }
        ];
    }

    init() {
        // Initialize trials in registry if not exists
        if (!this.registry.get('trials')) {
            this.registry.set('trials', this.trials);
        }
        // Get latest trial data from registry
        this.trials = this.registry.get('trials');
    }

    create() {
        // Background
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x1a2a3f, 0x1a2a3f, 0x0f1c2d, 0x0f1c2d, 1);
        bg.fillRect(0, 0, 1200, 800);

        // Create container for puzzle elements
        this.puzzleContainer = this.add.container(0, 0);

        // Header
        this.add.text(600, 50, 'Match Volunteers to Clinical Trials', {
            fontSize: '36px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // Score display
        this.scoreText = this.add.text(1050, 50, 'Score: 0', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Progress indicator
        this.progressText = this.add.text(600, 100, 'Step 1 of 3', {
            fontSize: '24px',
            fill: '#3498db',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Create back button
        this.createBackButton();

        // Show trial selection
        this.showTrialSelection();
    }

    clearPuzzleContainer() {
        if (this.puzzleContainer) {
            this.puzzleContainer.removeAll(true);
        }
    }

    showTrialSelection() {
        this.clearPuzzleContainer();

        const header = this.add.text(600, 150, 'Match the Symbols to Find Eligible Trials', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        this.puzzleContainer.add(header);

        this.trials.forEach((trial, index) => {
            const y = 250 + (index * 120);
            
            const cardBg = this.add.rectangle(600, y, 800, 100, 0x2c3e50)
                .setInteractive()
                .on('pointerover', () => cardBg.setFillStyle(0x3c546c))
                .on('pointerout', () => cardBg.setFillStyle(0x2c3e50))
                .on('pointerdown', () => {
                    this.currentTrialIndex = index;
                    this.showAgePuzzle();
                });

            const icon = this.add.text(250, y, trial.icon, {
                fontSize: '40px'
            }).setOrigin(0, 0.5);

            const codeName = this.add.text(310, y, `Trial ${String.fromCharCode(65 + index)}`, {
                fontSize: '24px',
                fill: '#fff',
                fontFamily: 'Arial'
            }).setOrigin(0, 0.5);

            const difficultyText = this.add.text(800, y, trial.difficulty, {
                fontSize: '20px',
                fill: this.getDifficultyColor(trial.difficulty),
                fontFamily: 'Arial'
            }).setOrigin(0, 0.5);

            this.puzzleContainer.add([cardBg, icon, codeName, difficultyText]);
        });
    }

    getDifficultyColor(difficulty) {
        const colors = {
            'Easy': '#2ecc71',
            'Medium': '#f1c40f',
            'Hard': '#e74c3c'
        };
        return colors[difficulty];
    }

    showAgePuzzle() {
        this.clearPuzzleContainer();
        const currentTrial = this.trials[this.currentTrialIndex];
        this.progressText.setText('Step 1 of 3: Age Range');

        // Create cryptic age range display
        const minAgeSymbols = '◇'.repeat(Math.floor(currentTrial.minAge / 10));
        const maxAgeSymbols = '��'.repeat(Math.floor(currentTrial.maxAge / 10));

        const cardBg = this.add.rectangle(600, 200, 800, 100, 0x2c3e50);
        const trialIcon = this.add.text(600, 180, currentTrial.icon, {
            fontSize: '40px'
        }).setOrigin(0.5);

        const requirement = this.add.text(600, 220, `${minAgeSymbols} - ${maxAgeSymbols}`, {
            fontSize: '32px',
            fill: '#3498db',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.puzzleContainer.add([cardBg, trialIcon, requirement]);

        // Age options with symbols
        const ages = this.generateAgeOptions(currentTrial);
        ages.forEach((age, index) => {
            const x = 300 + (index * 150);
            const button = this.add.rectangle(x, 450, 120, 80, 0x34495e)
                .setInteractive()
                .on('pointerover', () => button.setFillStyle(0x3c546c))
                .on('pointerout', () => button.setFillStyle(0x34495e))
                .on('pointerdown', () => this.checkAge(age));

            const ageSymbols = '●'.repeat(Math.floor(age / 10));
            const text = this.add.text(x, 450, ageSymbols, {
                fontSize: '32px',
                fill: '#fff',
                fontFamily: 'Arial'
            }).setOrigin(0.5);

            this.puzzleContainer.add([button, text]);
        });
    }

    generateAgeOptions(trial) {
        let validAge = Phaser.Math.Between(trial.minAge, trial.maxAge);
        let ages = [validAge];
        
        // Add more options based on difficulty
        while (ages.length < 6) {
            let newAge = Phaser.Math.Between(
                trial.minAge - 15,
                trial.maxAge + 15
            );
            if (!ages.includes(newAge) && newAge > 0) {
                ages.push(newAge);
            }
        }
        return Phaser.Utils.Array.Shuffle(ages);
    }

    checkAge(age) {
        const currentTrial = this.trials[this.currentTrialIndex];
        if (age >= currentTrial.minAge && age <= currentTrial.maxAge) {
            const points = (3 - this.currentTrialIndex) * 50;
            this.score += points;
            this.scoreText.setText(`Score: ${this.score}`);
            this.showMessage(`Correct age range! +${points} points`, 0x2ecc71);
            this.time.delayedCall(1500, () => this.showGenderPuzzle());
        } else {
            this.showMessage('Age does not match trial requirements', 0xe74c3c);
        }
    }

    showGenderPuzzle() {
        this.clearPuzzleContainer();
        const currentTrial = this.trials[this.currentTrialIndex];
        this.progressText.setText('Step 2 of 3: Gender Symbol');

        const cardBg = this.add.rectangle(600, 200, 800, 100, 0x2c3e50);
        const trialIcon = this.add.text(600, 180, currentTrial.icon, {
            fontSize: '40px'
        }).setOrigin(0.5);

        const requirement = this.add.text(600, 220, this.genderIcons[currentTrial.gender], {
            fontSize: '40px',
            fill: '#3498db'
        }).setOrigin(0.5);

        this.puzzleContainer.add([cardBg, trialIcon, requirement]);

        // Question
        const question = this.add.text(600, 350, 'Match the Gender Symbol:', {
            fontSize: '26px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        this.puzzleContainer.add(question);

        // Gender symbols
        Object.entries(this.genderIcons).forEach(([gender, icon], index) => {
            const x = 400 + (index * 200);
            const button = this.add.rectangle(x, 450, 120, 80, 0x34495e)
                .setInteractive()
                .on('pointerover', () => button.setFillStyle(0x3c546c))
                .on('pointerout', () => button.setFillStyle(0x34495e))
                .on('pointerdown', () => this.checkGender(gender));

            const text = this.add.text(x, 450, icon, {
                fontSize: '40px'
            }).setOrigin(0.5);

            this.puzzleContainer.add([button, text]);
        });
    }

    checkGender(gender) {
        const currentTrial = this.trials[this.currentTrialIndex];
        if (currentTrial.gender === 'Any' || gender === currentTrial.gender) {
            const points = (3 - this.currentTrialIndex) * 50;
            this.score += points;
            this.scoreText.setText(`Score: ${this.score}`);
            this.showMessage(`Gender matches! +${points} points`, 0x2ecc71);
            this.time.delayedCall(1500, () => this.showConditionPuzzle());
        } else {
            this.showMessage('Gender does not match trial requirements', 0xe74c3c);
        }
    }

    showConditionPuzzle() {
        this.clearPuzzleContainer();
        const currentTrial = this.trials[this.currentTrialIndex];
        this.progressText.setText('Step 3 of 3: Medical Symbol');

        const cardBg = this.add.rectangle(600, 200, 800, 100, 0x2c3e50);
        const trialIcon = this.add.text(600, 180, currentTrial.icon, {
            fontSize: '40px'
        }).setOrigin(0.5);

        const requirement = this.add.text(600, 220, this.conditionIcons[currentTrial.condition], {
            fontSize: '40px',
            fill: '#3498db'
        }).setOrigin(0.5);

        this.puzzleContainer.add([cardBg, trialIcon, requirement]);

        // Question
        const question = this.add.text(600, 350, 'Match the Medical Symbol:', {
            fontSize: '26px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        this.puzzleContainer.add(question);

        // Condition symbols
        Object.entries(this.conditionIcons).forEach(([condition, icon], index) => {
            const x = 300 + (index * 150);
            const button = this.add.rectangle(x, 450, 120, 80, 0x34495e)
                .setInteractive()
                .on('pointerover', () => button.setFillStyle(0x3c546c))
                .on('pointerout', () => button.setFillStyle(0x34495e))
                .on('pointerdown', () => this.checkCondition(condition));

            const text = this.add.text(x, 450, icon, {
                fontSize: '40px'
            }).setOrigin(0.5);

            this.puzzleContainer.add([button, text]);
        });
    }

    checkCondition(condition) {
        const currentTrial = this.trials[this.currentTrialIndex];
        if (condition === currentTrial.condition) {
            const doctorScene = this.scene.get('DoctorStoryScene');
            if (doctorScene.addVolunteerToTrial(this.currentTrialIndex)) {
                const points = (3 - this.currentTrialIndex) * 50;
                this.score += points;
                this.scoreText.setText(`Score: ${this.score}`);
                this.showMessage(`Perfect match! Trial joined! +${points} points`, 0x2ecc71);
            } else {
                this.showMessage('Trial is full!', 0xe74c3c);
            }
            this.time.delayedCall(1500, () => this.showTrialSelection());
        } else {
            this.showMessage('Condition does not match trial requirements', 0xe74c3c);
        }
    }

    clearScreen() {
        this.children.list.forEach(child => {
            if (child !== this.scoreText) {
                child.destroy();
            }
        });
        this.createBackButton();
    }

    showMessage(text, color) {
        const message = this.add.text(600, 750, text, {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: color,
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5);

        this.time.delayedCall(2000, () => {
            message.destroy();
        });
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