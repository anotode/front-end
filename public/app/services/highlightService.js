angular.module('highlightService', [])


.factory('Highlight', function($http, AuthToken) {


	var highlightFactory = {};

	highlightFactory.all = function() {
		return $http.get('http://anotode.herokuapp.com/api/highlights?token='+AuthToken.getToken());
	}


	highlightFactory.create = function(highlightData){
		return $http.post('http://anotode.herokuapp.com/api/highlights?token='+AuthToken.getToken(), highlightData);
	}

	highlightFactory.update = function(id,highlightData){
		return $http.put('http://anotode.herokuapp.com/api/highlights/'+id+'?token='+AuthToken.getToken(), highlightData);
	}

	highlightFactory.delete = function(id,highlightData){
		return $http.delete('http://anotode.herokuapp.com/api/highlights/'+id+'?token='+AuthToken.getToken(), highlightData);
	}

	return highlightFactory;

})


.factory('Category', function($http, AuthToken) {


	var categoryFactory = {};

	categoryFactory.all = function(){
		return $http.get('https://anotode.herokuapp.com/api/highlights/categories?token='+AuthToken.getToken());
	}
	
	
	return categoryFactory;

})


.factory('Search', function($http, AuthToken) {


	var searchFactory = {};

	searchFactory.search = function(k){
		return $http.get('https://anotode.herokuapp.com/api/highlights?token='+AuthToken.getToken()+'&contains='+k);
	}
	
	
	return searchFactory;

})


.factory('AuthToken', function($window) {

	var authTokenFactory = {};

	authTokenFactory.getToken = function() {
		return $window.localStorage.getItem('token');
	}

	authTokenFactory.setToken = function(token) {

		if(token)
			$window.localStorage.setItem('token', token);
		else
			$window.localStorage.removeItem('token');

	}

	return authTokenFactory;

})


.factory('AuthInterceptor', function($q, $location, AuthToken) {

	var interceptorFactory = {};


	interceptorFactory.request = function(config) {

		var token = AuthToken.getToken();

		if(token) {

			config.headers['x-access-token'] = token;

		}

		return config;

	};

	
	return interceptorFactory;
})


.factory('socketio', function($rootScope) {

	var socket = io.connect();
	return {

		on: function(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		},

		emit: function(eventName, data, callback) {
			socket.emit(eventName, data, function() {
				var args = arguments;
				$rootScope.apply(function() {
					if(callback) {
						callback.apply(socket, args);
					}
				});
			});
		}

	};

})


