/**
 * Created by Andrea on 23/11/2016.
 */

var mongoose = require('mongoose');

var Subjects = new mongoose.Schema({

    name: {
        type: String
    },
    when:{
        type: String
    },
    students: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Students' }
    ]
});

module.exports = mongoose.model('Subjects', Subjects);