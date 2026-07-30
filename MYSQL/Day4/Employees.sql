

USE Employees;

CREATE TABLE Employe (
    id INT,
    name VARCHAR(100),
    department VARCHAR(50),
    salary INT,
    city VARCHAR(50)
);

INSERT INTO Employe (id, name, department, salary, city)
VALUES
(101, 'Sudhan', 'Developer', 65000, 'Chennai'),
(102, 'Rahul', 'Tester', 40000, 'Madurai'),
(103, 'Karthik', 'Developer', 55000, 'Chennai'),
(104, 'Ajay', 'HR', 35000, 'Salem'),
(105, 'Vijay', 'Manager', 85000, 'Coimbatore'),
(106, 'Arun', 'Developer', 60000, 'Bangalore'),
(107, 'Priya', 'Tester', 45000, 'Chennai'),
(108, 'Divya', 'HR', 30000, 'Madurai'),
(109, 'Surya', 'Developer', 70000, 'Salem'),
(110, 'Anitha', 'Manager', 90000, 'Chennai');
-- task 1
SELECT * FROM Employe;
-- task 2
SELECT name,department,salary FROM Employe;
-- task 3
SELECT  distinct city from Employe;
-- task 4
SELECT * FROM Employe WHERE city = "chennai" ;
-- task 5
SELECT * FROM Employe WHERE salary <= 45000;
-- task 6 (1)
SELECT * FROM Employe WHERE department= 'developer' AND city = 'chennai';
   -- (2)
SELECT * FROM Employe WHERE  city= 'Madurai' OR city = 'salem';
-- task 7
SELECT * FROM Employe WHERE name LIKE 'A%';

SELECT * FROM Employe WHERE name LIKE '%a';

SELECT * FROM Employe WHERE name LIKE '%ya%';

-- task 8

SELECT * FROM Employe WHERE city IN ('Chennai', 'Salem');

SELECT * FROM Employe WHERE salary BETWEEN 45000 AND 70000;

-- task 9
SELECT * FROM Employe ORDER BY salary DESC;

SELECT * FROM Employe ORDER BY name ASC;





