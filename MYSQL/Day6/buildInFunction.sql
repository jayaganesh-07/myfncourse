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
SELECT * FROM Employees;
select department,count(*),sum(salary),avg(salary)  from Employees group by department having count(*) > 2 and avg(salary) >50000 order by sum(salary) desc;
select department ,count(*) from Employees where salary > 60000 group by department having count(*) > 2;