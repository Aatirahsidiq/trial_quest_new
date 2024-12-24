import Phaser from 'phaser';

export default class DoctorTrialScene extends Phaser.Scene {
    constructor() {
        super('DoctorStoryScene');
        this.trials = [
            {
                name: "Early Cancer Detection Trial",
                minAge: 25,
                maxAge: 45,
                gender: 'Female',
                condition: 'Cancer',
                icon: '👨‍⚕️',
                difficulty: 'Easy',
                volunteers: 0,
                maxVolunteers: 10,
                status: 'Recruiting',
                notes: []
            },
            {
                name: "Advanced Heart Treatment Study",
                minAge: 40,
                maxAge: 60,
                gender: 'Any',
                condition: 'Heart Disease',
                icon: '👩‍⚕️',
                difficulty: 'Medium',
                volunteers: 0,
                maxVolunteers: 15,
                status: 'Recruiting',
                notes: []
            },
            {
                name: "Experimental Diabetes Research",
                minAge: 30,
                maxAge: 50,
                gender: 'Male',
                condition: 'Diabetes',
                icon: '🏥',
                difficulty: 'Hard',
                volunteers: 0,
                maxVolunteers: 20,
                status: 'Recruiting',
                notes: []
            }
        ];
    }

    init() {
        if (!this.registry.get('trials')) {
            this.registry.set('trials', this.trials);
        }
        this.trials = this.registry.get('trials');
    }

    create() {
        // Background
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x1a2a3f, 0x1a2a3f, 0x0f1c2d, 0x0f1c2d, 1);
        bg.fillRect(0, 0, 1200, 800);

