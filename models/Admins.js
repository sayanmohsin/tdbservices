var mongoose = require('../configs/nosql.config');
var Schema = mongoose.Schema;

var adminsSchema = new Schema({
    name: { 
        type: String
    },
    username: { 
        type: String
    },
    password: {
        type: String,
        select: false
    },
    email: { 
        type: String
    },
    phone: { 
        type: String
    },
    createdDate: { 
        type: Date, 
        default: Date.now 
    },
    updatedDate: { 
        type: Date, 
        default: Date.now 
    }
});

var Admins = mongoose.model('admins', adminsSchema);

module.exports = Admins;