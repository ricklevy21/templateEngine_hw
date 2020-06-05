//define dependecies
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = []


//functioin to initiate the process of building a team. starts with adding a manager
const buildTeam = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter manager's name:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter manager's ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter manager's email:"
        },
        {
            type: "input",
            name: "office",
            message: "Enter manager's office number:"
        }
    ]).then(answers => {
        //create a new manager object by using the Manager class constructor
        const manager = new Manager(answers.name, answers.id, answers.email, answers.office)
        //add the manager to the team array
        team.push(manager)
        //console.log(team)
        //call funtion to see if more people need to be added to the team
        addToTeam()
    })
    //catch error
    .catch(err =>{
        console.log(err)
    })
}

//function to inquire if more people need to be added to the team
const addToTeam = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "add",
            message: "Would you like to add another person to your team?",
            choices: [
                "Add an Intern",
                "Add and Engineer",
                "No, I am finished adding people to the team."
            ]
        }
    ]).then(answers => {
        //console.log(answers)
        //call the function that adds an intern if "intern" is selected
        if (answers.add === "Add an Intern"){
            addIntern()
        } else if (answers.add === "Add and Engineer"){
            addEngineer()
        } else if (answers.add === "No, I am finished adding people to the team."){
            render(team)
        }
    })
}

//function that allows user to add an intern to the team
const addIntern = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter intern's name:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter intern's ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter intern's email:"
        },
        {
            type: "input",
            name: "school",
            message: "Enter intern's school:"
        }
    ]).then(answers => {
        //create a new intern object using the Intern class constuctor
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
        //add the intern to the team array
        team.push(intern)
        //console.log(team)
        //call funtion to see if more people need to be added to the team
        addToTeam()
    })
}

//function that allows user to add an engineer to the team
const addEngineer = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter engineer's name:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter engineer's ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter engineer's email:"
        },
        {
            type: "input",
            name: "github",
            message: "Enter engineer's github username:"
        }
    ]).then(answers => {
        //create a new engineer object using the Intern class constuctor
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
        //add the engineer to the team array
        team.push(engineer)
        //console.log(team)
        //call funtion to see if more people need to be added to the team
        addToTeam()
    })
}



buildTeam()


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
