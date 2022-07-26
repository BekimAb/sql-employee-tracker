const db = require("./db");
const { prompt } = require("inquirer");

mainMenu()

function mainMenu(){
    console.log("mainmenuuuu")
    prompt([
        {
            type: "lists",
            name: "choices",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Departments", "View All Roles", "Add An Employee", "Add A Department", "Add A Role", "Update An Employee Role"]
        }
    ])
    .then((response)=>{
    console.log("responseeeee")
        const userChoice = response.choice;

        switch(userChoice){
            case "View Any And All Employeees":
                viewAnyAndAllEmployees()
            break;
            case "View All Departmentss":
                viewAllOfTheDepartments()
            break;
            case "View All Rolees In The Department":
                viewRolesInTheDeparment()
            break;
            case "Add Employeeee To The Department":
                addEmployeeToTheDepartment()
            break;
            case "Add Roleee For Employee":
                addRoleForEmployee()
            break;
        }
    })
}

function viewAllEmployees(){
    console.log("hit employeees")
    db.findsAllEmployeeess()
    .then(([employees])=>{

        console.table(employees)
        
    })
    .then(()=> mainMenu())
};

function viewAllDepartments(){
    db.findsAllDepartments()
    .then(([departments])=>{

        console.table(departments)
        
    })
    .then(()=> mainMenu())
};

function viewRoles(){
    db.findsAllRoles()
    .then(([roles])=>{

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

        db.findsAllRoles()
        .then(([roles])=>{

            const rolesToBeDisplayed = roles.map(({ id, title})=>({
                name: title,
                value: id
            }));
            prompt([
                {
                    type: "list",
                    name: "roleId",
                    message: "What role would you like to assign this employee?",
                    choices: rolesToBeDisplayed
                }
            ])
            .then((answer)=>{
                let roleId = answer.roleId;

                db.findsAllEmployeeess()
                .then(([employees])=>{

                    const managersToBeDisplayed = employees.map(({ id, first_name, last_name})=>({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }))
                    prompt([
                        {
                            type: "list",
                            name: "managerId",
                            message: "What manager should this employee be assigned to?",
                            choices: managersToBeDisplayed
                        }
                    ])
                    .then((answer)=>{
                        let employee = {
                            manager_id: answer.managerId,
                            role_id: roleId,
                            first_name: firstName,
                            last_name: lastName
                        }

                        db.addsEmployee(employee)
                        .then(()=> console.log(`Added ${firstName} ${lastName} to the database!`))
                        .then(()=> mainMenu())
                    })
                })
            })
        })
    })
}

function addsRole(){
    db.findsAllDepartments()
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
                message: "What is the name of the role you are adding?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the role you are adding?"
            },
            {
                type: "list",
                name: "department_id",
                message: "What dpeartment should this role be assigned to?",
                choices: departmentChoices
            }
        ])
        .then((answer)=>{
            db.createsRoles(answer)
            .then(()=> console.log(`Added ${answer.title} to the database!`))
            .then(()=> mainMenu())
        })
    
})
}