        // Header
        this.add.text(600, 50, 'Doctor Dashboard - Clinical Trial Management', {
            fontSize: '36px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // Add New Trial Button
        const addButton = this.add.rectangle(1000, 100, 200, 50, 0x2ecc71)
            .setInteractive()
            .on('pointerover', () => addButton.setFillStyle(0x27ae60))
            .on('pointerout', () => addButton.setFillStyle(0x2ecc71))
            .on('pointerdown', () => this.showAddTrialForm());

        this.add.text(1000, 100, '+ Add New Trial', {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.createTrialsList();
        this.createBackButton();
    }

    createTrialsList() {
        this.trials.forEach((trial, index) => {
            const y = 180 + (index * 150);

            // Trial card background
            const cardBg = this.add.rectangle(600, y, 900, 120, 0x2c3e50)
                .setInteractive()
                .on('pointerover', () => cardBg.setFillStyle(0x3c546c))
                .on('pointerout', () => cardBg.setFillStyle(0x2c3e50))
                .on('pointerdown', () => this.showTrialDetails(trial));

            // Doctor icon and trial name
            const icon = this.add.text(200, y - 30, trial.icon, {
                fontSize: '40px'
            }).setOrigin(0, 0.5);

            const name = this.add.text(260, y - 30, trial.name, {
                fontSize: '24px',
                fill: '#fff',
                fontFamily: 'Arial'
            });

            // Patient requirements
            const requirements = this.add.text(260, y + 20, 
                `Requirements: Age ${trial.minAge}-${trial.maxAge} | ${trial.gender} | ${trial.condition}`, {
                fontSize: '18px',
                fill: '#3498db',
                fontFamily: 'Arial'
            });

            // Status and actions
            const status = this.add.text(800, y - 30, `Status: ${trial.status}`, {
                fontSize: '18px',
                fill: this.getStatusColor(trial.status),
                fontFamily: 'Arial'
            });

            // Volunteer count
            const volunteerCount = this.add.text(800, y + 20, 
                `Patients: ${trial.volunteers}/${trial.maxVolunteers}`, {
                fontSize: '18px',
                fill: '#fff',
                fontFamily: 'Arial'
            });

            // Action buttons
            this.createActionButtons(trial, y);
        });
    }

    createActionButtons(trial, y) {
        // Edit button
        const editButton = this.add.rectangle(1000, y - 20, 120, 30, 0x3498db)
            .setInteractive()
            .on('pointerover', () => editButton.setFillStyle(0x2980b9))
            .on('pointerout', () => editButton.setFillStyle(0x3498db))
            .on('pointerdown', () => this.editTrial(trial));

        this.add.text(1000, y - 20, 'Edit', {
            fontSize: '16px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

    }

    getStatusColor(status) {
        const colors = {
            'Recruiting': '#2ecc71',
            'Full': '#e74c3c',
            'On Hold': '#f1c40f',
            'Completed': '#3498db'
        };
        return colors[status] || '#fff';
    }

    showAddTrialForm() {
        // Clear existing UI
        this.children.removeAll();

        // Form background
        const formBg = this.add.rectangle(600, 400, 800, 600, 0x2c3e50);

        // Form title
        this.add.text(600, 150, 'Add New Clinical Trial', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // Form fields
        const fields = [
            { label: 'Trial Name:', key: 'name', type: 'text', y: 250 },
            { label: 'Minimum Age:', key: 'minAge', type: 'number', y: 300 },
            { label: 'Maximum Age:', key: 'maxAge', type: 'number', y: 350 },
            { label: 'Gender (Male/Female/Any):', key: 'gender', type: 'text', y: 400 },
            { label: 'Medical Condition:', key: 'condition', type: 'text', y: 450 },
            { label: 'Maximum Volunteers:', key: 'maxVolunteers', type: 'number', y: 500 }
        ];

        // Create input fields
        const inputValues = {};
        fields.forEach(field => {
            this.add.text(300, field.y, field.label, {
                fontSize: '20px',
                fill: '#fff',
                fontFamily: 'Arial'
            });

            const inputBg = this.add.rectangle(600, field.y, 300, 40, 0x34495e)
                .setInteractive()
                .on('pointerdown', () => {
                    const prompt = field.type === 'number' ? 
                        parseInt(window.prompt(field.label)) : 
                        window.prompt(field.label);
                    if (prompt !== null) {
                        inputValues[field.key] = prompt;
                        inputText.setText(prompt);
                    }
                });

            const inputText = this.add.text(460, field.y, '', {
                fontSize: '18px',
                fill: '#fff',
                fontFamily: 'Arial'
            }).setOrigin(0, 0.5);
        });

        // Save button
        const saveButton = this.add.rectangle(500, 600, 200, 50, 0x2ecc71)
            .setInteractive()
            .on('pointerover', () => saveButton.setFillStyle(0x27ae60))
            .on('pointerout', () => saveButton.setFillStyle(0x2ecc71))
            .on('pointerdown', () => {
                if (this.validateTrialData(inputValues)) {
                    this.addNewTrial(inputValues);
                    this.scene.restart();
                }
            });

        this.add.text(500, 600, 'Save Trial', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Cancel button
        const cancelButton = this.add.rectangle(700, 600, 200, 50, 0xe74c3c)
            .setInteractive()
            .on('pointerover', () => cancelButton.setFillStyle(0xc0392b))
            .on('pointerout', () => cancelButton.setFillStyle(0xe74c3c))
            .on('pointerdown', () => this.scene.restart());

        this.add.text(700, 600, 'Cancel', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    }

    editTrial(trial) {
        // Clear existing UI
        this.children.removeAll();

        // Form background
        const formBg = this.add.rectangle(600, 400, 800, 600, 0x2c3e50);

        // Form title
        this.add.text(600, 150, 'Edit Clinical Trial', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // Form fields with existing values
        const fields = [
            { label: 'Trial Name:', key: 'name', value: trial.name, y: 250 },
            { label: 'Minimum Age:', key: 'minAge', value: trial.minAge, y: 300 },
            { label: 'Maximum Age:', key: 'maxAge', value: trial.maxAge, y: 350 },
            { label: 'Gender:', key: 'gender', value: trial.gender, y: 400 },
            { label: 'Medical Condition:', key: 'condition', value: trial.condition, y: 450 },
            { label: 'Maximum Volunteers:', key: 'maxVolunteers', value: trial.maxVolunteers, y: 500 }
        ];

        // Create input fields with existing values
        const inputValues = { ...trial };
        fields.forEach(field => {
            this.add.text(300, field.y, field.label, {
                fontSize: '20px',
                fill: '#fff',
                fontFamily: 'Arial'
            });

            const inputBg = this.add.rectangle(600, field.y, 300, 40, 0x34495e)
                .setInteractive()
                .on('pointerdown', () => {
                    const prompt = window.prompt(field.label, field.value.toString());
                    if (prompt !== null) {
                        inputValues[field.key] = prompt;
                        inputText.setText(prompt);
                    }
                });

            const inputText = this.add.text(460, field.y, field.value.toString(), {
                fontSize: '18px',
                fill: '#fff',
                fontFamily: 'Arial'
            }).setOrigin(0, 0.5);
        });

        // Update button
        const updateButton = this.add.rectangle(500, 600, 200, 50, 0x2ecc71)
            .setInteractive()
            .on('pointerover', () => updateButton.setFillStyle(0x27ae60))
            .on('pointerout', () => updateButton.setFillStyle(0x2ecc71))
            .on('pointerdown', () => {
                if (this.validateTrialData(inputValues)) {
                    this.updateTrial(trial, inputValues);
                    this.scene.restart();
                }
            });

        this.add.text(500, 600, 'Update Trial', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Cancel button
        const cancelButton = this.add.rectangle(700, 600, 200, 50, 0xe74c3c)
            .setInteractive()
            .on('pointerover', () => cancelButton.setFillStyle(0xc0392b))
            .on('pointerout', () => cancelButton.setFillStyle(0xe74c3c))
            .on('pointerdown', () => this.scene.restart());

        this.add.text(700, 600, 'Cancel', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    }

    validateTrialData(data) {
        if (!data.name || data.name.trim() === '') {
            alert('Trial name is required');
            return false;
        }
        if (isNaN(data.minAge) || isNaN(data.maxAge) || data.minAge >= data.maxAge) {
            alert('Invalid age range');
            return false;
        }
        if (!['Male', 'Female', 'Any'].includes(data.gender)) {
            alert('Gender must be Male, Female, or Any');
            return false;
        }
        if (!data.condition || data.condition.trim() === '') {
            alert('Medical condition is required');
            return false;
        }
        if (isNaN(data.maxVolunteers) || data.maxVolunteers <= 0) {
            alert('Maximum volunteers must be a positive number');
            return false;
        }
        return true;
    }

    addNewTrial(data) {
        const newTrial = {
            ...data,
            icon: '👨‍⚕️',
            difficulty: 'Medium',
            volunteers: 0,
            status: 'Recruiting',
            notes: []
        };
        const trials = this.registry.get('trials');
        trials.push(newTrial);
        this.registry.set('trials', trials);
    }

    updateTrial(oldTrial, newData) {
        const trials = this.registry.get('trials');
        const index = trials.findIndex(t => t.name === oldTrial.name);
        if (index !== -1) {
            trials[index] = {
                ...trials[index],
                ...newData
            };
            this.registry.set('trials', trials);
        }
    }

    addNote(trial) {
        // Implementation for adding notes
        console.log('Add note to trial:', trial.name);
    }

    showTrialDetails(trial) {
        // Implementation for showing detailed view
        console.log('Show trial details:', trial.name);
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

    addVolunteerToTrial(trialIndex) {
        const trials = this.registry.get('trials');
        if (trials[trialIndex].volunteers < trials[trialIndex].maxVolunteers) {
            trials[trialIndex].volunteers++;
            this.registry.set('trials', trials);
            return true;
        }
        return false;
    }
}