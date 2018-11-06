var express = require('express');
var router = express.Router();
var async = require('async');
var recipe_seeds = require('../json/recipe_seeds.js');
var recipe_tags = require('../json/recipe_tags.js');
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

router.get('/recipe', function ( req, res, next ) {
    res.render('pages/recipe_page');
});

module.exports = router;
