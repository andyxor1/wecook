var express = require('express');
var router = express.Router();
var async = require('async');
var recipe_seeds = require('../json/recipe_seeds.js');
var recipe_tags = require('../json/recipe_tags.js');
//var Store = require("../models/store_model");

// Return index page
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/share', function ( req, res, next ) {
    console.log(recipe_tags);
    res.render('pages/share_recipe', {
      recipe_tags: recipe_tags,
    });
});

router.get('/account', function ( req, res, next ) {
    res.render('pages/account');
});

router.get('/about', function ( req, res, next ) {
    res.render('pages/about');
});

router.get('/dashboard', function ( req, res, next ) {
    // console.log(recipe_seeds);
    res.render('pages/dashboard', {
      recipe_seeds: recipe_seeds,
    });
});

router.get('/settings', function ( req, res, next ) {
    res.render('pages/settings');
});

//POST call for recipe query
router.post('/find-recipes', async function(req, res) {
    for(var key in req.body) {
        if(req.body.hasOwnProperty(key)){
            //do something with e.g. req.body[key]
            console.log("%s   ======    %s", key,req.body[key]);
        }
    }


    //let result = await User.findById(userId);
    //doSomethingElseWith(result);
    res.json(req.body["Earl's"]);
})



module.exports = router;
