CREATE DATABASE fronteneddb;
USE fronteneddb;

CREATE TABLE users (
    userid INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50),
    useremail VARCHAR(200) UNIQUE,
    userage VARCHAR(200),
	Created_at DATE DEFAULT (CURRENT_DATE)
    );
DESC users;


INSERT INTO users(username,useremail,userage,Created_at) VALUES ( "JAII","JAII@GMAIL.COM",45,CURRENT_DATE())
