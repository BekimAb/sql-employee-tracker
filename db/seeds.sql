INSERT INTO department
    (name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Lawyer", 200000, 4),
    ("Front End Engineer", 150000, 2),
    ("Sales Lead", 130000, 1),
    ("Accountant", 150000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Bekim", "Abedini", 1, null),
    ("George", "Clooney", 3, 1),
    ("Brad", "Pitt", 4, null),
    ("Mark", "Ronson", 2, 3);