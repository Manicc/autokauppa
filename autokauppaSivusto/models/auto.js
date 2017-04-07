var mongoose = require('mongoose');

var autoSkeema = mongoose.Schema({
	id: Number,
	merkki: String,
	malli: String,
	korimalli: String,
	polttoaine: String,
	vaihteisto: String,
	vari: String,
	vuosi: Number,
	hinta: Number,
});

var Auto = mongoose.model('Auto', autoSkeema); 
module.exports = Auto;
