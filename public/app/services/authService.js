angular.module('authService', [])



.factory('Auth', function($http, $q, AuthToken) {


	var authFactory = {};

	authFactory.login = function(email, password) {

		return $http.post('http://anotode.herokuapp.com/api/login', {
			email: email,
			password: password
		})
		.success(function(data) {
			AuthToken.setToken(data.token);
			return data;
		})
	}
	
	authFactory.forgotpass = function(email){
		return $http.post('http://anotode.herokuapp.com/api/login/forgot_password', {
			email: email
		})
	
	}

	authFactory.logout = function() {
		AuthToken.setToken();
	}

	authFactory.isLoggedIn = function() {
		if(AuthToken.getToken())
			return true;
		else
			return false;
	}
	authFactory.getUser = function() {
		if(AuthToken.getToken())
			return $http.get("http://anotode.herokuapp.com/api/users/user?token="+AuthToken.getToken());
		else
			return $q.reject({message: "User has no token"});
		}

	return authFactory;

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
});


