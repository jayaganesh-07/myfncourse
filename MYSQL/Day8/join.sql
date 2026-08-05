CREATE DATABASE CinemaDB;
USE CinemaDB;



CREATE TABLE Movies (
    movie_id INT PRIMARY KEY AUTO_INCREMENT,
    movie_name VARCHAR(100),
    director_id INT,
    genre_id INT,
    release_year INT,
    duration INT
);
CREATE TABLE Actors (
    actor_id INT PRIMARY KEY AUTO_INCREMENT,
    actor_name VARCHAR(100),
    movie_id INT
);
CREATE TABLE Directors (
    director_id INT PRIMARY KEY AUTO_INCREMENT,
    director_name VARCHAR(100)
);
CREATE TABLE Genres (
    genre_id INT PRIMARY KEY AUTO_INCREMENT,
    genre_name VARCHAR(50)
);
CREATE TABLE Theaters (
    theater_id INT PRIMARY KEY AUTO_INCREMENT,
    theater_name VARCHAR(100),
    city VARCHAR(50)
);
CREATE TABLE Screens (
    screen_id INT PRIMARY KEY AUTO_INCREMENT,
    theater_id INT,
    screen_name VARCHAR(50),
    capacity INT
);
CREATE TABLE Shows (
    show_id INT PRIMARY KEY AUTO_INCREMENT,
    movie_id INT,
    screen_id INT,
    show_date DATE,
    show_time TIME
);
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(15)
);
CREATE TABLE Bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    show_id INT,
    booking_date DATE,
    total_amount DECIMAL(10,2)
);
CREATE TABLE Tickets (
    ticket_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    seat_number VARCHAR(10),
    ticket_price DECIMAL(10,2)
);

INSERT INTO Directors (director_name) VALUES
('Lokesh Kanagaraj'),
('Atlee'),
('Mani Ratnam'),
('Vetrimaaran'),
('Shankar');
INSERT INTO Genres (genre_name) VALUES
('Action'),
('Drama'),
('Romance'),
('Thriller'),
('Science Fiction');
INSERT INTO Movies
(movie_name, director_id, genre_id, release_year, duration)
VALUES
('Leo', 1, 1, 2023, 164),
('Jawan', 2, 1, 2023, 169),
('Ponniyin Selvan', 3, 2, 2022, 167),
('Viduthalai', 4, 4, 2023, 175),
('2.0', 5, 5, 2018, 148);
INSERT INTO Actors (actor_name, movie_id) VALUES
('Vijay', 1),
('Trisha', 1),
('Shah Rukh Khan', 2),
('Nayanthara', 2),
('Vikram', 3),
('Aishwarya Rai', 3),
('Soori', 4),
('Rajinikanth', 5),
('Akshay Kumar', 5);
INSERT INTO Theaters (theater_name, city) VALUES
('PVR Cinemas', 'Chennai'),
('INOX', 'Coimbatore'),
('AGS Cinemas', 'Chennai'),
('Rohini Silver Screens', 'Chennai'),
('KG Cinemas', 'Coimbatore');

INSERT INTO Screens
(theater_id, screen_name, capacity)
VALUES
(1, 'Screen 1', 200),
(1, 'Screen 2', 150),
(2, 'Screen 1', 180),
(3, 'Screen 1', 250),
(4, 'Screen 1', 220),
(5, 'Screen 1', 300);
INSERT INTO Shows
(movie_id, screen_id, show_date, show_time)
VALUES
(1, 1, '2026-08-05', '10:00:00'),
(1, 2, '2026-08-05', '18:00:00'),
(2, 3, '2026-08-05', '14:00:00'),
(3, 4, '2026-08-06', '18:00:00'),
(4, 5, '2026-08-06', '11:00:00'),
(5, 6, '2026-08-06', '19:00:00');

INSERT INTO Customers
(customer_name, email, phone)
VALUES
('Arun', 'arun@gmail.com', '9876543210'),
('Priya', 'priya@gmail.com', '9876543211'),
('Karthik', 'karthik@gmail.com', '9876543212'),
('Divya', 'divya@gmail.com', '9876543213'),
('Rahul', 'rahul@gmail.com', '9876543214'),
('Sneha', 'sneha@gmail.com', '9876543215');


INSERT INTO Bookings
(customer_id, show_id, booking_date, total_amount)
VALUES
(1, 1, '2026-08-04', 500.00),
(2, 2, '2026-08-04', 500.00),
(3, 3, '2026-08-04', 700.00),
(4, 4, '2026-08-04', 600.00),
(5, 5, '2026-08-04', 400.00),
(6, 6, '2026-08-04', 800.00);
INSERT INTO Tickets
(booking_id, seat_number, ticket_price)
VALUES
(1, 'A1', 250.00),
(1, 'A2', 250.00),
(2, 'B1', 250.00),
(2, 'B2', 250.00),
(3, 'C1', 350.00),
(3, 'C2', 350.00),
(4, 'D1', 300.00),
(4, 'D2', 300.00),
(5, 'E1', 400.00),
(6, 'F1', 400.00),
(6, 'F2', 400.00);

-- Task 1
SELECT Movies.movie_name, Genres.genre_name FROM Movies INNER JOIN Genres ON Movies.genre_id = Genres.genre_id;
-- Task 2
SELECT Movies.movie_name, Directors.director_name FROM Movies INNER JOIN Directors ON Movies.director_id = Directors.director_id;
-- Task 3
SELECT Movies.movie_name, Actors.actor_name FROM Movies INNER JOIN Actors ON Movies.movie_id = Actors.movie_id;
-- Task 4
SELECT
    Customers.customer_name,
    Movies.movie_name,
    Theaters.theater_name
FROM Customers
INNER JOIN Bookings
    ON Customers.customer_id = Bookings.customer_id
INNER JOIN Shows
    ON Bookings.show_id = Shows.show_id
INNER JOIN Movies
    ON Shows.movie_id = Movies.movie_id
INNER JOIN Screens
    ON Shows.screen_id = Screens.screen_id
INNER JOIN Theaters
    ON Screens.theater_id = Theaters.theater_id;
    
-- Task 5
SELECT
    Customers.customer_name,
    Movies.movie_name,
    Tickets.ticket_price,
    Tickets.seat_number
FROM Customers
INNER JOIN Bookings
    ON Customers.customer_id = Bookings.customer_id
INNER JOIN Tickets
    ON Bookings.booking_id = Tickets.booking_id
INNER JOIN Shows
    ON Bookings.show_id = Shows.show_id
INNER JOIN Movies
    ON Shows.movie_id = Movies.movie_id;
