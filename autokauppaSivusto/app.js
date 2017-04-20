var express = require('express');
var app = express();

var credentials = require('./credentials.js');

var hbs = require('express-handlebars')
	.create({defaultLayout: 'main',
	extname: '.hbs',
	helpers: {
		section: function(name, options){
			if(!this.sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});

var index = require('./routes/reitit');

// Tietokanta
var mongoose = require('mongoose');
var opts = {
	server: {
		socketOptions:{keepAlive:120}
	}
};
mongoose.connect('mongodb://admin:admin123@ds151060.mlab.com:51060/autokauppa', opts);


// Alkutiedon lisäys
var Auto = require('./models/auto.js');
Auto.find(function(err,autot){
	if(err) return console.error(err);
	if(autot.length) return;
	
	new Auto({
		id: 1,
		merkki: 'Audi',
		malli: 'A4',
		korimalli: 'Porrasperä',
		polttoaine: 'Bensiini',
		vaihteisto: 'Manuaali',
		vari: 'Punainen',
		vuosi: 2002,
		hinta: 4500,
	}).save();
});

// view engine setup
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);

// Staattiset middlewaret
app.use(require('cookie-parser')(credentials.cookieSecret));


// Kaikki reitit tänne!
app.use('/', index);

app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').urlencoded({extended:true}));

app.use(function(req,res){
	res.status(404);
	res.render('404');
});

app.use(function(req,res){
	console.error(err.stack);
	res.status(500);
	render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express käynnistetty osoitteeseen http://localhost:' + app.get('port') + '; Sulje palvelin Ctrl-c');	
});

module.exports = app;
