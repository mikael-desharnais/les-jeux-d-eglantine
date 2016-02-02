app.controller('HandritingToScriptController',['$scope','NotificationService','$translate','$rootScope', function($scope,NotificationService,$translate,$rootScope) {
	
	$rootScope.helpURL = 'module/handwritingtoscript/view/help.html'
	
	
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
	$scope.check = function(){
		NotificationService.clearSlot('HandritingToScript')
		if ($scope.response.value.toLowerCase()==$scope.currentLetter){
			$scope.foundLetterList.push($scope.currentLetter);
			NotificationService.success('HandritingToScript',$translate.instant("handritingToScript.welldone"));
		}else {
			$scope.errorLetterList.push($scope.currentLetter);
			NotificationService.danger('HandritingToScript',$translate.instant("handritingToScript.oups"));
		}
		$scope.response.value = "";
		if ($scope.letterList.length>0){
			$scope.currentLetter = $scope.selectAndRemoveElement($scope.letterList);
		}else {
			$scope.endReached = true;
		}
	}
	$scope.generateData = function(){
		var fullLetterList =  ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
		$scope.letterList = [];
		for(var i=0;i<10;i++){
			$scope.letterList.push($scope.selectAndRemoveElement(fullLetterList));
		}
		$scope.foundLetterList = [];
		$scope.errorLetterList = [];
		$scope.endReached = false;
		$scope.response = {value : ""};
		$scope.currentLetter = $scope.selectAndRemoveElement($scope.letterList);
	}
	$scope.generateData();
	
	
}]);

