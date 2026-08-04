CREATE DATABASE ElectionDB;

USE ElectionDB;
CREATE TABLE Voters (
    voter_id INT PRIMARY KEY AUTO_INCREMENT,
    voter_name VARCHAR(100),
    age INT,
    gender VARCHAR(10),
    constituency_id INT
);
CREATE TABLE Political_Parties (
    party_id INT PRIMARY KEY AUTO_INCREMENT,
    party_name VARCHAR(100)
);
CREATE TABLE Constituencies (
    constituency_id INT PRIMARY KEY AUTO_INCREMENT,
    constituency_name VARCHAR(100)
);
CREATE TABLE Candidates (
    candidate_id INT PRIMARY KEY AUTO_INCREMENT,
    candidate_name VARCHAR(100),
    party_id INT,
    constituency_id INT
);
CREATE TABLE Elections (
    election_id INT PRIMARY KEY AUTO_INCREMENT,
    election_name VARCHAR(100),
    election_date DATE
);
CREATE TABLE Polling_Booths (
    booth_id INT PRIMARY KEY AUTO_INCREMENT,
    booth_name VARCHAR(100),
    location VARCHAR(150),
    constituency_id INT
);
CREATE TABLE Votes (
    vote_id INT PRIMARY KEY AUTO_INCREMENT,
    voter_id INT,
    candidate_id INT,
    election_id INT,
    booth_id INT
);
ALTER TABLE Voters ADD CONSTRAINT fk_voter_constituency FOREIGN KEY (constituency_id) REFERENCES Constituencies(constituency_id);
ALTER TABLE Candidates ADD CONSTRAINT fk_candidate_party FOREIGN KEY (party_id) REFERENCES Political_Parties(party_id);
ALTER TABLE Candidates ADD CONSTRAINT fk_candidate_constituency FOREIGN KEY (constituency_id) REFERENCES Constituencies(constituency_id);
ALTER TABLE Polling_Booths
ADD CONSTRAINT fk_booth_constituency
FOREIGN KEY (constituency_id)
REFERENCES Constituencies(constituency_id);

ALTER TABLE Votes
ADD CONSTRAINT fk_vote_voter
FOREIGN KEY (voter_id)
REFERENCES Voters(voter_id);

ALTER TABLE Votes
ADD CONSTRAINT fk_vote_election
FOREIGN KEY (election_id)
REFERENCES Elections(election_id);

ALTER TABLE Votes
ADD CONSTRAINT fk_vote_booth
FOREIGN KEY (booth_id)
REFERENCES Polling_Booths(booth_id);

INSERT INTO Political_Parties (party_name)
VALUES
('ABC Party'),
('People Party'),
('National Party'),
('Progress Party');

INSERT INTO Constituencies (constituency_name)
VALUES
('Chennai Central'),
('Coimbatore North'),
('Madurai East'),
('Salem South');

INSERT INTO Elections (election_name, election_date)
VALUES
('Tamil Nadu Assembly Election 2026', '2026-04-23'),
('Local Body Election 2026', '2026-10-15');

INSERT INTO Candidates
(candidate_name, party_id, constituency_id)
VALUES
('Arun Kumar', 1, 1),
('Priya Devi', 2, 1),
('Karthik Raj', 3, 2),
('Divya Sri', 4, 2),
('Rahul Kumar', 1, 3),
('Meena Devi', 2, 4);

INSERT INTO Voters
(voter_name, age, gender, constituency_id)
VALUES
('Ravi', 35, 'Male', 1),
('Priya', 28, 'Female', 1),
('Kumar', 45, 'Male', 2),
('Anitha', 32, 'Female', 2),
('Suresh', 40, 'Male', 3),
('Divya', 25, 'Female', 3),
('Arun', 50, 'Male', 4),
('Meena', 30, 'Female', 4);

INSERT INTO Polling_Booths
(booth_name, location, constituency_id)
VALUES
('Booth 1', 'Chennai Government School', 1),
('Booth 2', 'Coimbatore Corporation School', 2),
('Booth 3', 'Madurai Government College', 3),
('Booth 4', 'Salem Government School', 4);


INSERT INTO Votes
(voter_id, candidate_id, election_id, booth_id)
VALUES
(1, 1, 1, 1),
(2, 2, 1, 1),
(3, 3, 1, 2),
(4, 3, 1, 2),
(5, 5, 1, 3),
(6, 5, 1, 3),
(7, 6, 1, 4),
(8, 6, 1, 4);

