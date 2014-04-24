// Express initialization
var express = require('express');
var app = express(express.logger());

app.use(express.json());
app.use(express.urlencoded());
app.set('title', 'nodeapp');
app.use(express.bodyParser());

// Mongo initialization, setting up a connection to a MongoDB (on Heroku or localhost)
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost:27016/scorecenter'; // comp20 is the name of the database we are using in MongoDB

var mongo = require('mongodb');

var db = mongo.Db.connect(mongoUri, function (error, database) {
    db = database;
});

app.get('/scores.json', function (req, res){
  var name = req.query.username;
  if(name == null){
      res.send([]);
  }
  else{
    db.collection('scores', function (er, col){
      col.find({username:name}).sort({scores: -1}).toArray(function(err, x){
        res.send(x);
    });
  });
  }
});

app.get('/', function(request, response) {
    db.collection('scores').find().sort({scores: -1}).toArray(function(err, results){
          if(err){
            throw err;
          }
          else{
            var entry = "<h1 Game Center></h1><table><tr><th>Username</th><th>Score</th><th>Timestamp</th></tr>";
            for(var i = 0; i < results.length; i++){
              entry += "<tr><td>" + results[i].username + "</td><td>" + results[i].score + "</td><td>" + results[i].created_at + "</td></tr>";
            }
            entry += "</table>";
            response.send(entry);
          }
    });
});

app.post('/submit.json', function(request, response) {
response.header("Access-Control-Allow-Origin", "*");
response.header("Access-Control-Allow-Headers", "X-Requested-With");
    var user = request.body.username;
    var grid = request.body.grid;
    var score = Number(request.body.score);
    if(user == null || score == null){
      response.send("Bad Data!");
    }
    else{
        var theDocument = {
          "username": user,
          "score": score,
          "grid": grid,
          "created_at": getDate()
        };
        // Let's insert whatever was sent to this web application (read: NSFW) to a collection named 'abyss' on MongoDB

        // 1. Specify a collection to use
          db.collection('scores', function(error, collection) {

              // 2. Put data into the collectiontheDocument = {"dump":userinput};
              collection.insert(theDocument, function(error, saved){
                response.send(200);
          });
        });
    };
});

function getDate(){
  var now = new Date();
  var month = [now.getMonth() + 1];
  var day = now.getDay();
  var year = now.getFullYear();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var newStatus = [month + "/" + day + "/" + year + " " + hour + ":" + minute];
  return newStatus;
}

// Oh joy! http://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of
var port = (process.env.PORT || 3000);
app.listen(port, function() {
  console.log('Listening on ' + port);
});