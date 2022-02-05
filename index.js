const inquirer = require('inquirer');
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
const { writeFile, copyFile } = require('./lib/generateFile.js');
const generateHTML = require('./src/html-template.js');
let id = 0;

function generateid() {
    id++;
    return id;
}

const promptManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'managerName',
            message: "Please enter the manager's name: (Required)",
            validate: managerName => { 
                if (managerName.length <= 0)return"Please enter a managers name!"

                return true
            }
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: "Please enter the manager's Email: (Required)",
            validate: managerEmail => {
                if (managerEmail.length <= 0)return"Please enter a managers email!"
                return true
            }
        },
        {
            type: 'input',
            name: 'managerNumber',
            message: "Please enter the manager's office number: (Required)",
            validate: managerNumber => {
                if (managerNumber.length <= 0)return"Please enter the office managers number!"
                return true

            }
        }
    ])
}

const promptEmployee = employeeData => {
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
                message: "Please enter the employee's name: (Required)",
                when: confirmEmployee => confirmEmployee.newEmployee,
                validate: name => {

                    if(name.length <= 0)return "Please enter the employee's name!"
                    return true 
                }
            },
            {
                type: 'input',
                name: 'employeeEmail',
                message: "Please enter the employee's Email: (Required)",
                when: confirmEmployee => confirmEmployee.newEmployee,
                validate: email => {

                    if(email.length <= 0)return "Please enter the employee's email!"
                    return true
                    
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
                message: "Enter github username: (Required)",
                when: role => role.employeeRole === 'Engineer',
                validate: github => {
                    if (github) {
                        return true;
                    } else {
                        console.log("Please enter a github username!");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'school',
                message: "Enter school name: (Required)",
                when: role => role.employeeRole === 'Intern',
                validate: school => {
                    if (school) {
                        return true;
                    } else {
                        console.log("Please enter a School Name!");
                        return false;
                    }
                }
            }
        ])
        .then(newEmployee => {
            employeeData.employees.push(newEmployee);
            if (newEmployee.newEmployee) {
                return promptEmployee(employeeData)
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