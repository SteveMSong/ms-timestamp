var express = require('express');
var app = express();
var path = require('path');
var moment = require('moment');

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/:input', function(req,res) {
  var time;
  if(/^\d{8,}$/.test(req.params.input)) {
    time = moment(req.params.input, "X");
  } else {
    time = moment(req.params.input, "MMMM D, YYYY");
  }
  if(time.isValid()) {
    res.json({
      unix: time.format("X"),
      natural: time.format("MMMM D, YYYY")
    });
  } else {
    res.json({
      unix: null,
      natural: null
    });
  }
});