const inquirer = require('inquirer')
const Manager = require('./lib/Manager.js')
const Engineer = require('./lib/Engineer.js')
const Intern = require('./lib/Intern.js')
const { writeFile, copyFile } = require('./lib/generateFile.js');
const generateHTML = require('./src/html-template.js');
let id = 0;


function generateid() {
    id++;
    return id;
}