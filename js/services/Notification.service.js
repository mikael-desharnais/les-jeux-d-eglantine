app.factory('NotificationService', ['$timeout',function($timeout) {
  return {
	slotList : [],
	danger : function(slot,message){
		this.message('danger',slot,message);
	},
	info : function(slot,message){
		this.message('info',slot,message);
	},
	warning : function(slot,message){
		this.message('warning',slot,message);
	},
	success : function(slot,message){
		this.message('success',slot,message);
	},
	message : function(status,slot,message){
		var messageObject = {
			"message" : message,
			"status" : status
		};
		var that = this;
		$timeout(function(){
			that.removeMessage(slot,messageObject);
		},10000,true);
		this.getSlot(slot).push(messageObject);
	},
	getSlot : function(slot){
		if (!angular.isDefined(this.slotList[slot])){
			this.slotList[slot]=[];
		}
		return this.slotList[slot];
	},
	clearSlot : function(slot){
		this.getSlot(slot).length=0;
	},
	removeMessage : function(slot,messageObject){
		var slot = this.getSlot(slot);
		slot.splice(slot.indexOf(messageObject), 1);
	}
  };
}]).directive('neNotification', ['NotificationService',function(NotificationService) {
	return {
		restrict: 'A',
		scope : {
			neNotification: '=neNotification'
		},
		template : '<div ng-repeat="slotElement in slotContent" class="alert alert-{{slotElement.status}}">{{slotElement.message}}</div>',
		link: function (scope, element,attrs) {
			scope.$watch("neNotification",function(newValue){
				scope.slotContent = NotificationService.getSlot(newValue);
			});
		}
	};
}]);