angular.module("menuModule", []).controller("ItemsCtrl", function ($scope, $log) {
  $scope.item = 1;
  $scope.showItem = function(i){
    $scope.item = i;
  }
  $scope.activar = function(i){
    if($scope.item == i){
    	return 'active';
    }
  }
});