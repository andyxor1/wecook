var mongoose = require("mongoose");
var faker = require('faker');

// models
var Store = require("./models/store_model");
var Recipe = require("./models/recipe_model");
var User = require("./models/user_model");
var Tag = require("./models/tag_model");


// seeds
var store_seeds = require('./json/store_seeds.js');
var recipe_seeds = require('./json/recipe_seeds.js');
var user_seeds = require('./json/user_seeds.js');
var tag_seeds = require('./json/tag_seeds.js');

// switches
var isPopulated = false;
var listOfIngredients = [];


function seedStore() { // create fake stores
  Store.remove({}, function(err) {
    if(err) { console.log(err); }
    console.log("..........all stores removed");
    Tag.remove({}, function(err) {
      if(err) { console.log(err); }
      console.log("..........all tags removed");

      store_seeds.forEach (function(store) {
        Store.create(store, function(err, store) {
          if(err) { console.log(err); }
          else {
            console.log("STORES: ----------> added a store: " + store.name +
                " with " + store.ingredients.length + " ingredients");
            // create tags

            store.ingredients.forEach(function(ingredient) {
              // insert unique tags
              Tag.findOneAndUpdate(
                { title: ingredient },
                { title: ingredient, type: "ingredient"},
                { upsert: true },
                function(err, result) {
                  if(err) { console.log(err); }
                  else {
                    console.log("This is result");
                    if(result)
                      console.log("TAGS: ----------> added a tag: " + result);
                  }
                })
            });
          }
        });
      });


    });
  });
}

function seedUser() { // create fake stores
  User.remove({}, function(err) {
    if(err) { console.log(err); }
    console.log("..........all users removed");
    user_seeds.forEach (function(user) {
      User.create(user, function(err, user) {
        if(err) { console.log(err); }
        else { console.log("USERS: ----------> added a user: " + user.username);}
      });
    });
  });
}

function seedRecipe() { // create fake stores
  Recipe.remove({}, function(err) {
    if(err) { console.log(err); }
    console.log("..........all recipes removed");
    recipe_seeds.forEach (function(recipe) {
      Recipe.create(recipe, function(err, recipe) {
        if(err) { console.log(err); }
        else { console.log("RECIPES: ----------> added a recipe: " + recipe.title);}
      });
    });
  });
}

function seedTags() { // create fake stores
  Tag.remove({}, function(err) {
    if(err) { console.log(err); }
    console.log("..........all tags removed");
    tag_seeds.forEach (function(tag) {
      Tag.create(tag, function(err, tag) {
        if(err) { console.log(err); }
        else { console.log("TAGS: ----------> added a tag: " + tag.title);}
      });
    });
  });
}

function seedDB(){

  seedStore();
  seedUser();
  seedRecipe();
  // seedTags(); // not sure if needed

   // Remove all recipes
   // Recipe.remove({}, function(err){
   //      if(err){
   //          console.log(err);
   //      }
   //      console.log("removed recipes!");
   //      Comment.remove({}, function(err) {
   //          if(err){
   //              console.log(err);
   //          }
   //          console.log("removed comments!");
   //
   //           //add a few recipes
   //          data.forEach(function(seed){
   //              Recipe.create(seed, function(err, recipe){
   //                  if(err){
   //                      console.log(err)
   //                  } else {
   //                      console.log("added a recipe");
   //
   //                      //create a comment
   //                      Comment.create(
   //                          {
   //                              text: "This place is great, but I wish there was internet",
   //                              author: "Homer"
   //                          }, function(err, comment){
   //                              if(err){
   //                                  console.log(err);
   //                              } else {
   //                                  recipe.comments.push(comment);
   //                                  recipe.save();
   //                                  console.log("Created new comment");
   //                              }
   //                          });
   //                  }
   //              });
   //          });
   //      });
   //  });

}

module.exports = seedDB;
