use employees;
-- Task 1
CREATE TABLE emp_insert_backup (
    id INT,
    name VARCHAR(50),
    department VARCHAR(50),
    salary INT,
    city VARCHAR(50)
);


DELIMITER $$

CREATE TRIGGER after_emp_insert
AFTER INSERT ON employees
FOR EACH ROW
BEGIN
    INSERT INTO emp_insert_backup
    (id, name, department, salary, city)
    VALUES
    (NEW.id, NEW.name, NEW.department, NEW.salary, NEW.city);
END $$

DELIMITER ;

INSERT INTO employees
(id, name, department, salary, city)
VALUES
(21, 'Jaya', 'IT', 60000, 'Chennai');


-- Task 2
CREATE TABLE emp_update_backup (
    employee_id INT,
    employee_name VARCHAR(50),
    old_salary INT,
    new_salary INT
);
DELIMITER $$

CREATE TRIGGER after_emp_salary_update
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
   
        INSERT INTO emp_update_backup
        (employee_id, employee_name, old_salary, new_salary)
        VALUES
        (OLD.id, OLD.name, OLD.salary, NEW.salary);
    
END $$

DELIMITER ;

UPDATE employees SET salary = 70000 WHERE id = 1;

-- Task 3
CREATE TABLE emp_delete_backup (
    id INT,
    name VARCHAR(50),
    department VARCHAR(50),
    salary INT,
    city VARCHAR(50)
);

DELIMITER $$

CREATE TRIGGER after_emp_delete
AFTER DELETE ON employees
FOR EACH ROW
BEGIN
    INSERT INTO emp_delete_backup
    (id, name, department, salary, city)
    VALUES
    (OLD.id, OLD.name, OLD.department, OLD.salary, OLD.city);
END $$

DELIMITER ;
DELETE FROM employees WHERE id = 2;

-- Task 4

