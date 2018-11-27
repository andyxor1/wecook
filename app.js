// "require" is similar to import statements
var express = require('express'); // framework we are working with
var bodyParser = require('body-parser'); // for parsing from HTTP message body
var mongoose = require('mongoose'); // for mongo db
var path = require('path'); // for specifying path of directory
var seedDB = require("./seeds");
// var elasticlunr = require('elasticlunr');
var passport = require('passport');
var methodOverride = require('method-override');
if(false){seedDB();}




// let recipe_search = elasticlunr(function () {
//     this.addField('title');
//     this.addField('description');
// });
//
//
// var doc1 = {
//     "id": 1,
//     "title": "Oracle released its latest database Oracle 12g",
//     "body": "Yestaday Oracle has released its new database Oracle 12g, this would make more money for this company and lead to a nice profit report of annual year."
// }
//
// var doc2 = {
//     "id": 2,
//     "title": "Oracle released its profit report of 2015",
//     "body": "As expected, Oracle released its profit report of 2015, during the good sales of database and hardware, Oracle's profit of 2015 reached 12.5 Billion."
// }
//
//
// recipe_search.addDoc(doc1);
// recipe_search.addDoc(doc2);
//
// recipe_search.search("Oracle database profit");



// seperate routes for modularity
var appRoutes = require('./routes/app_routes')  // this is just saying include all the routes from /routes/app_routes

var app = express(); // initialize an express instance, set body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'))


// this if else block is so that we could connect to an online mongodb when we need to (mongolabs, AWS dyanamoDB)
var isLocal = false;
if ( isLocal ) {
  mongoose.connect('mongodb://localhost:27017/wecook', { useNewUrlParser: true });
  console.log("==> Connected to Local Mongo at localhost:27017");
} else {
  mongoose.connect('mongodb://wecook:wecook18@ds111258.mlab.com:11258/wecook', { useNewUrlParser: true });
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




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
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

module.exports = app;
