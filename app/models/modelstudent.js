/**
 * Created by Andrea on 23/11/2016.
 */
/**
 * Created by tonim on 14/10/2016.
 */
var mongoose = require('mongoose');

var Students = new mongoose.Schema({

    name: {
        type: String
    },

    address: {
        type: String
    },
    

    phones: [
        {
            cont: {
                type: String
            },
            number:{
                type: String
            }
        }
    ]
});

module.exports = mongoose.model('Students', Students);