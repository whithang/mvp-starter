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
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    console.log('********data sent to post playtimes ', body);
    //need to confirm data format is {col: value}
    database.addPlayTimes(body, function(err, data) {
      if(err) {
        res.sendStatus(500);
      } else {
        // res.sendStatus(201);
        console.log('*******add PlayTimes completed ', data);
        res.json(data); //need to parse on receipt on client side
      }
    });
  }).on('error', (err) => {
    console.error(err);
    res.sendStatus(400);
  });
});

app.post('/golfers', function (req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body+= chunk;
  }).on('end', () => {
    body = JSON.parse(body);
    //need to confirm data format is {col: value}
    database.addGolfer(body, function(err, data) {
      if(err) {
        console.log('*****add Golfer error ', err);
        res.sendStatus(500);
      } else {
        // res.sendStatus(201);
        console.log('*******add Golfer completed ', data);
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
