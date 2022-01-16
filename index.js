const inquirer = require('inquirer')
const Manager = require('./lib/Manager.js')
const Engineer = require('./lib/Engineer.js')
const Intern = require('./lib/Intern.js')
const { writeFile, copyFile } = require('./lib/generateFile.js');
// const generateHTML = require('./src/html-template.js');
let id = 0;


function generateid() {
    id++;
    return id;
}

const managerPrompt = () => {
  
    return inquirer.prompt([
        {
            type: 'input',
            name: 'managerName',
            message: "Please enter the manager's name:",
            validate: managerName => {
                if (managerName) {
                    return true;
                } else {
                    console.log("Error - please enter manager's name")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: "Please enter the manager's email:",
            validate: managerEmail => {
                if (managerEmail) {
                    return true;
                } else {
                    console.log("Error - please enter manager's email")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'managerNumber',
            message: "Please enter the manager's office number:",
            validate: managerNumber => {
                if (managerNumber) {
                    return true;
                } else {
                    console.log("Error - please enter the manager's office number")
                    return false;
                }
            }
        }
    ])
}

