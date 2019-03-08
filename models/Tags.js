var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagsSchema = new Schema({
    name: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: false
    }
});

var Tags = mongoose.model('tags', tagsSchema);

module.exports = Tags;