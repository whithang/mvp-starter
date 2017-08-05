var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'golf'
});

connection.connect();

module.exports.selectPlayTimes = function(callback) {
  connection.query('SELECT * FROM play_times', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.selectGolfers = function(callback) {
  connection.query('SELECT * FROM golfers', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.addGolfer = function(golfer, callback) {
  //golfer input format is {col: value}
  // SHA2('hackreactor', 0)
  // golfer['password'] = 'SHA2(' + golfer['password'] + ', 0)';
  console.log('*********golfer data ', golfer);

  connection.query('INSERT INTO golfers (first_name, last_name, phone, email, password, city, state, handicap) VALUES ' +//(?),
    `('${golfer.first_name}', '${golfer.last_name}', '${golfer.phone}', '${golfer.email}', SHA2('${golfer.password}', 0), '${golfer.city}', '${golfer.state}', ${golfer.handicap})`,
    golfer, function(err, results, fields) {
      if(err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
  });
};

module.exports.addPlayTimes = function(schedule, callback) {
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
