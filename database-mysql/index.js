var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'golf'
});

var selectAll = function(callback) {
  connection.query('SELECT * FROM play_times', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var addGolfer = function(golfer, callback) {
  //golfer input format is {col: value}
  connection.query('INSERT INTO golfers (first_name, last_name, phone, email, password, city, state, handicap) SET ?',
    golfer, function(err, results, fields) {
      if(err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
  });
};

var addPlayTimes = function(schedule, callback) {
  //schedule input format is {col: value}
  connection.query('INSERT INTO play_times (golfer_id, course_id, play_date, start_time, end_time) SET ?',
    schedule, function(err, results, fields) {
      if(err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
  });
};

module.exports.selectAll = selectAll;
