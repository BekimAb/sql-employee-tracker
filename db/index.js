const connection = require("./connection");

class DB {

    constructor(connection){
        this.connection = connection;
    }

    findAllEmployees(){
        return this.connection.promise().query(
            "SELECT * FROM employee"
        )
    };

    findAllDepartments(){
        return this.connection.promise().query(
            "SELECT * FROM department"
        )
    };

    findAllRoles(){
        return this.connection.promise().query(
            "SELECT * FROM role"
        )
    };

    addEmployee(employee){
        return this.connection.promise().query(
            "INSERT INTO employee SET ?", employee
        )
    }

    createRole(role){
        return this.connection.promise().query(
            "INSERT INTO role SET ?", role
        )
    }





}

module.exports = new DB(connection)