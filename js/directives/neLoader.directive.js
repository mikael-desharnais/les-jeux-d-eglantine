angular.module('ne-loader',[]).directive('neLoader', ['$parse', function($parse) {
	return {
		restrict: 'A',
		link: function (scope, element,attrs) {
			scope.$watch(attrs.neLoader,function(newValue){
				if (newValue){
					var options = $parse(attrs.neLoaderOptions)(scope);
					if (!angular.isDefined(options)){
						return;
					}
					element.data('former-position',element.css('position'));
					var spinner = jQuery('<div class="spinner-holder"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>');
					if (options.type=="block"){
						element.data('spinner',spinner);
						element.css('position','relative');
						jQuery(element).append(spinner);
						spinner.width(jQuery(element).width());
						spinner.height(jQuery(element).height());
					}
					else if (options.type=="button"){
						var spinner = jQuery('<i class="spinner-holder"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></i>');
						jQuery(element).prepend(spinner);
					}
					element.data('spinner',spinner);
				}else {
					if (!angular.isDefined(element.data('spinner'))){
						return;
					}
					element.css('position',element.data('former-position'));
					element.data('spinner').remove();
				}
			},true);
		}
	};
}]);
