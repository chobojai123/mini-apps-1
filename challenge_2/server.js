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

// app.get('/csv', function(req, res){
//   fs.readFile('./csv/csv.txt', function(err, result){
//     if(err){
//       res.statusCode = 404;
//       res.end(JSON.stringify(err));
//       return;
//     }
//     res.statusCode = 200;
//     res.send(JSON.stringify(result));
//   });
// });

app.post('/csv', function(req, res) {
  var convertToCSV = function (data){
    var keys = Object.keys(data);
    var line = '';
    for(var i = 0; i < keys.length - 1; i++){
      line += keys[i] + ',';
    }
    line = line.slice(0, -1);
    line += '\n'

    var recursion = function(data){
      var newLine = '';
      for(var i = 0; i < keys.length - 1; i ++){
        newLine += data[keys[i]] + ',';
        newLine = newLine.slice(0, -1);
      }
      newLine += '\n';
      for(var i = 0; i < data.children.length; i++){
        newLine += recursion(data.children[i]);
      }
      return newLine;
    }
    recursion(data);
  }
  convertToCSV(req.body);

  fs.appendFile(fileDirectory, 'hi' ,function(err){
    if(err){
      res.statusCode = 400;
      res.end(JSON.stringify(err))
      return;
    }
    res.statusCode = 201;
    res.end();
  });
});


app.listen(port, function () {
  console.log('Listening on ' + port);
});