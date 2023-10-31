// Import packages

const inquirer = require('inquirer');
const fs = require('fs');
const shapes = require('./lib/shapes');

// Array of questions for user input

const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Please enter the text for your logo (note: can only be up to 3 characters.',
        validate: (answer) => {
            if (answer.length > 3) {
                return console.log('Please make sure your text is no more than 3 characters');
            } else {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'What color would you like the text of your logo to be?',
    },
    {
        type: 'input',
        name: 'logoShape',
        message: 'What shape would you want your logo to be? Select from the options below',
        choices: ['Circle, Square, Triangle'],
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'What color would you want your shape to be?',
    },
];

// Initializing inquirer questions for user input

function init() {
    inquirer.prompt(questions)
    .then((response) => {
        writeToFile(response)
    });
};

// Generating logo based on user input

function writeToFile(response) {
    fs.writeFile('./')
}
