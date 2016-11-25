/**
 * Created by Andrea on 23/11/2016.
 */

var mongoose = require('mongoose');
Schema   = mongoose.Schema;

// define the schema for our user model
var SubjectSchema = new Schema({

    name: {
        type: String,
    },
    adventures: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Students' }
    ]
});

var Subject = module.exports = mongoose.model('Subject', SubjectSchema);