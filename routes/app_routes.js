var express = require('express');
var router = express.Router();
var async = require('async');
var bodyParser = require('body-parser'); // for parsing from HTTP message body
var bodyParser = require('body-parser');
var recipe_seeds = require('../json/recipe_seeds.js');
var recipe_tags = require('../json/recipe_tags.js');
var elasticlunr = require('elasticlunr');
var nlp = require('compromise')
// "require" is similar to import statements
var mongoose = require('mongoose'); // for mongo db
var path = require('path'); // for specifying path of directory
var multer = require('multer')

var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

// Authentications
var passport = require('passport');
var LocalStrategy = require('passport-local');

var User = require("../models/user_model");
var Recipe = require('../models/recipe_model');
var Tag = require('../models/tag_model');

var LocalStorage = require('node-localstorage').LocalStorage,
  localStorage = new LocalStorage('./scratch');


router.use(function (req, res, next) {
  console.log(req.user);
  res.locals.currentUser = req.user;
  res.locals.isIndexPage = false;
  next();
});


router.use(require('express-session')({
  secret: "wecook is the best app",
  resave: false,
  saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ------------------
// AUTH ROUTES |
// ------------------
router.post("/login", passport.authenticate("local",

  {
    successRedirect: "/dashboard",
    failureRedirect: "/"
  }), function (req, res) {

  });

router.post('/signup', function (req, res) {
  var newUser = new User({ username: req.body.username })
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render('index');
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/dashboard");
    });

  });
});

router.post('/signup/check_user', function (req, res) {
  console.log("called");
  var data = req.body.username;
  User.find({ username: data }, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    else if (result.length == 0) {
      return res.status(200).json({
        msg: 'available'
      });
    }
    else {
      return res.status(200).json({
        msg: 'used'
      });
    }
  });
});

// logout
router.get("/logout", function (req, res) {
  console.log("called in logout get route");
  req.logout();
  res.redirect("/");
});



router.get('/reset', function (req, res) {
  res.render("pages/reset");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('called in isAuth')
    return next();
  }
  console.log("islogged in ");
  res.redirect("/");
}

// ------------------
// INDEX ROUTES |
// ------------------
router.get('/', function (req, res, next) {
  res.render('index', {
    currentUser: req.user,
    isIndexPage: true,
  });
});

router.get('/recipes/new', isLoggedIn, function (req, res, next) {
  console.log(recipe_tags);
  res.render('pages/new_recipe', {
    recipe_tags: recipe_tags,
    currentUser: req.user,
  });
});

router.get('/about', function (req, res, next) {
  res.render('pages/about');
});


// ------------------
// ACCOUNT ROUTES |
// ------------------
router.get('/account/:id', isLoggedIn, function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) { console.log(err); }
    console.log(user);
    Recipe.find({ author: user._id }, function (err, recipes) {
      console.log(recipes)
      res.render('pages/account_details', {
        user: user,
        recipes: recipes,
        currentUser: req.user
      });
    });
  })
});



// ------------------
// DASHBOARD ROUTES |
// ------------------
router.get('/dashboard', isLoggedIn, function (req, res, next) {

  Recipe.find(function (err, recipes) {
    if (err) { console.log(err); }
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
    console.log(req.user);
    console.log(req.body);
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
    res.render('pages/dashboard', {
      recipe_seeds: recipes,
      currentUser: req.user
    });

  });
});

router.get('/dashboard/community', function (req, res, next) {

  Recipe.find(function (err, recipes) {
    if (err) { console.log(err); }
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
    console.log(req.user);
    console.log(req.body);
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
    res.render('pages/dashboard', {
      recipe_seeds: recipes,
    });

  });
});

router.get('/recipe/:id', function (req, res, next) {

  console.log(req.params.id);
  Recipe.findById(req.params.id, function (err, recipe) {
    if (err) { console.log(err); }
    console.log(recipe.ingredients);
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
    res.render('pages/recipe_details', {
      recipe: recipe,
    });

  });
});

