-- Task 1
use companydb;
-- Task 2
CREATE TABLE Employe (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary INT,
    city VARCHAR(50)
);
-- Task 3
ALTER TABLE Employe ADD email VARCHAR(100);
ALTER TABLE Employe MODIFY salary DECIMAL(10,2);
ALTER TABLE Employe CHANGE city location VARCHAR(50);
-- Task 4
INSERT INTO Employe
(id, name, department, salary, location, email)
VALUES
(1, 'Arun', 'HR', 35000, 'Chennai', 'arun@gmail.com'),
(2, 'Priya', 'IT', 60000, 'Coimbatore', 'priya@gmail.com'),
(3, 'Karthik', 'Finance', 55000, 'Madurai', 'karthik@gmail.com'),
(4, 'Divya', 'Marketing', 45000, 'Salem', 'divya@gmail.com'),
(5, 'Rahul', 'IT', 70000, 'Chennai', 'rahul@gmail.com'),
(6, 'Sneha', 'HR', 40000, 'Trichy', 'sneha@gmail.com'),
(7, 'Vignesh', 'Sales', 38000, 'Erode', 'vignesh@gmail.com'),
(8, 'Meena', 'Finance', 62000, 'Coimbatore', 'meena@gmail.com'),
(9, 'Suresh', 'Marketing', 50000, 'Madurai', 'suresh@gmail.com'),
(10, 'Anitha', 'IT', 75000, 'Salem', 'anitha@gmail.com');
-- Task 5
UPDATE Employe SET salary = 45000 WHERE id = 1;
UPDATE Employe SET department = "IT" WHERE id = 7;
UPDATE Employe SET salary = 65000, department = 'Software' WHERE id = 2;
-- Task 6
DELETE FROM Employe WHERE id = 10;
DELETE FROM Employe WHERE location = 'Erode';

-- Task 7
SELECT * from Employe;
SELECT name,salary from Employe;
SELECT DISTINCT department from Employe;
SELECT * FROM Employe WHERE salary > 40000;
-- Task 8
SELECT * FROM Employe WHERE department = 'IT' AND salary > 50000;
SELECT * FROM Employe WHERE location = 'Chennai' OR location = 'Madurai';
SELECT * FROM Employe WHERE location IN ('Chennai','Salem');
SELECT * FROM Employe WHERE department NOT IN ('HR','Finance');
SELECT * FROM Employe WHERE salary BETWEEN 40000 AND 70000;
SELECT * FROM Employe WHERE name LIKE '%ra%';
-- Task 9
 SELECT * FROM Employe ORDER BY salary DESC LIMIT 1;
  SELECT * FROM Employe ORDER BY salary ASC LIMIT 1;
   SELECT * FROM Employe ORDER BY salary DESC LIMIT 5;
    SELECT * FROM Employe ORDER BY id DESC LIMIT 3;
-- Task 10
SELECT COUNT(*) AS Total_Employees FROM Employe;
SELECT sum(salary) AS Total_Salary FROM Employe;
Select  avg(salary) AS AVG_Salary from Employe;
SELECT  max(salary) AS Total_Salary FROM Employe ;
SELECT MIN(salary) AS Lowest_Salary FROM Employe;
-- Task 11
SELECT department,COUNT(*) AS employee_count FROM Employe GROUP BY department;
SELECT department,SUM(salary) AS total_salary FROM Employe GROUP BY department;
SELECT location,  AVG(salary) AS average_salary FROM Employe GROUP BY location;
SELECT department,MAX(salary) AS highest_salary FROM Employe GROUP BY department;
-- Task 12
SELECT department,COUNT(*) AS employee_count FROM Employe GROUP BY department HAVING COUNT(*) > 1;
SELECT location,AVG(salary) AS average_salary FROM Employe GROUP BY location HAVING AVG(salary) > 50000;
SELECT department,SUM(salary) AS total_salary FROM Employe GROUP BY department HAVING SUM(salary) > 20000;