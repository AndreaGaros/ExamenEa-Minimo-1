/**
 * Created by Andrea on 23/11/2016.
 */

var ExamenEa = angular.module('ExamenEa', ['ngRoute']);

ExamenEa.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/index', {
            templateUrl: './views/subjectlist.html',
            controller: 'subjectlistCtrl'
        })
        .otherwise({
            redirectTo: '/index'
        })
        .when('/subjectprofile/:id', {
            templateUrl: './views/subjectprofile.html',
            controller: 'subjectprofileCtrl'
        })
        .otherwise({
            redirectTo: '/index'
        })
        .when('/studentprofile/:id', {
            templateUrl: './views/studentprofile.html',
            controller: 'studentprofileCtrl'
        })
        .otherwise({
            redirectTo: '/index'
        })
        .when('/addstudent', {
            templateUrl: './views/addstudent.html',
            controller: 'addstudentCtrl'
        })
        .otherwise({
            redirectTo: '/index'
        })
        .when('/subjectlist', {
            templateUrl: './views/subjectlist.html',
            controller: 'subjectlistCtrl'
        })
        .otherwise({
            redirectTo: '/index'
        })
        .when('/studentlist', {
            templateUrl: './views/studentlist.html',
            controller: 'studentlistCtrl'
        })
        .otherwise({
            redirectTo: '/index'
        });
}]);








