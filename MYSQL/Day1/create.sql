CREATE DATABASE fronteneddb;
USE fronteneddb;

CREATE TABLE usersS (
    userid INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50),
    useremail VARCHAR(200) UNIQUE,
    userpassword VARCHAR(200),
    Created_by VARCHAR(200) DEFAULT 'Admin',
    Created_at DATE,
    updated_by VARCHAR(200),
    updated_at DATE
);
DESC usersS;




