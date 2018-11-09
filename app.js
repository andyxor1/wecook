// "require" is similar to import statements
var express = require('express'); // framework we are working with
var bodyParser = require('body-parser'); // for parsing from HTTP message body
var mongoose = require('mongoose'); // for mongo db
var path = require('path'); // for specifying path of directory
var seedDB = require("./seeds");

if(true){seedDB();}

// seperate routes for modularity
var appRoutes = require('./routes/app_routes')  // this is just saying include all the routes from /routes/app_routes

var app = express(); // initialize an express instance, set body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// this if else block is so that we could connect to an online mongodb when we need to (mongolabs, AWS dyanamoDB)
var isLocal = true;
if ( isLocal ) {
  mongoose.connect('mongodb://localhost:27017/wecook', { useNewUrlParser: true });
  console.log("==> Connected to Local Mongo at localhost:27017");
} else {
  console.log("==> Connected to Remote Mongo ...");
}


// not so sure about these but basically look up "CORS" it's so that we could request items cross sites
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});



app.set('views', path.join(__dirname, 'views')); // specify that we want to use "views" folder for our "HTML" templates
app.set('view engine', 'ejs'); // specify our "view engine" will be ejs, aka let's use ejs




app.use('/', appRoutes); // use the route you previously defined, or "required" (for modularity)
app.use(express.static(path.join(__dirname, 'public'))); // specify our assets (such as Bootstrap, CSS, JS) to be in "public" folder


app.use(function(req, res, next) { // if there's anything wrong, render the error page.
  return res.render('error');
});


// listen to request at port 3000 OR listen to the "env" (environment);
// so basically if you are in another space (i.e. Heroku), listen from that port.
app.listen(process.env.PORT || 3000, function(){
  console.log("==> Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
