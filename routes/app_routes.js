var express = require('express');
var router = express.Router();
var async = require('async');
var bodyParser = require('body-parser');
var recipe_seeds = require('../json/recipe_seeds.js');
var recipe_tags = require('../json/recipe_tags.js');
var elasticlunr = require('elasticlunr');
var nlp = require('compromise')
// "require" is similar to import statements

var mongoose = require('mongoose'); // for mongo db
var path = require('path'); // for specifying path of directory


var Recipe = require('../models/recipe_model');
var Tag = require('../models/tag_model');
var bodyParser = require('body-parser'); // for parsing from HTTP message body


var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');


// ------------------
// INDEX ROUTES |
// ------------------
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/share', function ( req, res, next ) {
    console.log(recipe_tags);
    res.render('pages/share_recipe', {
      recipe_tags: recipe_tags,
    });
});

router.get('/about', function ( req, res, next ) {
    res.render('pages/about');
});


// ------------------
// ACCOUNT ROUTES |
// ------------------
router.get('/account', function ( req, res, next ) {
    res.render('pages/account');
});



// ------------------
// DASHBOARD ROUTES |
// ------------------
router.get('/dashboard', function ( req, res, next ) {

  Recipe.find(function(err, recipes) {
    if(err) { console.log(err); }
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
    console.log(req.body);
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
    res.render('pages/dashboard', {
      recipe_seeds: recipes,
    });

  });
});

router.get('/dashboard/:id', function ( req, res, next ) {

  console.log(req.params.id);
  Recipe.findById(req.params.id, function(err, recipe) {
    if(err) { console.log(err); }
    console.log(recipe.ingredients);
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
    res.render('pages/recipe_details', {
      recipe: recipe,
    });

  });
});
//POST call for recipe query
router.post('/dashboard', async function(req, res) {
    var searchTerm = "";
    var searchTags = [];
    for(var key in req.body) {
        if(req.body.hasOwnProperty(key)){
            //do something with e.g. req.body[key]
            console.log("%s   ======    %s", key,req.body[key]);

            console.log(typeof(req.body[key]));
            if(key == "search") {
              searchTerm = req.body[key];
              console.log("search term");
              console.log(searchTerm);
            }

            else if(req.body[key] == "true") {

              searchTags.push(key);
              console.log("search key");
              console.log(searchTags);
            }


        }
    }

    queryObj = {};
    if(searchTerm != "") {
      queryObj["title"] = searchTerm;
    }

    if(searchTags.length != 0) {
      console.log("called here");
      queryObj["tags"] = { $all: searchTags };
    }

    console.log(queryObj);

    Recipe.find(queryObj, function(err, recipes) {
      if(err) {console.log(err); }
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
router.get('/settings', function ( req, res, next ) {
    res.render('pages/settings');
});

router.post('/add-recipe', async function(req, res) {

    var recipe = req.body;
    recipe["picture"] = "/pictures/tofu-stew.jpg";

    console.log("Hello---------------------------------------------------------------------------------------------");
    console.log(recipe);
    console.log("Bye---------------------------------------------------------------------------------------------");
    // debugger;
    var recipe = req.body;
    // debugger;
    // Add recipe to DB
    Recipe.create(recipe, function(err, recipe) {
        if(err) {
            console.log(err);
        } else {
            console.log('RECIPES: ----------> added a recipe: ' + recipe.title);
        }
    });
    // re-render
    res.redirect('/dashboard'); 
})




module.exports = router;
