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
  //res.cookie('');
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
	
	var hakuParametri = {};
	
	if(req.body.id){
		hakuParametri.id = req.body.id;
	}
	if(req.body.merkki){
		hakuParametri.merkki = req.body.merkki;
	}
	if(req.body.malli){
		hakuParametri.malli = req.body.malli;
	}
	if(req.body.korimalli){
		hakuParametri.korimalli = req.body.korimalli;
	}
	if(req.body.polttoaine){
		hakuParametri.polttoaine = req.body.polttoaine;
	}
	if(req.body.vaihteisto){
		hakuParametri.vaihteisto = req.body.vaihteisto;
	}
	if(req.body.vari){
		hakuParametri.vari = req.body.vari;
	}
	if(req.body.vuosi){
		hakuParametri.vuosi = req.body.vuosi;
	}
	if(req.body.hinta){
		hakuParametri.hinta = req.body.hinta;
	}
	
	Auto.find(hakuParametri,function(err,autot){
		
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
		res.render('tulokset',sisalto);
	});
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
	
	res.redirect(303,'autot');
});

module.exports = router;