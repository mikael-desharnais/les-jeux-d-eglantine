angular.module('ne-db-wrapper',[]).provider('DBWrapper',function WrapperProvider(){
	var that = this;
	this.wrapperList = [];
	this.$get = [function WrapperFactory(){
		return that;
	}];
	this.addWrapper = function(routes,wrapper){
		for(var i in routes){
			if (!angular.isDefined(this.wrapperList[routes[i]])){
				this.wrapperList[routes[i]]= [];
			}
			this.wrapperList[routes[i]].push(wrapper);
		}
	};
	this.getWrappers = function(route){
		var toReturn = [];
		for(var i in this.wrapperList){
			if (i==route){
				toReturn = toReturn.concat(this.wrapperList[i]);
			}else {
				var regexp =  new RegExp(i, "i");
				
				if (regexp.test(route)){
					toReturn = toReturn.concat(this.wrapperList[i]);
				}
			}
		}
		return toReturn;
	};
	this.wrap = function(type,element,$injector){
		var classWrappers = this.getWrappers(type);
		for(var i in classWrappers){
			angular.extend(element,new classWrappers[i]());
			if (angular.isFunction(element.wrapEnd)){
				element.wrapEnd();
				if (!angular.isArray(element.wrappedWith)){
					element.wrappedWith=[];
				}
				element.wrappedWith.push(element.wrapEnd);
			}
		}
		if (angular.isDefined(element.inject)){
			$injector.invoke(element.inject,element);
		}
		return element;
	}
});
