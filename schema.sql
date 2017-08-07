DROP DATABASE IF EXISTS volunteer;

CREATE DATABASE volunteer;

USE volunteer;

CREATE TABLE volunteers (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(50),
  last_name varchar(50),
  phone varchar(10),
  email varchar(50),
  password varchar(100),
  city varchar(50),
  state varchar(2),
  PRIMARY KEY (ID),
  UNIQUE KEY (EMAIL),
  INDEX (EMAIL)
);

CREATE TABLE locations (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50),
  phone varchar(10),
  email varchar(50),
  password varchar(100),
  city varchar(50),
  state varchar(2),
  website varchar(100),
  PRIMARY KEY (ID)
);

CREATE TABLE volunteer_slots (
  slot_id int NOT NULL AUTO_INCREMENT,
  location_id int NOT NULL,
  volunteer_date date,
  start_time time,
  end_time time,
  num_volunteers_booked int,
  num_volunteers_needed int,
  PRIMARY KEY (slot_id),
  FOREIGN KEY (location_id) REFERENCES locations(ID) ON DELETE CASCADE
);

CREATE TABLE volunteer_bookings (
  volunteer_id int NOT NULL,
  slot_id int NOT NULL,
  FOREIGN KEY (volunteer_id) REFERENCES volunteers(ID) ON DELETE CASCADE,
  FOREIGN KEY (slot_id) REFERENCES volunteer_slots(slot_id) ON DELETE CASCADE
);

INSERT INTO volunteers (first_name, last_name, phone, email, password, city, state) VALUES
  ('Kelly', 'Whiting', '4153146506', 'kwhiting@gmail.com', SHA2('hackreactor', 0), 'San Francisco', 'CA');


/*  start sql server with cmd: mysql.server start
 *  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/
