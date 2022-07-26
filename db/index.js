const connection = require("./connection");

class DB {

    constructor(connection){
        this.connection = connection;
    }

    findsAllEmployees(){
        return this.connection.promise().query(
            "SELECT * FROM employee"
        )
    };

    findsAllDepartments(){
        return this.connection.promise().query(
            "SELECT * FROM department"
        )
    };

    findsAllRoles(){
        return this.connection.promise().query(
            "SELECT * FROM role"
        )
    };

    addsEmployee(employee){
        return this.connection.promise().query(
            "INSERT INTO employee SET ?", employee
        )
    }

    createsRoles(role){
        return this.connection.promise().query(
            "INSERT INTO role SET ?", role
        )
    }





}

module.exports = new DB(connection)