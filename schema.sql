DROP DATABASE IF EXISTS golf;

CREATE DATABASE golf;

USE golf;

CREATE TABLE golfers (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(50),
  last_name varchar(50),
  phone varchar(10),
  email varchar(50),
  password varchar(100),
  city varchar(50),
  state varchar(2),
  handicap int,
  PRIMARY KEY (ID),
  UNIQUE KEY (EMAIL),
  INDEX (EMAIL)
);
/* use sha2(string, 0) to hash password inputs
*/

CREATE TABLE courses (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50),
  city varchar(50),
  state varchar(2),
  booking_url varchar(150),
  website varchar(100),
  PRIMARY KEY (ID)
);

CREATE TABLE golfer_courses (
  golfer_id int NOT NULL,
  course_id int NOT NULL,
  FOREIGN KEY (GOLFER_ID) REFERENCES GOLFERS(ID) ON DELETE CASCADE,
  FOREIGN KEY (COURSE_ID) REFERENCES COURSES(ID) ON DELETE CASCADE
);

CREATE TABLE golf_friends (
  golfer_id int NOT NULL,
  friend_id int NOT NULL,
  FOREIGN KEY (GOLFER_ID) REFERENCES GOLFERS(ID) ON DELETE CASCADE,
  FOREIGN KEY (FRIEND_ID) REFERENCES GOLFERS(ID) ON DELETE CASCADE
);

CREATE TABLE play_times (
  golfer_id int NOT NULL,
  course_id int NOT NULL,
  play_date date,
  start_time time,
  end_time time,
  FOREIGN KEY (GOLFER_ID) REFERENCES GOLFERS(ID) ON DELETE CASCADE,
  FOREIGN KEY (COURSE_ID) REFERENCES COURSES(ID) ON DELETE CASCADE
);

INSERT INTO courses (name, city, state, booking_url, website) VALUES
  ('Presidio Golf Course', 'San Francisco', 'CA', 'https://secure.west.prophetservices.com/Presidiov3/Home/Index?CourseId=3&Date=2017-8-4&Time=AnyTime&Player=4&Hole=18', 'http://www.presidiogolf.com/rates-reservations/'),
  ('Half Moon Bay Golf Links', 'Half Moon Bay', 'CA', 'https://halfmoonbay.ezlinksgolf.com/index.html#/preSearch', 'http://www.halfmoonbaygolf.com/courses.aspx'),
  ('Lincoln Park Golf Course', 'San Francisco', 'CA', 'http://sfrecpark.org/destination/lincoln-park/lincoln-park-golf-course/', 'http://www.lincolnparkgolfcourse.com/rates---info.html'),
  ('TPC Harding Park', 'San Francisco', 'CA', 'https://hardingparkspecialsa.ezlinksgolf.com/index.html#/search', 'https://tpc.com/hardingpark/current-rates/'),
  ('TPC Flemming', 'San Francisco', 'CA', null, 'https://tpc.com/hardingpark/fleming-current-rates/'),
  ('Golden Gate Park Golf Course', 'San Francisco', 'CA', 'https://foreupsoftware.com/index.php/booking/index/18723#teetimes', 'http://goldengateparkgolf.com/golf-course/rates/'),
  ('Gleneagles at McLaren Park', 'San Francisco', 'CA', 'https://gleneaglesgcres.ezlinks.com/Search/ReservationChannel.aspx', 'http://www.gleneaglesgolfsf.com/rates/'),
  ('Sharp Park Golf Course', 'Pacifica', 'CA', 'https://sharppark.ezlinks.com/Search/ReservationChannel.aspx', 'http://sfrecpark.org/destination/sharp-park/sharp-park-golf-course/');

INSERT INTO golfers (first_name, last_name, phone, email, password, city, state) VALUES
  ('Kelly', 'Whiting', '4153146506', 'kwhiting@gmail.com', SHA2('hackreactor', 0), 'San Francisco', 'CA');

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
