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

const employeePrompt = employeeData => {

    if (!employeeData.employees) {
        employeeData.employees = [];
    }

    return inquirer.prompt([

            {
                type: 'confirm',
                name: 'newEmployee',
                message: "Would you like to add a new Employee?",
                default: true
            },

            {
                type: 'input',
                name: 'employeeName',
                message: "Please enter the employee's name:",
                when: confirmEmployee => confirmEmployee.newEmployee,
                validate: name => {
                    if (name) {
                        return true;
                    } else {
                        console.log("Error - please enter a name");
                        return false;
                    }
                }
            },

            {
                type: 'input',
                name: 'employeeEmail',
                message: "Please enter the employee's Email:",
                when: confirmEmployee => confirmEmployee.newEmployee,
                validate: email => {
                    if (email) {
                        return true;
                    } else {
                        console.log("Error - please enter an email");
                        return false;
                    }
                }
            },

            {
                type: 'list',
                name: 'employeeRole',
                message: "Select employee's role: (Required)",
                when: confirmEmployee => confirmEmployee.newEmployee,
                choices: ['Engineer', 'Intern']
            },

            {
                type: 'input',
                name: 'github',
                message: "Enter github username:",
                when: role => role.employeeRole === 'Engineer',
                validate: github => {
                    if (github) {
                        return true;
                    } else {
                        console.log("Error - please enter github");
                        return false;
                    }
                }
            },

            {
                type: 'input',
                name: 'school',
                message: "Please enter school name:",
                when: role => role.employeeRole === 'Intern',
                validate: school => {
                    if (school) {
                        return true;
                    } else {
                        console.log("Error - please enter a school name");
                        return false;
                    }
                }
            }
        ])
        .then(newEmployee => {

            employeeData.employees.push(newEmployee);

            if (newEmployee.newEmployee) {

                return employeePrompt(employeeData)
            } else {
                return employeeData;
            }
        });
}

promptManager()
    .then(promptEmployee)
    .then(answers => {
        let team = [];
        const manager = new Manager(answers.managerName, generateid(), answers.managerEmail, answers.managerNumber);
        team.push(manager);
        answers.employees.forEach(employee => {
            if (employee.newEmployee) {
                switch (employee.employeeRole) {
                    case 'Engineer':
                        const engineer = new Engineer(employee.employeeName, generateid(), employee.employeeEmail, employee.github);
                        team.push(engineer);
                        break;
                    case 'Intern':
                        const intern = new Intern(employee.employeeName, generateid(), employee.employeeEmail, employee.school);
                        team.push(intern);
                        break;
                }
            }
        })

        return team;
    })
    .then(teamData => {
        return generateHTML(teamData);
    })
    .then(htmlData => {
        writeFile(htmlData);
        copyFile();
    })
    .catch(err => {
        console.log(err);
    });