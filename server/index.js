var express = require('express');
// var bodyParser = require('body-parser'); //instead of chunks?
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var database = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/volunteer_slots', function (req, res) {
  database.selectVolunteerSlots(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data); //need to parse on receipt on client side
    }
  });
});

app.get('/users', function (req, res) {
  database.selectUsers(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data); //need to parse on receipt on client side
    }
  });
});

app.post('/volunteer_slots', function (req, res) {
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    //need to confirm data format is {col: value}
    database.addVolunteerSlot(body, function(err, data) {
      if(err) {
        res.sendStatus(500);
      } else {
        // res.sendStatus(201);
        res.json(data); //need to parse on receipt on client side
      }
    });
  }).on('error', (err) => {
    console.error(err);
    res.sendStatus(400);
  });
});

app.post('/users', function (req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body+= chunk;
  }).on('end', () => {
    body = JSON.parse(body);
    //need to confirm data format is {col: value}
    database.addUser(body, function(err, data) {
      if(err) {
        console.log('*****')
        res.sendStatus(500);
      } else {
        // res.sendStatus(201);
        res.json(data); //need to parse on receipt on client side
      }
    });
  }).on('error', (err) => {
    console.error(err);
    res.sendStatus(400);
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
