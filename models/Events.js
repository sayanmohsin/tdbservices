var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventsSchema = new Schema({
    type: String,
    name: String,
    date: Date,
    enddate: Date,
    place: String,
    details: String,
    image: String,
    imagetext: String,
    folder: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    pick: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: 'tags'
    }],
    status: {
        type: Boolean,
        default: false
    }
});

var Events = mongoose.model('events', eventsSchema);

module.exports = Events;