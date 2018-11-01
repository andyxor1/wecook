var express = require('express');
var router = express.Router();
var async = require('async');
var recipe_seeds = require('../json/recipe_seeds.js');
// Return index page
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/share', function ( req, res, next ) {
    res.render('pages/share_recipe');
});

router.get('/account', function ( req, res, next ) {
    res.render('pages/account');
});

router.get('/about', function ( req, res, next ) {
    res.render('pages/about');
});

router.get('/dashboard', function ( req, res, next ) {

    // console.log(recipe_seeds);
    res.render('pages/dashboard', { recipe_seeds: recipe_seeds});
});

router.get('/settings', function ( req, res, next ) {
    res.render('pages/settings');
});


module.exports = router;