SELECT * FROM Political_Parties;
SELECT * FROM Constituencies;
SELECT * FROM Elections;
SELECT * FROM Candidates;
SELECT * FROM Voters;
SELECT * FROM Polling_Booths;
SELECT * FROM Votes;

CREATE DATABASE HospitalDB;

USE HospitalDB;
CREATE TABLE Departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(100)
);
CREATE TABLE Doctors (
    doctor_id INT PRIMARY KEY AUTO_INCREMENT,
    doctor_name VARCHAR(100),
    specialization VARCHAR(100),
    department_id INT
);
CREATE TABLE Patients (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_name VARCHAR(100),
    age INT,
    gender VARCHAR(10),
    phone VARCHAR(15)
);
CREATE TABLE Appointments (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT,
    doctor_id INT,
    appointment_date DATE,
    status VARCHAR(30)
);
CREATE TABLE Treatments (
    treatment_id INT PRIMARY KEY AUTO_INCREMENT,
    appointment_id INT,
    treatment_name VARCHAR(100),
    treatment_cost DECIMAL(10,2)
);
CREATE TABLE Bills (
    bill_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT,
    bill_date DATE,
    total_amount DECIMAL(10,2)
);
CREATE TABLE Payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    bill_id INT,
    payment_date DATE,
    amount DECIMAL(10,2),
    payment_method VARCHAR(30)
);

ALTER TABLE Doctors
ADD CONSTRAINT fk_doctor_department
FOREIGN KEY (department_id)
REFERENCES Departments(department_id);

ALTER TABLE Appointments
ADD CONSTRAINT fk_appointment_patient
FOREIGN KEY (patient_id)
REFERENCES Patients(patient_id);

ALTER TABLE Appointments
ADD CONSTRAINT fk_appointment_doctor
FOREIGN KEY (doctor_id)
REFERENCES Doctors(doctor_id);

ALTER TABLE Treatments
ADD CONSTRAINT fk_treatment_appointment
FOREIGN KEY (appointment_id)
REFERENCES Appointments(appointment_id);

ALTER TABLE Bills
ADD CONSTRAINT fk_bill_patient
FOREIGN KEY (patient_id)
REFERENCES Patients(patient_id);

ALTER TABLE Payments
ADD CONSTRAINT fk_payment_bill
FOREIGN KEY (bill_id)
REFERENCES Bills(bill_id);


INSERT INTO Departments (department_name)
VALUES
('Cardiology'),
('Neurology'),
('Orthopedics'),
('General Medicine');

INSERT INTO Doctors
(doctor_name, specialization, department_id)
VALUES
('Dr. Arun Kumar', 'Cardiologist', 1),
('Dr. Priya Devi', 'Neurologist', 2),
('Dr. Karthik Raj', 'Orthopedic Surgeon', 3),
('Dr. Meena', 'General Physician', 4);

INSERT INTO Patients
(patient_name, age, gender, phone)
VALUES
('Rahul', 35, 'Male', '9876543210'),
('Anitha', 28, 'Female', '9876543211'),
('Suresh', 45, 'Male', '9876543212'),
('Divya', 32, 'Female', '9876543213'),
('Vignesh', 50, 'Male', '9876543214');

INSERT INTO Appointments
(patient_id, doctor_id, appointment_date, status)
VALUES
(1, 1, '2026-08-01', 'Completed'),
(2, 2, '2026-08-02', 'Completed'),
(3, 3, '2026-08-02', 'Completed'),
(4, 4, '2026-08-03', 'Pending'),
(5, 1, '2026-08-04', 'Completed');

INSERT INTO Treatments
(appointment_id, treatment_name, treatment_cost)
VALUES
(1, 'ECG Test', 1500.00),
(2, 'Brain Scan', 5000.00),
(3, 'Bone X-Ray', 2000.00),
(4, 'General Checkup', 800.00),
(5, 'Heart Checkup', 2500.00);

INSERT INTO Bills
(patient_id, bill_date, total_amount)
VALUES
(1, '2026-08-01', 1500.00),
(2, '2026-08-02', 5000.00),
(3, '2026-08-02', 2000.00),
(4, '2026-08-03', 800.00),
(5, '2026-08-04', 2500.00);

INSERT INTO Payments
(bill_id, payment_date, amount, payment_method)
VALUES
(1, '2026-08-01', 1500.00, 'Cash'),
(2, '2026-08-02', 5000.00, 'UPI'),
(3, '2026-08-02', 2000.00, 'Card'),
(4, '2026-08-03', 800.00, 'Cash'),
(5, '2026-08-04', 2500.00, 'UPI');
