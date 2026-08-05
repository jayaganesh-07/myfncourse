use employees;
-- Task 1
select avg(salary) from employe;
select * from employe where salary > (select avg(salary) from employe);
-- Task 2
select max(salary) from employe;
select * from employe where salary >= (select max(salary) from employe);
-- Task 3
select min(salary) from employe;
select * from employe where salary >= (select min(salary) from employe);
-- Task 4
select department from employe where name = "Rahul";
select * from employe where department = (select department from employe where name = "Rahul");


