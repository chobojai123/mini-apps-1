var express = require('express');
var parseurl = require('parseurl');
var bodyParser = require('body-parser');
var path = require('path');


var port = process.env.port || 3000;

var app = express();


app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function () {
  console.log('Listening on ' + port);
});