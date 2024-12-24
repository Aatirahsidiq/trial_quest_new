import Phaser from 'phaser';
import MainMenuScene from './scenes/MainMenuScene';
import RoleSelectionScene from './scenes/RoleSelectionScene';
import DoctorCard from './scenes/DoctorCard';
import DoctorTrialScene from './scenes/DoctorTrialScene';
import VolunteerCard from './scenes/VolunteerCard';
import VolunteerTrialScene from './scenes/VolunteerTrialScene';
import ScientistCard from './scenes/ScientistCard';
import ScientistTrialScene from './scenes/ScientistTrialScene';
import PuzzleScene from './scenes/PuzzleScene';

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1200,
    height: 800,
    backgroundColor: '#1a2a3f',
    scene: [
        MainMenuScene,
        RoleSelectionScene,
        DoctorCard,
        DoctorTrialScene,
        VolunteerCard,
        VolunteerTrialScene,
        ScientistCard,
        ScientistTrialScene,
        PuzzleScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

// Create the game instance
const game = new Phaser.Game(config);

// Initialize shared data
game.registry.set('trials', [
    {
        name: "Early Cancer Detection Trial",
        minAge: 25,
        maxAge: 45,
        gender: 'Female',
        condition: 'Cancer',
        icon: '🔬',
        difficulty: 'Easy',
        volunteers: 0,
        maxVolunteers: 10,
        status: 'Recruiting',
        notes: [],
        compliance: 95,
        dataQuality: 90
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
        maxVolunteers: 15,
        status: 'Recruiting',
        notes: [],
        compliance: 88,
        dataQuality: 85
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
        maxVolunteers: 20,
        status: 'Recruiting',
        notes: [],
        compliance: 92,
        dataQuality: 88
    }
]);

// Initialize game state
game.registry.set('gameState', {
    score: 0,
    currentRole: null,
    completedTrials: 0
});

export default game; 