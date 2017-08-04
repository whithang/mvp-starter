var express = require('express');
var bodyParser = require('body-parser'); //instead of chunks?
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var database = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/play_times', function (req, res) {
  database.selectPlayTimes(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data); //need to parse on receipt on client side
    }
  });
});

app.get('/golfers', function (req, res) {
  database.selectGolfers(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data); //need to parse on receipt on client side
    }
  });
});

app.post('/play_times', function (req, res) {
  app.use(bodyParser.json());
  var data = req.body;
  console.log('********data sent to post playtimes ', data);
  //need to confirm data format is {col: value}
  database.addPlayTimes(data, function(err, data) {
    if(err) {
      res.sendStatus(201);
    } else {
      res.json(data); //need to parse on receipt on client side
    }
  });
});

app.post('/golfers', function (req, res) {
  app.use(bodyParser.json());
  var data = req.body;
  console.log('********data sent to post users ', data);
  //need to confirm data format is {col: value}
  database.addGolfer(data, function(err, data) {
    if(err) {
      res.sendStatus(201);
    } else {
      res.json(data); //need to parse on receipt on client side
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
