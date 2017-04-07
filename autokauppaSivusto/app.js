var express = require('express');

var app = express();

// evästeet
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
var Auto = require('./models/auto.js');

// Alkutiedon lisäys
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

// evästeet middlware.
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
}));

/* flash message middleware */
app.use(function(req, res, next){
	// if there's a flash message, transfer
	// it to the context, then clear it
	res.locals.flash = req.session.flash;
	delete req.session.flash;
	next();
});

// Static middleware

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
