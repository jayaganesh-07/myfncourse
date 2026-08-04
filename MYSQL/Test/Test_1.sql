-- Question 1
/*
DBMS:
Database Management System.
Used to store and manage data.
Relationships between data are not mandatory.

RDBMS:
Relational Database Management System.
Stores data in tables.
Tables can be related using Primary Keys and Foreign Keys.
Examples: MySQL, PostgreSQL, Oracle.
*/


-- Question 2
/*
DDL - Data Definition Language
Used to define database structure.
Example:
*/
CREATE TABLE Students (
    id INT,
    name VARCHAR(50)
);

/*
DML - Data Manipulation Language
Used to insert, update and delete data.
Example:
*/
INSERT INTO Students VALUES (1, 'Arun');

/*
DQL - Data Query Language
Used to retrieve data.
Example:
*/
SELECT * FROM Students;

/*
DCL - Data Control Language
Used to control database permissions.
Example:
*/
GRANT SELECT ON Students TO 'user1'@'localhost';

/*
TCL - Transaction Control Language
Used to manage transactions.
Example:
*/
COMMIT;


-- Question 3
CREATE DATABASE CompanyDB;

USE CompanyDB;

CREATE TABLE Employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary DECIMAL(10,2),
    city VARCHAR(50)
);


-- Question 4
/*
DELETE:
Deletes selected rows.
WHERE condition can be used.
Table structure remains.
*/
DELETE FROM Employees
WHERE id = 3;

/*
TRUNCATE:
Deletes all rows from the table.
Table structure remains.
*/
TRUNCATE TABLE Employees;

/*
DROP:
Deletes the entire table including its structure.
*/
DROP TABLE Employees;


-- Question 5
/*
CHAR:
Fixed-length string.
Use when values have the same length.
Example: gender CHAR(1)

VARCHAR:
Variable-length string.
Use when values have different lengths.
Example: name VARCHAR(50)
*/

CREATE TABLE CharExample (
    gender CHAR(1),
    name VARCHAR(50)
);


-- Question 6
USE CompanyDB;

CREATE TABLE IF NOT EXISTS Employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary DECIMAL(10,2),
    city VARCHAR(50)
);

INSERT INTO Employees VALUES
(1, 'Arun', 'IT', 55000, 'Chennai'),
(2, 'Rahul', 'HR', 45000, 'Bangalore'),
(3, 'Priya', 'IT', 65000, 'Chennai'),
(4, 'Kumar', 'Finance', 75000, 'Chennai'),
(5, 'Divya', 'HR', 50000, 'Coimbatore');

UPDATE Employees
SET salary = 70000
WHERE id = 3;

DELETE FROM Employees
WHERE name = 'Rahul';


-- Question 7

-- =
SELECT * FROM Employees
WHERE department = 'IT';

-- >
SELECT * FROM Employees
WHERE salary > 50000;

-- <
SELECT * FROM Employees
WHERE salary < 50000;

-- >=
SELECT * FROM Employees
WHERE salary >= 50000;

-- <=
SELECT * FROM Employees
WHERE salary <= 50000;

-- !=
SELECT * FROM Employees
WHERE city != 'Chennai';

-- AND
SELECT * FROM Employees
WHERE department = 'IT'
AND salary > 50000;

-- OR
SELECT * FROM Employees
WHERE department = 'IT'
OR department = 'HR';

-- IN
SELECT * FROM Employees
WHERE city IN ('Chennai', 'Bangalore');

-- BETWEEN
SELECT * FROM Employees
WHERE salary BETWEEN 40000 AND 60000;

-- LIKE
SELECT * FROM Employees
WHERE name LIKE 'A%';


-- Question 8

-- Highest Salary Employee
SELECT *
FROM Employees
ORDER BY salary DESC
LIMIT 1;

-- Lowest Salary Employee
SELECT *
FROM Employees
ORDER BY salary ASC
LIMIT 1;

-- Top 5 Highest Paid Employees
SELECT *
FROM Employees
ORDER BY salary DESC
LIMIT 5;

-- Employees sorted by Name A-Z
SELECT *
FROM Employees
ORDER BY name ASC;


-- Question 9
/*
WHERE:
Filters individual rows before GROUP BY.

HAVING:
Filters grouped results after GROUP BY.
*/

-- WHERE Example
SELECT *
FROM Employees
WHERE salary > 50000;

-- HAVING Example
SELECT department, COUNT(*) AS employee_count
FROM Employees
GROUP BY department
HAVING COUNT(*) > 2;


-- Question 10

-- COUNT()
SELECT COUNT(*) AS total_employees
FROM Employees;

-- SUM()
SELECT SUM(salary) AS total_salary
FROM Employees;

-- AVG()
SELECT AVG(salary) AS average_salary
FROM Employees;

-- MAX()
SELECT MAX(salary) AS highest_salary
FROM Employees;

-- MIN()
SELECT MIN(salary) AS lowest_salary
FROM Employees;


-- Question 11
SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary
FROM Employees
GROUP BY department;


-- Question 12

-- Departments having more than 3 employees
SELECT
    department,
    COUNT(*) AS employee_count
FROM Employees
GROUP BY department
HAVING COUNT(*) > 3;

-- Departments with average salary greater than 50000
SELECT
    department,
    AVG(salary) AS average_salary
FROM Employees
GROUP BY department
HAVING AVG(salary) > 50000;


-- Question 13

-- UPPER()
SELECT UPPER(name)
FROM Employees;

-- LOWER()
SELECT LOWER(name)
FROM Employees;

-- LENGTH()
SELECT name, LENGTH(name)
FROM Employees;

-- CONCAT()
SELECT CONCAT(name, ' - ', department)
FROM Employees;

-- SUBSTRING()
SELECT SUBSTRING(name, 1, 3)
FROM Employees;

-- REPLACE()
SELECT REPLACE(department, 'IT', 'Software')
FROM Employees;

-- LEFT()
SELECT LEFT(name, 3)
FROM Employees;

-- RIGHT()
SELECT RIGHT(name, 3)
FROM Employees;

-- REVERSE()
SELECT REVERSE(name)
FROM Employees;

-- TRIM()
SELECT TRIM(name)
FROM Employees;


-- Question 14

-- CURDATE()
SELECT CURDATE();

-- NOW()
SELECT NOW();

-- YEAR()
SELECT YEAR(CURDATE());

-- MONTH()
SELECT MONTH(CURDATE());

-- DAY()
SELECT DAY(CURDATE());

-- DATE_FORMAT()
SELECT DATE_FORMAT(CURDATE(), '%d-%m-%Y');

-- DATEDIFF()
SELECT DATEDIFF('2026-12-31', CURDATE());


-- Question 15
SELECT
    department,
    COUNT(*) AS employee_count,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary,
    MAX(salary) AS highest_salary,
    MIN(salary) AS lowest_salary
FROM Employees
WHERE salary > 40000
AND city = 'Chennai'
GROUP BY department
HAVING COUNT(*) > 2
AND AVG(salary) > 60000
ORDER BY total_salary DESC
LIMIT 3;


