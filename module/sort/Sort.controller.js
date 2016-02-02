app.controller('SortController',['$scope','NotificationService','$translate','$rootScope', function($scope,NotificationService,$translate,$rootScope) {
	
	$scope.numberList = [];
	$scope.errorList = [];
	$scope.checkDone = false;
	
	$rootScope.helpURL = 'module/sort/view/help.html'
	
	$scope.generateData = function(){
		NotificationService.clearSlot('Sort');
		$scope.checkDone = false;
		$scope.errorList = [];
		var sourceData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
		$scope.selectedNumberList = [];
		$scope.numberList.length=0;
		for(var i=0;i<10;i++){
			$scope.numberList.push($scope.selectAndRemoveElement(sourceData));
		}
	}
	$scope.getStatusClass = function(index){
		return (index%2)==1?"col-gray":"";
	}
	$scope.getErrorClass = function(index){
		return $scope.errorList[index]?'col-error':'';
	}
	
	$scope.selectAndRemoveElement = function(arr,allowFirstElement){
		if (angular.isDefined(allowFirstElement)&&!allowFirstElement){
			var toReturnIndex = Math.floor(Math.random()*(arr.length-1))+1;
		}else {
			var toReturnIndex = Math.floor(Math.random()*arr.length);
		}
		var toReturn = arr[toReturnIndex];
		arr.splice(toReturnIndex,1);
		return toReturn;
	}
	$scope.getSelectClass = function(number,mode){
		return $scope.selectedNumberList.indexOf(number)!==-1?"cell-selected":"";
	}
	$scope.toggleNumber = function(number){
		$scope.checkDone = false;
		NotificationService.clearSlot('Sort');
		if ($scope.selectedNumberList.indexOf(number)!==-1){
			$scope.selectedNumberList.splice($scope.selectedNumberList.indexOf(number),1);
		}else {
			$scope.selectedNumberList.push(number);
		}
	}
	$scope.check = function(){
		$scope.checkDone = true;
		$scope.errorList.length = 0;
		$scope.allOk = true;
		var sortedData = $scope.numberList.sort(function(a, b) {
			return a - b;
		});
		for(var i in sortedData){
			$scope.errorList[i]=(sortedData[i]!=$scope.selectedNumberList[i]);
			$scope.allOk = $scope.allOk&&!$scope.errorList[i];
			console.log($scope.allOk);
		}
	}
	
	$scope.generateData();
	
	
}]);

