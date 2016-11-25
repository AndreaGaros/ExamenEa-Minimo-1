/**
 * Created by Andrea on 24/11/2016.
 */

angular.module('ExamenEa').controller('subjectlistCtrl',['$scope','$http','$routeParams',function($scope, $http, $routeParams){
    $scope.NewSubject = {};
    $scope.SubjectError = {}


    // when landing on the page, get all user and show them
    $http.get('/subjects')
        .success(function(data) {
            $scope.subjects = data;
            console.log($scope.subjects);

        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.CreateSubject = function(){
        $http.post('/subjects/createsubject', $scope.NewSubject)
            .success(function(data){
                $scope.NewSubject = {}; //clear the form
                $scope.subjects = data;
                $scope.SubjectError = {}

                console.log(data);
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };

    $scope.DeleteSubject = function(id){
        $http.delete('/subjects/removesubject/' + id)
            .success(function(data) {
                $scope.subjects = data;

            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
    
    $scope.getTodas = function () {

        $http.get('/subjects')
            .success(function(data) {
                $scope.subjects = data;
                console.log($scope.subjects);

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        
    };
    
}]);


