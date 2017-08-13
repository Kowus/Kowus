var mongoose = require('mongoose');
var EventSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    }, guests: [{
        name: String,
        email: String,
        phone: String,
        isVolunteer: {type: Boolean, Default: false},
        role: {
            isSpeaker: {type: Boolean, Default: true},
            topic: {type: String, Default: undefined},
            summary: {type: String, Default: undefined}
        }
    }], organizers: [{
        name: String,
        company: String,
        position: String
    }],
    url: {type: String},
    title: {type: String, required: true},
    theme: {type: String},
    venue: [{
        name: String,
        map: {
            loc_x: Number,
            loc_y: Number,
            loc_des: String
        }, marker: String
    }]
});

module.exports = mongoose.model('event', EventSchema);