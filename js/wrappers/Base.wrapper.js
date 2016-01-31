app.config(['DBWrapperProvider',function(WrapperProvider){
	var wrapClass = function(){
		this.getRawData = function(){
			var toReturn = {};
			if (angular.isDefined(this.beforeGetRawData)){
				this.beforeGetRawData(toReturn);
			}
			for(var i in this.mask){
				toReturn[this.mask[i]]=this[this.mask[i]];
			}
			console.log(this,this.afterGetRawData);
			if (angular.isDefined(this.afterGetRawData)){
				this.afterGetRawData(toReturn);
			}
			return toReturn;
		}
		this.wrapEnd=function(){
			if (!angular.isDefined(this.originalElement)){
				this.originalElement = angular.copy(this);
			}
			if (!angular.isDefined(this.mask)){
				this.mask = [];
			}
		};
		this.revert=function(){
			for(var i in this.originalElement){
				this[i]=this.originalElement[i];
			}
			for(var i in this.wrappedWith){
				this.wrappedWith[i].apply(this);
			}
		}
	};
	WrapperProvider.addWrapper(['.*'],wrapClass);
}]);
