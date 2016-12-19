/**
 * Created by Andrea on 23/11/2016.
 */
var express = require('express');
var router = express.Router();
var Students = require('../models/modelstudent');




// GET adventures in list
router.get('/', function(req, res) {

    Students.find(function (err, students) {
        if (err)
            res.send(err);
        if(students)
            res.send(students);
        
    });

});

/////NUEVO
// GET adventure by ID
router.get('/id/:stu_id', function(req, res){
    Students.findById(req.params.stu_id).populate('subjects').exec().then( function(err, student){
        if(err)
            res.send(err)
        if(student)
            console.log("student");
            console.log(student);
            res.send(student);
    });
});




// Create an Adventure
router.post('/createstudent', function(req, res) {

    console.log("req: ", req.body);


    Students.create({
        name:req.body.name,
        address:req.body.address,
       
    }, function(err, stu) {
        if (err)
            res.send(err);
        Students.find(function (err, students) {
            if (err)
                res.send(err);
            if(students)
                res.send(students);
        });
    });
});


//Delete Adventure
router.delete('/removestudent/:stu_id', function(req, res) {

    Students.remove({
        _id : req.params.stu_id
    }, function(err) {
        if (err)
            res.send(err)
        Students.find(function (err, students) {
            if (err)
                res.send(err);
            if(students)
                res.send(students);
        });
    });
});


router.post('/addphone/:student_id', function(req, res) {
    var query = {_id: req.params.student_id};
    var update = {$addToSet : {"phones" :
    {cont: req.body.cont, 
        number: req.body.number}}};
    var options = {};
    Students.findOneAndUpdate(query, update, options, function(err, student) {
        if (err) {
            res.send(err);
        }
        if(student){
            Students.findById(student._id).populate('phones').exec().then(function(err, student) {
                if (err)
                    res.send(err)
                if(student)
                    console.log(student)
                    res.send(student);
            });
        }
    });
});

router.delete('/deletephone/:student_id/:phone_id', function(req, res) {
    var query = {_id: req.params.student_id};
    var update = {$pull : {"phones":{ _id: req.params.phone_id}}};
    var options = {};
    Students.findOneAndUpdate(query, update, options, function(err, student) {
        if (err) {
            res.send(err);
        }
        if(student){
            Students.findById(student._id).populate('phones').exec().then(function(err, student) {
                if (err)
                    res.send(err)
                if(student)
                    res.send(student);
            });
        }
    });
});




module.exports = router;
