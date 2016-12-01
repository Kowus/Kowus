var mongoose= require('mongoose');
var Schema = mongoose.Schema;


var BlogSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true,
		unique: true
	},
	categories:{
		type: String,
		required: true,
	},
	content: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('blog', BlogSchema);
