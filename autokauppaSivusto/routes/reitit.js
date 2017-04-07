var express = require('express');
var router = express.Router();

router.use(require('body-parser').urlencoded({extended:true}));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/hakusivu', function(req, res, next) {
  res.render('hakusivu');
});

router.get('/tulokset', function(req, res, next) {
  res.render('tulokset');
});

router.get('/autot', function(req, res, next) {
  res.render('autot');
});

router.get('/auto', function(req, res, next) {
  res.render('auto');
});




router.post('/hakuprosessi',function(req,res){
	console.log('Form (from querystring): ' + req.query.form);
	console.log('Name (from visible form field): ' + req.body.name);
	console.log('Email (from visible form field): ' + req.body.email);
	res.redirect(303,'/');
});

module.exports = router;
