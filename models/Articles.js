var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articlesSchema = new Schema({
    categories: {
        type: mongoose.Schema.ObjectId,
        ref: 'categories',
    },
    mainheading: String,
    subheading: String,
    dbetype: String,
    place: String,
    image: String,
    imagetext: String,
    folder: String,
    interviewee: String,
    author: String,
    useremail: String,
    contents: String,
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

var Articles = mongoose.model('articles', articlesSchema);

module.exports = Articles;