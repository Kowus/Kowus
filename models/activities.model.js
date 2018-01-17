var mongoose = require('mongoose');
var ActivitySchema = new mongoose.Schema({
    name:String,
    date:Date,
    description:String,
    venue:{
        name:String, x_cord:Number, y_cord:Number
    },
    url:String,
    image: String
});

module.exports = mongoose.model('activity', ActivitySchema);