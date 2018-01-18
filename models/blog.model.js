var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    permalink: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categories: {
        type: Array
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now()
    },
    author: {
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }, publish:{
        type:Boolean,
        default: false
    },
    banner_picture:{
        type:String,
        default:'/images/sol-foster.jpg'
    }

});

module.exports = mongoose.model('blog', BlogSchema);

