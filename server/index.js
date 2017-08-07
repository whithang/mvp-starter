var express = require('express');
// var Auth = require('./middleware/auth');
// const Cookie = require('./middleware/cookieParser');
// var bodyParser = require('body-parser'); //instead of chunks?
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var database = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
// app.all('/', (req, res, next) => {
//   Cookie(req, res, next);
// });
//
// app.all('/', (req, res, next) => {
//   Auth.createSession(req, res, next);
// });
// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.post('/signup', function (req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body+= chunk;
  }).on('end', () => {
    body = JSON.parse(body);
    //need to confirm data format is {col: value}
    database.addUser(body, function(err, data) {
      if(err) {
        res.status(500).json(data);
      } else {
        // res.sendStatus(201);
        res.status(201).json(data); //need to parse on receipt on client side
      }
    });
  }).on('error', (err) => {
    console.error(err);
    res.status(400).json(err);
  });
});

app.post('/booking', function (req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body+= chunk;
  }).on('end', () => {
    body = JSON.parse(body);
    //need to confirm data format is {col: value}
    database.checkUser(body, function(err, data) {
      if(err) {
        console.log('***** check user failed');
        res.status(500).json(err);
      } else if (data) {
        database.addBooking(body, function(err, data) {
          if(err) {
            console.log('***** booking update error');
            res.status(500).json(err);
          } else {
            // res.sendStatus(201);
            console.log('***** booking update successful');
            res.status(201).json(data); //need to parse on receipt on client side
          }
        });
      } else {
        console.log('No user exists. Try Again');
        res.status(400).json(err);
      }});
    }).on('error', (err) => {
      console.error(err);
      res.status(400).json(err);
  });
});

app.post('/locations', function (req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body+= chunk;
  }).on('end', () => {
    body = JSON.parse(body);
    //need to confirm data format is {col: value}
    database.addLocation(body, function(err, data) {
      if(err) {
        res.status(500).json(err);
      } else {
        // res.sendStatus(201);
        res.status(201).json(data); //need to parse on receipt on client side
      }
    });
  }).on('error', (err) => {
    console.error(err);
    res.status(400).json(err);
  });
});

app.get('/volunteer_slots', function (req, res) {
  database.selectVolunteerSlots(function(err, data) {
    if(err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data); //need to parse on receipt on client side
    }
  });
});
//
// app.get('/users', function (req, res) {
//   database.selectUsers(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data); //need to parse on receipt on client side
//     }
//   });
// });

app.post('/volunteer_slots', function (req, res) {
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    //need to confirm data format is {col: value}
    //first should validate location signin
    database.checkLocation(body, function(err, data) {
      if(err) {
        res.status(500).json(err);
      } else {
        body = JSON.parse(body);
        body['location_id'] = data;
        database.addVolunteerSlot(body, function(err, data) {
          if(err) {
            res.status(500).json(err);
          } else {
            console.log('******** results after add slot ', data);
            res.status(201).json(data); //need to parse on receipt on client side
          }
        });
      }
    });
  }).on('error', (err) => {
    console.error(err);
    res.status(400).json(err);
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
