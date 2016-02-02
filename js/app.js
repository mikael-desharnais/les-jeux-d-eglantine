
var app = angular.module('jeApp', ['ngRoute','ngResource','ngMessages','pascalprecht.translate','ne-modal','ne-loader','ne-db-wrapper','set-height']);
app.config(function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/partials/index.html',
		controller: 'IndexController'
	}).when('/add', {
		templateUrl: 'module/add/view/add.html',
		controller: 'AddController'
	}).when('/6nimmt', {
		templateUrl: 'module/6nimmt/view/6nimmt.html',
		controller: '6NimmtController'
	}).when('/handriting-to-script', {
		templateUrl: 'module/handwritingtoscript/view/handritingToScript.html',
		controller: 'HandritingToScriptController'
	}).when('/lower-to-uppercase', {
		templateUrl: 'module/lowertouppercase/view/lowerToUppercase.html',
		controller: 'LowerToUppercaseController'
	}).when('/sort', {
		templateUrl: 'module/sort/view/sort.html',
		controller: 'SortController'
	}).otherwise({
		redirectTo: '/'
	});
}).config(['$translateProvider', function ($translateProvider) {
	$translateProvider.preferredLanguage('fr_FR');

	$translateProvider.useStaticFilesLoader({
		prefix: 'languages/',
		suffix: '.json'
    });
}]).run(['$rootScope', function ($rootScope) {
	$rootScope.helpModal = {};
	$rootScope.$on('$locationChangeStart', function() {
		$rootScope.showBackButton = true;
		$rootScope.showHelpButton = true;
	});
}]);

