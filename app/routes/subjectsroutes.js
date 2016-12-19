/**
 * Created by Andrea on 23/11/2016.
 */


var express = require('express');
var mongoose = require('mongoose');
var Subjects = require('../models/modelsubject');
var Students = require('../models/modelstudent');
var router = express.Router();

router.post('/createsubject', function(req, res) {

    Subjects.findOne({name: req.body.name}, function (err, exsistingsubject) {
        if(exsistingsubject){
            res.status(400).send('This subject already exist')
        }
        else{
            Subjects.create({name:req.body.name, when:req.body.when,}, function(err, subject) {
                if (err)
                    res.send(err);
                // get and return all the subjects after you create another
                Subjects.find(function(err, subjects) {
                    if (err)
                        res.send(err)
                    res.send(subjects);
                });
            });
        }
    });
});



// GET adventures in list
router.get('/', function(req, res) {

    Subjects.find(function (err, subjects) {
        if (err)
            res.send(err);
        if(subjects)
            res.send(subjects);
    });

});

// GET adventure by ID
router.get('/id/:sub_id', function(req, res){
    Subjects.findById(req.params.sub_id).populate('students').exec().then(function(err, subject){
        if(err)
            res.send(err)
        if(subject)
            res.send(subject);
    });
});



//Delete Adventure
router.delete('/removesubject/:sub_id', function(req, res) {
    
    Subjects.remove({
        _id : req.params.sub_id
    }, function(err, subject) {
        if (err)
            res.send(err)
        if(subject)
            Subjects.find(function (err, subjects) {
                if (err)
                    res.send(err);
                if(subjects)
                    res.send(subjects);
            });
    });
});

router.get('/when/:when', function(req, res) {
    console.log(req.params.when);
    Subjects.find({when: req.params.when}, function (err, exsistingsubjects) {
        if(exsistingsubjects){
            res.send(exsistingsubjects);
        }
        else{
            res.status(400).send(err);
        }
    });
});


router.post('/addstudent/:sub_id', function(req, res) {
    console.log(req.body.student_id);
    var query = {_id: req.params.sub_id};
    var update = {$addToSet : {"students" : req.body.student_id}};
    var options = {};
    Subjects.findOneAndUpdate(query, update, options, function(err, subject) {
        if (err) {
            res.send(err);
        }
        if(subject){
            var query = {_id: req.body.student_id};
            var update = {$addToSet : {"subjects" : req.params.sub_id }};
            var options = {};
            Students.findOneAndUpdate(query, update, options, function(err, student) {
                if (err) {
                    res.send(err);
                }
                if(student){
                    Subjects.findById(subject._id).populate('students').exec().then(function(err, subject) {
                        if (err)
                            res.send(err)
                        res.send(subject);
                    });
                }
            });
        }
    });
});



router.delete('/deletestudent/:sub_id/:student_id', function(req, res) {
    var query = {_id: req.params.sub_id};
    var update = {$pull : {"students" : req.params.student_id}};
    var options = {};
    Subjects.findOneAndUpdate(query, update, options, function(err, subject) {
        if (err) {
            res.send(err);
        }
        if(subject){
            Subjects.findById(subject._id).populate('students').exec().then(function(err, subject) {
                if (err)
                    res.send(err)
                if(subject)
                    res.send(subject);
            });
        }
    });
});



module.exports = router;
