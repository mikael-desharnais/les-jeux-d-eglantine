app.factory('LangService', ['$resource','$indexedDB','DBWrapper','configuration','$injector',function($resource,$indexedDB,DBWrapper,configuration,$injector) {
  return {
  	list : [],
  	requiresReload : true,
	getList : function(){
		var that = this;
		if (this.requiresReload){
			that.requiresReload=false;
			$indexedDB.openStore('lang', function(store){
				that.list.length = 0;
				store.getAll().then(function(content){
					for(var i in content){
						that.list.push(DBWrapper.wrap('lang',content[i],$injector));
					}
				});
			});
		}
		return this.list;
	},
	save : function(wrapper){
	},
	create : function(wrapper){
	},
	delete : function(wrapper){
	},
	getNewInstance : function(){
	},
	sync : function(){
		var that = this;
		var get = $resource(configuration.serverDataURL+'lang',{},{
			get:{ isArray: true}
		}).get(function(data){
			$indexedDB.openStore('lang', function(store){
				store.clear();
				for(var i=0; i<data.length;i++){
					var object = {};
					for(var key in data[i]){
						if (!angular.isFunction(data[i][key])&&!angular.isObject(data[i][key])||angular.isArray(data[i][key])){
							object[key]=data[i][key];
						}
					}
					store.insert(object);
				}
				that.requiresReload=true;
				that.getList();
			});
		});
		return get.$promise;
		
	}
  };
}]);
