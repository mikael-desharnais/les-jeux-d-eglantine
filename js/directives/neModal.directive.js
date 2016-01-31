angular.module('ne-modal',[]).directive('neModal', ['$parse',function($parse) {
	return {
		restrict: 'A',
		link: function (scope, element,attrs) {
			var status = $parse(attrs.neStatus)(scope);
			status.setStatus=function(status){
					this.status = status;
				};
			status.getStatus=function(){
					return this.status;
				};
				
			var digestInProgress = false;
			jQuery(element).modal('hide');
			jQuery(element).on('hidden.bs.modal', function () {
				if (digestInProgress){
					status.setStatus(false);
				}else {
					scope.$apply(function(){
						status.setStatus(false);
					});
				}
			});
			jQuery(element).on('hide.bs.modal.prevent', function (e) {
				var modalCloseManager = $parse(attrs.neModalCloseManager)(scope);
				if (angular.isFunction(modalCloseManager)){
					if (!$parse(attrs.neModalCloseManager)(scope)()){
						e.preventDefault();
					}
				}
			});
			scope.$watch(attrs.neStatus,function(newValue){
				if (!angular.isDefined(newValue)){
					return;
				}
				digestInProgress=true;
				if (newValue.getStatus()){
					jQuery(element).attr('class','modal fade');
					jQuery(element).addClass(attrs.neDirection);
					jQuery(element).modal('show');
				}else {
					jQuery(element).modal('hide');
				}
				digestInProgress = false;
			},true);
		}
	};
}]);
