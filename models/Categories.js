var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoriesSchema = new Schema({
    name: String,
    type: String,
    color: String,
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

var Categories = mongoose.model('categories', categoriesSchema);

module.exports = Categories;