angular.module('set-height',[]).directive('setHeight', [ function() {
	return {
		restrict: 'E',
		link: function (scope, element,attrs) {
			jQuery('#page-wrapper').css('minHeight',(jQuery(window).height()-51)+'px');
			jQuery(window).resize(function(){
				jQuery('#page-wrapper').css('minHeight',(jQuery(window).height()-51)+'px');
			});
		}
	};
}]);
