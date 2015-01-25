var petitionVis = angular.module('petitionVis', ['ui.router']);

petitionVis.factory('petitions', ['$http', function($http){
	var o = {
		petitions: []
	};

	o.getAll = function() {
		return $http.get('/petitions').then(function(res){
		   	angular.copy(res.data.results, o.petitions);
		  });
	}

	return o;
}]);

petitionVis.controller('MainCtrl', [
	'$scope', 'petitions',
	function($scope, petitions){
		$scope.petitions = petitions.petitions;
	}
	]).config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl',
			resolve: {
			  petitionPromise: ['petitions', function(petitions){
			    return petitions.getAll();
			  }]
			}
		})
		$urlRouterProvider.otherwise('home');
	}]);

