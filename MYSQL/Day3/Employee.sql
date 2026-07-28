CREATE DATABASE CompanyDB;
USE CompanyDB;
-- task1
-- Create Employees Table
CREATE TABLE Employees (
id INT PRIMARY KEY auto_increment,
name varchar(100),
department varchar(100),
salary varchar(100),
city varchar(100)
);

-- Insert 5 Employee Records
INSERT INTO Employees (name, department, salary, city)
VALUES
('Jaya Ganesh', 'IT', 50000.00, 'Coimbatore'),
('Rahul', 'software_developer', 42000.00, 'Chennai'),
('Priya', 'Finance', 55000.00, 'Madurai'),
('Arun', 'Marketing', 48000.00, 'Salem'),
('Sneha', 'Sales', 46000.00, 'Trichy');


-- tas2
 -- Student Database
  CREATE TABLE Student(
  student_id INT PRIMARY KEY auto_increment,
  student_name VARCHAR (50),
  course VARCHAR(100),
  age INT ,
  city VARCHAR(200)
  
  );
  select * from student;
  INSERT INTO Student  (student_name,course,age,city)
  VALUES("Naveen","CSE",34,"Kolkatha"),
 ("Vijay","ECE",44,"Erode"),
 ("Harun","EEE",88,"Chennai"),
 ("jaii","CSE",89,"Pune"),
  ("Saran","CSE",78,"Madurai"),
  ("Rahul","CSE",33,"Mumbai"),
 ("Gokul","ECE",09,"Erode"),
 ("Harun","EEE",34,"Chennai");
  
  
  --  task 3
  UPDATE Employees SET salary=70000 where id=3;
select * FROM Employees;


-- task 4
UPDATE Employees SET department="Team Lead" WHERE id=2;
UPDATE Employees SET city="Banglore"   WHERE id=2;

-- task 5

DELETE FROM  Employees where id=5;

-- TASK 6
UPDATE Employees 	SET salary=salary+10000 where department="software_developer";

-- task 7
UPDATE Student
SET city = 'Chennai'
WHERE city = 'Bangalore';
  