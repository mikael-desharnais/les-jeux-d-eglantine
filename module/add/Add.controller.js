app.controller('AddController',['$scope','$rootScope', function($scope,$rootScope) {
	$scope.number1 = [];
	$scope.number2 = [];
	
	$rootScope.helpURL = 'module/add/view/help.html'
	
	$scope.ret = [];
	$scope.result = [];
	$scope.columnResult = [];
	$scope.retResult = [];
	$scope.resultStatus = {checked : false};
	
	$scope.getRandomNumber = function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	$scope.createNewAdd = function(){
		var number1 = $scope.getRandomNumber(100,100000)+"";
		var number2 = $scope.getRandomNumber(100,100000)+"";
		$scope.number1 =[];
		$scope.number2 =[];
		for(var i=0; i<number1.length;i++){
			$scope.number1.unshift(parseInt(number1.charAt(i)));
		}
		for(var i=0; i<number2.length;i++){
			$scope.number2.unshift(parseInt(number2.charAt(i)));
		}
		var total = (parseInt(number1)+parseInt(number2))+"";
		$scope.maxColumnNumber = total.length;
		$scope.ret = [];
		$scope.ret.length = $scope.maxColumnNumber-1;
		$scope.result = [];
		$scope.result.length = $scope.maxColumnNumber;
		$scope.columnResult = [];
		$scope.columnResult.length = $scope.maxColumnNumber;
		$scope.retResult = [];
		$scope.retResult.length = $scope.maxColumnNumber-1;
		$scope.resultStatus = {checked : false};
	}
	
	$scope.getMaxColumnNumber = function(){
		return $scope.maxColumnNumber;
	}
	$scope.check = function(){
		var ret = 0;
		for(var i=0;i<$scope.getMaxColumnNumber();i++){
			var res = ($scope.number1[i]>0?$scope.number1[i]:0)+($scope.number2[i]>0?$scope.number2[i]:0)+ret;
			if (res<10){
				var expRes = res;
				var expRet = 0;
			}else {
				var expRes = res-10;
				var expRet = 1;
			}
			console.log(res,expRes,expRet);
			$scope.columnResult[i] = (expRes==$scope.result[i]);
			if(i<$scope.getMaxColumnNumber()-1){
				$scope.retResult[i] = (expRet==($scope.ret[i]>0?$scope.ret[i]:0));
			}
			ret = expRet;
		}
		$scope.resultStatus.checked = true;
	}
	$scope.getResultClass = function(result){
		if (!$scope.resultStatus.checked){
			return;
		}
		if (result==null){
			return;
		}
		if (result){
			return 'add-success';
		}
		return 'add-error';
	}
	$scope.getFullResult = function(){
		var fullResult = true;
		for(var i in $scope.columnResult){
			fullResult = fullResult && $scope.columnResult[i];
		}
		for(var i in $scope.retResult){
			fullResult = fullResult && $scope.retResult[i];
		}
		return fullResult;
	}
	$scope.getFullResultClass = function(){
		var fullResult = $scope.getFullResult();
		if (fullResult){
			return 'alert alert-success';
		}
		return 'alert alert-danger';
	}
	$scope.getOffset = function(){
		return Math.floor((12-$scope.getMaxColumnNumber())/2);
	}
	$scope.createNewAdd();
	
}]);

