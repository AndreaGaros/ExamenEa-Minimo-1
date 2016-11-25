/**
 * Created by Andrea on 24/11/2016.
 */
angular.module('ExamenEa').controller('subjectprofileCtrl',['$scope','$http','$routeParams','$rootScope',function($scope, $http, $routeParams, $rootScope){

    var sub_id = window.location.href.split("/").pop();
    

    $http.get('/subjects/id/' + sub_id )
        .success(function (data) {
            $scope.subject = data;
            $scope.subjectstudents= data.students;
            $scope.counter =  $scope.subjectstudents.length;
            console.log($scope.subjectstudents)

        })
        .error(function (data) {
            console.log('Error: ' +data);
        });
    
    $http.get('/students')
        .success(function(data) {
            $scope.students = data;
            console.log($scope.students);

        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    

    $scope.Addstudent = function (id) {
        $scope.AddStudent = {
            student_id: id
        };
        $http.post('/subjects/addstudent/' + sub_id , $scope.AddStudent)
            .success(function(data){
                $scope.subject = data;
                $scope.subjectstudents= data.students;
                $scope.counter =  $scope.subjectstudents.length;
                console.log($scope.counter);
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };

    $scope.Popstudent = function (id) {
        $http.delete('/subjects/deletestudent/' + sub_id +'/'+ id)
            .success(function(data){
                $scope.subject = data;
                $scope.subjectstudents= data.students;
                $scope.counter =  $scope.subjectstudents.length;
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };
    

}]);