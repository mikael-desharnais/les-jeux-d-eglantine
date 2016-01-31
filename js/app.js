
var app = angular.module('jeApp', ['ngRoute','ngResource','ngMessages','pascalprecht.translate','ne-modal','ne-loader','ne-db-wrapper','set-height']);
app.config(function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/partials/index.html',
		controller: 'IndexController'
	}).when('/add', {
		templateUrl: 'views/partials/add.html',
		controller: 'AddController'
	}).when('/6nimmt', {
		templateUrl: 'views/partials/6nimmt.html',
		controller: '6NimmtController'
	}).when('/handriting-to-script', {
		templateUrl: 'views/partials/handritingToScript.html',
		controller: 'HandritingToScriptController'
	}).when('/lower-to-uppercase', {
		templateUrl: 'views/partials/lowerToUppercase.html',
		controller: 'LowerToUppercaseController'
	}).when('/sort', {
		templateUrl: 'views/partials/sort.html',
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
}]);

