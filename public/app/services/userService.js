angular.module('userService', [])


.factory('User', function($http) {

	var userFactory = {};

	userFactory.create = function(userData) {
		return $http.post('http://anotode.herokuapp.com/api/users', userData);
	}



	return userFactory;

});
