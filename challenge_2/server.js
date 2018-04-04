// var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');  
var fs = require('fs');

var port = process.env.port || 3000;
var fileDirectory = path.join(__dirname, 'csv/csv.csv');

var app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));

app.get('/csv', function(req, res){
  fs.readFile('./csv/csv.txt', function(err, result){
    if(err){
      res.statusCode = 404;
      res.end(JSON.stringify(err));
      return;
    }
    res.statusCode = 200;
    res.send(JSON.stringify(result));
  });
});

app.post('/csv', function(req, res) {
  // find keys in req.body
  var keys = Object.keys(req.body);
  // string at end
  var results = keys.join(',')
  var arr = [req.body.firstName, req.body.lastName, req.body.county, req.body.city, req.body.role, req.body.ales, req.body.children];



  fs.appendFile(fileDirectory, end, function(err){
    if(err){
      res.statusCode = 400;
      res.end(JSON.stringify(err))
      return;
    }
    res.statusCode = 201;
    res.end();
  });
});


// Logging and parsing
// app.use(parser.json());


app.listen(port, function () {
  console.log('Listening on ' + port);
});