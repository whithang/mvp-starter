var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'volunteer'
});

connection.connect();

module.exports.selectUsers = function(callback) {
  connection.query('SELECT * FROM volunteers', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.addUser = function(user, callback) {
  connection.query('INSERT INTO volunteers (first_name, last_name, phone, email, password, city, state) VALUES ' +
    `('${user.first_name}', '${user.last_name}', '${user.phone}', '${user.email}', SHA2('${user.password}', 0), '${user.city}', '${user.state}')`,
    function(err, results, fields) {
      if(err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
  });
};

module.exports.selectLocations = function(callback) {
  connection.query('SELECT * FROM locations', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.addLocations = function(location, callback) {
  connection.query('INSERT INTO locations (name, phone, email, password, city, state, website) VALUES ' +
    `('${location.name}', '${location.phone}', '${location.email}', SHA2('${location.password}', 0), '${location.city}', '${location.state}, '${location.website}')`,
    function(err, results, fields) {
      if(err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
  });
};

module.exports.selectVolunteerSlots = function(callback) {
  connection.query('SELECT * FROM volunteer_slots', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.addVolunteerSlots = function(schedule, callback) {
  //schedule input format is {col: value}
  connection.query('INSERT INTO volunteer_slots (location_id, volunteer_date, start_time, end_time, num_volunteers_booked, num_volunteers_needed) VALUES ' +
  `('${schedule.location_id}', '${schedule.volunteer_date}', '${schedule.start_time}', '${schedule.end_time}', '${schedule.num_volunteers_booked}', '$${schedule.num_volunteers_needed}')`,
    schedule, function(err, results, fields) {
      if(err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
  });
};

module.exports.selectVolunteerBookings = function(callback) {
  connection.query('SELECT * FROM volunteer_bookings', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.addVolunteerBookings = function(schedule, callback) {
  //schedule input format is {col: value}
  connection.query('INSERT INTO volunteer_bookings (volunteer_id, slot_id) VALUES ' +
  `('${schedule.volunteer_id}', '${schedule.slot_id}')`,
    schedule, function(err, results, fields) {
      if(err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
  });
};

// module.exports.getUser = function(id) {
//   connection.query('SELECT first_name FROM volunteers WHERE id=' + id,
//     function(err, results, fields) {
//       if(err) {
//         callback(err, null);
//       } else {
//         callback(null, results);
//       }
//   });
// }
