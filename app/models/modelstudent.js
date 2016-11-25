/**
 * Created by Andrea on 23/11/2016.
 */
/**
 * Created by tonim on 14/10/2016.
 */
var mongoose = require('mongoose');
Schema   = mongoose.Schema;

// define the schema for our user model
var StudentSchema = new Schema({

    name: {
        type: String,
    },

    address: {
        type: String
    },

    phone: [{
        home: String,
        work: String
    }]
});

var Student = module.exports = mongoose.model('Student', StudentSchema);