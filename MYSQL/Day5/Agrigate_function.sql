

-- Use Database
USE employees;

-- Create Employees Table
CREATE TABLE Employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary INT,
    city VARCHAR(50)
);

-- Insert 20 Employee Records
INSERT INTO Employees (id, name, department, salary, city) VALUES
(1, 'Arun', 'HR', 35000, 'Chennai'),
(2, 'Priya', 'IT', 60000, 'Coimbatore'),
(3, 'Karthik', 'Finance', 55000, 'Madurai'),
(4, 'Divya', 'Marketing', 45000, 'Salem'),
(5, 'Rahul', 'IT', 70000, 'Chennai'),
(6, 'Sneha', 'HR', 40000, 'Trichy'),
(7, 'Vignesh', 'Sales', 38000, 'Erode'),
(8, 'Meena', 'Finance', 62000, 'Coimbatore'),
(9, 'Suresh', 'Marketing', 50000, 'Madurai'),
(10, 'Anitha', 'IT', 75000, 'Chennai'),
(11, 'Ravi', 'Sales', 42000, 'Salem'),
(12, 'Keerthi', 'HR', 39000, 'Trichy'),
(13, 'Manoj', 'Finance', 68000, 'Erode'),
(14, 'Pooja', 'Marketing', 47000, 'Coimbatore'),
(15, 'Ajith', 'IT', 80000, 'Chennai'),
(16, 'Nisha', 'Sales', 41000, 'Madurai'),
(17, 'Harish', 'HR', 36000, 'Salem'),
(18, 'Deepa', 'Finance', 65000, 'Trichy'),
(19, 'Kiran', 'Marketing', 52000, 'Erode'),
(20, 'Lavanya', 'IT', 85000, 'Coimbatore');

-- Display all records
SELECT * FROM Employees;

-- SELECT count(*) from  Employees;
-- class task
-- -- task 1
-- SELECT  department ,count(*) ittotal from Employees group by department;
-- -- task 2
-- SELECT city , count(*) from Employees group by city;
-- -- task 3
-- SELECT department ,sum(salary) from Employees group by department;
-- -- task 4
-- SELECT city , sum(salary) from Employees group by city;
-- -- task 5
-- SELECT department , avg(salary) from Employees group by department;
-- -- task 6
-- SELECT department , max(salary) from Employees group by department;
-- -- task 7
-- SELECT department , min(salary) from Employees group by department;
-- -- task 8
-- SELECT city , avg(salary) from Employees group by city;
-- -- task 9
-- SELECT department, count(*),sum(salary) from Employees group by  department;
-- -- task 10
-- SELECT city, count(*),max(salary),min(salary) from Employees group by  city;

-- Task - 1
SELECT department, count(*),sum(salary),avg(salary),max(salary),min(salary)from Employees group by department;
-- Task - 2
SELECT city, count(*),max(salary),min(salary),avg(salary) from Employees group by city ORDER BY max(salary) DESC ;
-- Task - 3
SELECT department, count(*)empCount,sum(salary) from Employees group by department ORDER BY max(salary) DESC ;
-- Task - 4
SELECT department , city ,count(*),avg(salary) from Employees group by department, city;
-- Task - 5
SELECT department , count(*),sum(salary),avg(salary),max(salary),min(salary) from Employees group by department ORDER BY sum(salary) DESC LIMIT 3;
use employees;
