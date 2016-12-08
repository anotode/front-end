'use strict';

var states = [
        { name: 'base', state: { abstract: true, url: '', templateUrl: 'app/views/base.html', data: {text: "Base", visible: false } } },
        { name: 'login', state: { url: '/login', parent: 'base', templateUrl: 'app/views/login.html',controller: 'MainController',
			controllerAs: 'main', data: {text: "Login", visible: false } } },
	{ name: 'register', state: { url: '/register', parent: 'base', templateUrl: 'app/views/signup.html', data: {text: "Register", visible: false } } },
	{ name: 'home', state: { url: '/', parent: 'base', templateUrl: 'app/views/home.html', data: {text: "Home", visible: false } } },
        { name: 'dashboard', state: { url: '/dashboard', parent: 'base', templateUrl: 'app/views/dashboard.html',  data: {text: "Dashboard", visible: false } } },
        { name: 'overview', state: { url: '/highlights', parent: 'dashboard', templateUrl: 'app/views/dashboard/overview.html', data: {text: "Overview", visible: true } } },
        { name: 'categories', state: { url: '/categories', parent: 'dashboard', templateUrl: 'app/views/dashboard/categories.html', data: {text: "Categories", visible: true } } },
	{ name: 'create', state: { url: '/create', parent: 'dashboard', templateUrl: 'app/views/dashboard/createnote.html', data: {text: "Create", visible: true } } },
	{ name: 'edit', state: { url: '/highlights/edit/:id', parent: 'dashboard', templateUrl: 'app/views/dashboard/edit.html',controller: function($scope, $stateParams) {
     $scope.id = $stateParams.id;
  }, data: {text: "Edit", visible: true } } },
	{ name: 'note', state: { url: '/notes', parent: 'dashboard', templateUrl: 'app/views/dashboard/note.html', data: {text: "Note", visible: true } } },
	{ name: 'forgot', state: { url: '/forgot_password', parent: 'dashboard', templateUrl: 'app/views/dashboard/pass.html', data: {text: "Foegot", visible: true } } },
	 { name: 'content', state: { url: '/highlights/:hid', parent: 'dashboard', templateUrl: 'app/views/dashboard/show.html',controller: function($scope, $stateParams) {
     $scope.hid = $stateParams.hid;
  }, data: {text: "Show", visible: true } } },
        { name: 'logout', state: { url: '/login', data: {text: "Logout", visible: true }} }
    ];
   
angular.module('yapp', [
                'ui.router',
		'snap',
                'ngAnimate',
		'mainCtrl', 'authService', 'userCtrl', 'userService', 'highlightService', 'highlightCtrl', 'reverseDirective'
		
            ])
        .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.when('/dashboard', '/dashboard/highlights');
            $urlRouterProvider.otherwise('/');
            
            angular.forEach(states, function (state) {
                $stateProvider.state(state.name, state.state);
            });
	 $locationProvider.html5Mode(true);
        });
