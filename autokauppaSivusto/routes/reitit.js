var express = require('express');
var router = express.Router();
var Auto = require('../models/auto.js');

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
	Auto.find(function(err,autot){
		var sisalto = {
			autot: autot.map(function(auto){
				return{
					id: auto.id,
					merkki: auto.merkki,
					malli: auto.malli,
					korimalli: auto.korimalli,
					polttoaine: auto.polttoaine,
					vaihteisto: auto.vaihteisto,
					vari: auto.vari,
					vuosi: auto.vuosi,
					hinta: auto.hinta
				};
			})
		};
		res.render('autot',sisalto);
	});
});

router.get('/auto', function(req, res, next) {
  res.render('auto');
});

router.get('/lisaa', function(req, res, next) {
  res.render('lisaa');
});




router.post('/hakuprosessi',function(req,res){
	console.log('Form (from querystring): ' + req.query.form);
	console.log('Name (from visible form field): ' + req.body.name);
	console.log('Email (from visible form field): ' + req.body.email);
	res.redirect(303,'/');
});
router.post('/lisays-prosessointi',function(req,res){
	
		new Auto({
		id: req.body.id,
		merkki: req.body.merkki,
		malli: req.body.malli,
		korimalli: req.body.korimalli,
		polttoaine: req.body.polttoaine,
		vaihteisto: req.body.vaihteisto,
		vari: req.body.vari,
		vuosi: req.body.vuosi,
		hinta: req.body.hinta,
		}).save();
		
	console.log('Form (from querystring): ' + req.query.form);
	console.log(req.body.id);
	console.log(req.body.merkki);
	console.log(req.body.malli);
	console.log(req.body.korimalli);
	console.log(req.body.polttoaine);
	console.log(req.body.vaihteisto);
	console.log(req.body.vari);
	console.log(req.body.vuosi);
	console.log(req.body.hinta);
	
	res.redirect(303,'/');
});

module.exports = router;
