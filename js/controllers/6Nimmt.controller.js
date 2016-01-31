app.controller('6NimmtController',['$scope','NotificationService','$translate', function($scope,NotificationService,$translate) {
	$scope.numberList = [];
	$scope.chosenNumber;
	$scope.selectedNumberList = [];
	$scope.errorList = [];
	$scope.step1Ended = false;
	$scope.step2Ended = false;
	$scope.maxFound = false;
	
	
	$scope.generateData = function(){
		NotificationService.clearSlot('6Nimmt');
		var sourceData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
		$scope.selectedNumberList = [];
		$scope.errorList = [];
		$scope.step1Ended = false;
		$scope.step2Ended = false;
		$scope.maxFound = false;
		$scope.chosenNumber = $scope.selectAndRemoveElement(sourceData,false);
		var temporaryNumberList = [];
		for(var i=0;i<5;i++){
			temporaryNumberList.push($scope.selectAndRemoveElement(sourceData));
		}
		if (Math.max.apply(null,temporaryNumberList)>$scope.chosenNumber){
			temporaryNumberList.push(1);
		}
		temporaryNumberList.length = 16;
		$scope.numberList.length=0;
		for(var i=0;i<16;i++){
			$scope.numberList.push($scope.selectAndRemoveElement(temporaryNumberList));
		}
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
	$scope.generateData();
	
	$scope.getStatusClass = function(index){
		return (index%2+Math.floor(index/4))%2==1?"col-gray":"";
	}
	$scope.getSelectClass = function(number){
		if ($scope.step1Ended&&number>$scope.chosenNumber){
			return "cell-hidden";
		}
		return $scope.errorList.indexOf(number)!==-1?"cell-error":($scope.selectedNumberList.indexOf(number)!==-1?"cell-selected":"");
	}
	$scope.toggleNumber = function(number){
		if ($scope.step2Ended&&$scope.maxFound){
			return;
		}
		NotificationService.clearSlot('6Nimmt');
		if ($scope.step1Ended){
			if (number==Math.max.apply(null, $scope.selectedNumberList)){
				$scope.maxFound = true;
			}
			$scope.step2Ended = true;
			return;
		}
		if ($scope.selectedNumberList.indexOf(number)!==-1){
			$scope.selectedNumberList.splice($scope.selectedNumberList.indexOf(number),1);
		}else {
			$scope.selectedNumberList.push(number);
		}
	}
	$scope.check = function(){
		$scope.errorList = [];
		for(var i in $scope.selectedNumberList){
			if ($scope.selectedNumberList[i]>$scope.chosenNumber){
				$scope.errorList.push($scope.selectedNumberList[i]);
			}
		}
		for(var i in $scope.numberList){
			if ($scope.numberList[i]<$scope.chosenNumber&&$scope.selectedNumberList.indexOf($scope.numberList[i])===-1&&$scope.numberList[i]>0){
				$scope.errorList.push($scope.numberList[i]);
			}
		}
		if ($scope.errorList.length==0){
			$scope.step1Ended = true;
			NotificationService.success('6Nimmt',$translate.instant("6nimmt.nowFindBiggest"));
			return;
		}
		NotificationService.danger('6Nimmt',$translate.instant("6nimmt.errorRetry"));
	}
}]);

