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

// Initializing inquirer questions for user input

function init() {
    inquirer.prompt(questions)
    .then((response) => {
        const selectedShape = createSelectedShape(response);
        if (selectedShape) {
            const svgInfo = selectedShape.render();
            writeToFile('logo.svg', svgInfo);
        } else {
            console.log('Error');
        }
    });
};

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

function writeToFile(filename, response) {
    const selectedShape = createSelectedShape(response);
    if (selectedShape) {
        const svgInfo = selectedShape.render();
        fs.writeFile('./examples/${filename}', svgInfo, (err) =>
            err ? console.log(err) : console.log('Generated SVG Logo!')
        );
    } else {   
        console.log('Error');
    }
}

function init() {
    inquirer.prompt(questions)
        .then((response) => {
            const selectedShape = createdSelectedShape(response);
            if (selectedShape) {
                const svgInfo = selectedShape.render();
                writeToFile('logo.svg', response);
            } else {
                console.log('Error');
            }
        });
}

init();