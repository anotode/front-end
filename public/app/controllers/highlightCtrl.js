angular.module('highlightCtrl', ['highlightService'])


	.controller('HighlightController', function(Highlight, $location, socketio) {
		

		var vm = this;

		Highlight.all()
			.success(function(data) {
				vm.highlights = data;
			});
			
		

	
		vm.createHighlight = function(){
			vm.processing = true;
			vm.message='';
			Highlight.create(vm.highlightData)
				.success(function(data){
					vm.processing = false;

					vm.highlightData ={};

					vm.message = data.message;
					
			});
			$location.path('/dashboard');
		}

		vm.updateHighlight = function(id){
		        vm.high;
			Highlight.update(id,vm.highlightData)
				.success(function(data){
        		for (var i = 0; i < vm.highlightData.length; i++) {
            			vm.currHigh = vm.highlightData[i];
            			if (currHigh._id === id) {
                		high = currHigh;
                		break;
            					}
        			}
			
		});
			$location.path('/dashboard');
		
		}


		vm.deleteHighlight = function(id){
			Highlight.delete(id,vm.highlightData)
				.success(function(data){
			vm.highlights.splice(vm.highlights.indexOf(id), 1);
        		
			
		});
			$location.path('/dashboard');
		
		}


		
		
		socketio.on('highlight', function(data){
			vm.highlights.push(data);
		})


})



.controller('CategoryController', function(Category, socketio) {
		var vm = this;
		

		Category.all()
			.success(function(data) {
				vm.categories = data;
			});
		})

.controller('SearchController', function(Search, socketio) {
		var vm = this;
		
		
		vm.searchHighlight = function(k){
		      
			Search.search(k)
				.success(function(data){
        			vm.highlights = data;
			
		});
			$location.path('/dashboard');
		
		}
		
	

		});