// for adding a new recipe
router.post('/recipes', isLoggedIn, function(req, res) {

    var recipe = req.body.recipe;
    // recipe["picture"] = "/pictures/tofu-stew.jpg";
    var author = req.user;
    // console.log("Hello---------------------------------------------------------------------------------------------");
    // console.log(req.body)
    // console.log(recipe);
    // console.log(req.user);
    recipe["author"] = author._id ;
    recipe["author_name"] = author.username ;
    // console.log("Bye---------------------------------------------------------------------------------------------");

    // Add recipe to DB
    Recipe.create(recipe, function(err, recipe) {
        if(err) {
            console.log(err);
        } else {
            console.log('RECIPES: ----------> added a recipe: ' + recipe.title);
            User.findByIdAndUpdate(author._id,
              { $push: { recipes_owned: recipe._id }},
              function(err, user) {
              if(err) {console.log(err);}
              var recipes_owned = user.recipes_owned;
              console.log(recipes_owned)
            });

          }
    });
    // re-render
    res.redirect('/dashboard');
})

// for deleting the recipe
router.delete("/recipe/:id", isLoggedIn, function (req, res) {
  console.log("called in recipe destroy route")
  Recipe.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.redirect("/account/" + req.user._id);
    }

  });
});

// for updating the recipe
router.put("/recipe/:id", isLoggedIn, function( req, res) {
  console.log("called in recipe update route")
  Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, function(err){
    if(err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.redirect("/account/" + req.user._id);
    }

  });
});


// POST call for recipe query
router.post('/dashboard', async function (req, res) {
  var searchTerm = "";
  var searchTags = [];
  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      //do something with e.g. req.body[key]
      console.log("%s   ======    %s", key, req.body[key]);

      console.log(typeof (req.body[key]));
      if (key == "search") {
        searchTerm = req.body[key];
        console.log("search term");
        console.log(searchTerm);
      }

      else if (req.body[key] == "true") {

        searchTags.push(key);
        console.log("search key");
        console.log(searchTags);
      }


    }
  }

  queryObj = {};
  if (searchTerm != "") {
    //queryObj["title"] = { "$regex": searchTerm, "$options": "i" };
    //queryObj["ingredients"] = { $all: searchTerm };
    //queryObj["description"] = { $all: searchTerm };
    queryObj["$or"] = [{ title: { "$regex": searchTerm, "$options": "i" } }, { ingredients: { "$regex": searchTerm, "$options": "i" } }, { description: { "$regex": searchTerm, "$options": "i" } }, { tags: { "$regex": searchTerm, "$options": "i" } }]
  }

  if (searchTags.length != 0) {
    console.log("called here");
    queryObj["tags"] = { $all: searchTags };
  }

  console.log(queryObj);

  Recipe.find(queryObj, function (err, recipes) {
    if (err) { console.log(err); }
    // res.json(req.body["Earl's"]);
    res.json(recipes);
  })


  // let result = await User.findById(userId);
  //doSomethingElseWith(result);

})
// router.post('/dashboard', function ( req, res, next ) {
//
//   Recipe.find({"title": value }, function(err, recipes) {
//     if(err) { console.log(err); }
//     console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
//     console.log(req.body);
//     console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
//     res.render('pages/dashboard', {
//       recipe_seeds: recipes,
//     });
//
//   });
//
//
// });
// router.post('/dashboard', function ( req, res, next ) {
//   console.log("called here")
//   console.log(req.body);
//
//   Recipe.find(function(err, recipes) {
//     if(err) { console.log(err); }
//     console.log("hellow");
//     let recipe_search = elasticlunr(function () {
//       this.addField('title');
//       this.addField('description');
//     });
//
//     console.log(recipes)
//
//     recipes.forEach(function(recipe) {
//       recipe_title_norm = nlp(recipe.title).normalize().out('text');
//       recipe_description_norm = nlp(recipe.description).normalize().out('text');
//       recipe_search_obj =
//         {
//           title: recipe_title_norm,
//           description: recipe_description_norm,
//           id: recipe._id
//         };
//       recipe_search.addDoc(recipe_search_obj);
//     });
//     // console.log(req.body["key"]);
//
//     let searchResults = recipe_search.search(req.body["key"], {
//         fields: {
//             title: {expand: true},
//             description: {expand: true}
//         },
//         bool: "OR",
//         expand: true
//     });
//
//     console.log(searchResults);
//     var newRecipe = [];
//     searchResults.forEach(function(result) {
//       var ref = result.ref;
//       console.log("ID:");
//       var found = recipes.find(recipe => recipe._id == ref);
//       console.log("found");
//       newRecipe.indexOf(found) === -1 ? newRecipe.push(found) : console.log("This item already exists");
//
//     })
//     res.render('pages/dashboard', {
//       recipe_seeds: newRecipe,
//     });
//
//   });
//
//
// });



// ------------------
// SETTINGS ROUTES |
// ------------------
router.get('/settings', function (req, res, next) {
  res.render('pages/settings');
});


module.exports = router;