var express = require('express');

var index = require('./routes/reitit');

var app = express();

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



// view engine setup

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);




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
