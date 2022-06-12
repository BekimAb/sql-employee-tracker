const db = require("./db");
const { prompt } = require("inquirer");

init()

function init(){
    console.log("Welcome to your employee tracker!")

    mainMenu()
}

function mainMenu(){
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employee", "Add Department", "Add Role", "Update Employee Role"]
        }
    ])
    .then((response)=>{
        const userChoice = response.choice;

        switch(userChoice){
            case "View All Employees":
                viewEmployees()
            break;
            case "View All Departments":
                viewDepartments()
            break;
            case "View All Roles":
                viewRoles()
            break;
            case "Add Employee":
                addEmployee()
            break;
            case "Add Role":
                addRole()
            break;
        }
    })
}

function viewEmployees(){
    db.findAllEmployees()
    .then(([rows])=>{
        let employees = rows;

        console.table(employees)
        
    })
    .then(()=> mainMenu())
};

function viewDepartments(){
    db.findAllDepartments()
    .then(([rows])=>{
        let departments = rows;

        console.table(departments)
        
    })
    .then(()=> mainMenu())
};

function viewRoles(){
    db.findAllRoles()
    .then(([rows])=>{
        let roles = rows;

        console.table(roles)
        
    })
    .then(()=> mainMenu())
};

function addEmployee(){
    prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        }
    ])
    .then((response)=>{
        let firstName = response.first_name;
        let lastName = response.last_name;

        db.findAllRoles()
        .then(([rows])=>{
            let roles = rows;
            const roleChoices = roles.map(({ id, title})=>({
                name: title,
                value: id
            }));
            prompt([
                {
                    type: "list",
                    name: "roleId",
                    message: "What role would you like to assign this employee?",
                    choices: roleChoices
                }
            ])
            .then((answer)=>{
                let roleId = answer.roleId;

                db.findAllEmployees()
                .then(([rows])=>{
                    let employees = rows;
                    const managerChoices = employees.map(({ id, first_name, last_name})=>({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }))
                    prompt([
                        {
                            type: "list",
                            name: "managerId",
                            message: "What manager should this employee be assigned to?",
                            choices: managerChoices
                        }
                    ])
                    .then((answer)=>{
                        let employee = {
                            manager_id: answer.managerId,
                            role_id: roleId,
                            first_name: firstName,
                            last_name: lastName
                        }

                        db.createEmployee(employee)
                        .then(()=> console.log(`Added ${firstName} ${lastName} to the database!`))
                        .then(()=> mainMenu())
                    })
                })
            })
        })
    })
}

function addRole(){
    db.findAllDepartments()
    .then(([rows])=>{
        let departments = rows;
        const departmentChoices = departments.map(({ id, name})=>({
            name: name,
            value: id
        }))
        prompt([
            {
                type: "input",
                name: "title",
                message: "What is the name of the role you're adding?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the role you're adding?"
            },
            {
                type: "list",
                name: "department_id",
                message: "What dpeartment should this role be assigned to?",
                choices: departmentChoices
            }
        ])
        .then((answer)=>{
            db.createRole(answer)
            .then(()=> console.log(`Added ${answer.title} to the database!`))
            .then(()=> mainMenu())
        })
    
})
}