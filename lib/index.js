// Import packages

const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Square, Triangle } = require('./shapes');

// Function to create shape based on what the user selects

function createSelectedShape(response) {
    let selectedShape;

    if (response.logoShape === 'Circle') {
        selectedShape = new Circle(response.text, response.textColor, response.shapeColor);
    } else if (response.logoShape === 'Square') {
        selectedShape = new Square(response.text, response.textColor, response.shapeColor);
    } else if (response.logoShape === 'Triangle') {
        selectedShape = new Triangle(response.text, response.textColor, response.shapeColor);
    }

    return selectedShape;
}

// Generating logo based on user input

function writeToFile(response) {
    const selectedShape = createSelectedShape(response);
    if (selectedShape) {
        const svgInfo = selectedShape.render();

        if (!fs.existsSync('./examples')) {
            fs.mkdirSync('./examples');
        }

        const filePath = './examples/logo.svg';

        fs.writeFile(filePath, svgInfo, (err) => {
           if (err) {
            console.error('Error writing to file:', err);
           } else {
            console.log(`Generated SVG Logo and saved to ${filePath}`);
           }
        });
    } else {
        console.log('Error');
    }
}


// Initializing inquirer questions for user input

function init() {
    inquirer.prompt(questions)
    .then((response) => {
        const selectedShape = createSelectedShape(response);
        if (selectedShape) {
            const svgInfo = selectedShape.render();
            writeToFile(response);
        } else {
            console.log('Error');
        }
    });
};


// Array of questions for user input

const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Please enter the text for your logo (note: can only be up to 3 characters).',
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
        type: 'list',
        name: 'logoShape',
        message: 'What shape would you want your logo to be? Select from the options below',
        choices: ['Circle', 'Square', 'Triangle'],
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'What color would you want your shape to be?',
    },
];


init();