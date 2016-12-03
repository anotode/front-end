angular.module('mainCtrl', [])


.controller('MainController', function($rootScope, $location, Auth) {

	var vm = this;


	vm.loggedIn = Auth.isLoggedIn();

	$rootScope.$on('$routeChangeStart', function() {

		vm.loggedIn = Auth.isLoggedIn();
		Auth.getUser()
			.then(function(data) {
				vm.user = data.data;
			});

	});


	vm.doLogin = function() {

		vm.processing = true;

		vm.error = '';
		
		Auth.login(vm.loginData.email, vm.loginData.password)
			.success(function(data) {
				vm.processing = false;

				Auth.getUser()
					.then(function(data) {
						vm.user = data.data;
					});
				
				
				if(data.token)
					$location.path('/dashboard');
				else
					
					vm.error = data.message;
					
			});
	}

	vm.doforgotpassword = function(){
		vm.processing= true;
		Auth.forgotpass(vm.loginData.email)
			.success(function(data){
				vm.processing= false;
			});

	}
	
	vm.doLogout = function() {
		Auth.logout();
		$location.path('/logout');
	}



});
