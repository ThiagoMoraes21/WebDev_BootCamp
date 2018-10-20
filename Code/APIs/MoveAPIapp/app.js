// General search:
// http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb
//
// Search with Movie ID:
// http://www.omdbapi.com/?i=tt3896198&apikey=thewdb

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var request = require('request');
var bodyParser = require('body-parser');

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("search");
});

app.get("/results", function(req, res){
  var query = req.query.search;
  var url = 'http://www.omdbapi.com/?s=' + query + '&apikey=thewdb';

  request(url , function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.

    var data = JSON.parse(body);
    console.log(data);
    res.render("results", {data: data});
  });
});


app.listen(port, function(){
  console.log("Server is running on port " + port);
});
