/**
 * Created by Andrea on 24/11/2016.
 */
angular.module('ExamenEa').controller('studentlistCtrl',['$scope','$http','$routeParams','$rootScope',function($scope, $http, $routeParams, $rootScope){
    $scope.NewStudent = {};

    // when landing on the page, get all user and show them
    $http.get('/students')
        .success(function(data) {
            $scope.students = data;
            console.log($scope.students);

        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.CreateStudent = function(){
        $http.post('/students/createstudent', $scope.NewStudent)
            .success(function(data){
                $scope.NewStudent = {}; //clear the form
                $scope.students = data;
                console.log(data);
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };

    $scope.DeleteStudent = function(id){
        $http.delete('/students/removestudent/' + id)
            .success(function(data) {
                $scope.students = data;

            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
    
    $scope.ProfileStudent = function (id) {
        $http.get('/students/id/' + id)
            .success(function (data) {
                $rootScope.student = data;
            })
            .error(function (data) {
                console.log('Error: ' +data);                
            });
    };

}]);


