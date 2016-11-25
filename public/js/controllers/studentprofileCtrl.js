/**
 * Created by Andrea on 24/11/2016.
 */
angular.module('ExamenEa').controller('studentprofileCtrl',['$scope','$http','$routeParams','$rootScope',function($scope, $http, $routeParams, $rootScope){

    var id = window.location.href.split("/").pop();
    console.log(id);
    $scope.phone = {};

    $http.get('/students/id/' + id)
        .success(function(data) {
            $scope.student = data;
            $scope.phones = data.phones;
            console.log("holaaaa",  $scope.phones);
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.AddPhn = function () {
        $http.post('/students/addphone/' + id, $scope.phone)
            .success(function(data){
                $scope.phone ={};
                $scope.student = data;
                $scope.phones = data.phones;
               ;
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };

    $scope.DeletePhn = function (phone) {
        $http.delete('/students/deletephone/' + id +'/' + phone)
            .success(function(data){
                $scope.student = data;
                $scope.phones = data.phones;
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };

}]);