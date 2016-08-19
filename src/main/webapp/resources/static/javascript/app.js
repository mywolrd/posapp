var app = angular.module('posapp', ['ui.router', 'angular-virtual-keyboard']);

app.config(['VKI_CONFIG', function(VKI_CONFIG) {
	VKI_CONFIG.layout['POS Keyboard'] = {
			'name': "POS Application Keyboard", 
			'keys': [
			         [["0"],["1"],["2"],["3"],["4"],["5"],["6"],["7"],["8"], ["9"]],
			         [["A"],["B"],["C"],["D"],["E"],["F"],["G"],["H"],["I"], ["J"]],
			         [["K"],["L"],["M"],["N"],["O"],["P"],["Q"],["R"],["S"], ["T"]],
			         [["U"],["V"],["W"],["X"],["Y"],["Z"],["",""],["",""],["",""],["",""]],
			         [[" ", " "],["Bksp", "Bksp"],["Enter", "Enter"]]
			         ], 
			'lang': ["en-US"] };
}]);

app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode({enabled:true,   requireBase: false});
    $urlRouterProvider.otherwise('/app');
    $stateProvider        
        .state('app', {
            url: '/app',
            template: "<h1>Hello</h1>"
        })
        .state('newcustomer', {
        	url: '/app/newcustomer',
        	template: '<newcustomer></newcustomer>'
        })
        .state('searchcustomer', {
        	url: '/app/searchcustomer',
        	template: '<customersearch></customersearch>'
        })
    	.state('neworder', {
    		url: '/app/neworder',
    		template: '<h2>New Order</h2>'
    	})
    	.state('pickuporder', {
    		url: '/app/pickuporder',
    		tempate: '<h2>Pick Up Order</h2>'
    	});

}]);

app.factory('urlService', function() {
	
	var service = {};
	var protocol = location.protocol;
	var host = location.host;
	var root = 'app';
	var base = protocol + '//' + host + '/' + root;
	
	service.main = base + '/main';
	service.menu = base + '/menu';
	service.order = base + '/order';
	service.customer = base + '/customer';
	
	return service;
});

app.factory('menuService', ['$http', 'urlService', function($http, urlService) {
	
	var _data = {};
	
	return {
		menuItems: _data,
		
		ajaxListMenuItem: function(success, fail) {
			if (!_data['menu'])
				$http.get(urlService.menu + '/list').then(success, fail);
		},
		
		setMenuItems: function(menuItems) {
			_data['menu'] = menuItems;
		},
		
		getMenuItems: function() {
			return _data['menu'];
		}
	}
}]);

app.factory('customerService', ['$http', 'urlService', 'stringService', function($http, urlService, stringService) {
	var _data = {};
	return {
		save: function(info, success, fail) {
			$http.post(urlService.customer + '/save', info).then(success, fail);
		},
		
		update: function(info, success, fail) {
			$http.post(urlService.customer + '/update', info).then(success, fail);
		},
		
		search: function(querystr, success, fail) {
			if (null != querystr)
				$http.get(urlService.customer + '/search/' + querystr.toLowerCase()).then(success, fail);
		},
		
		setCurrentCustomer: function(customer) {
			_data.previous = _data.current;
			_data.current = customer;
		},
		
		getCurrentCustomer: function() {
			return _data.current;
		},
		
		resetCurrentCustomer: function() {
			_data.previous = _data.current;
			_data.current = null;
		}
	};
}]);

app.factory('orderService', ['$http', 'urlService', 'stringService', function($http, urlService, stringService){
	return {
		save: function() {
			
		},
		
		update: function() {
			
		},
		
		pickup: function() {
			
		},
		
		search: function() {
			
		}
	};
}]);

app.factory('stringService', function() {
	return {
		isLetterOnly: function(str) {
			if(str.search(/[^A-Za-z\s]/) != -1)
				return false;
			
			return true;
		},
		isNumberOnly: function(str) {
			if(str.search(/[^0-9]/) != -1)
				return false;
			
			return true;
		}
	};
});

app.run(function($templateCache) {
	$templateCache.put('keyboardInputComponent.html', 
				'<div class="row form-horizontal" data-ng-repeat="inputObj in $ctrl.inputObjs">'
			+		'<div class="form-group form-group-lg">'
			+			'<label class="col-xs-4 control-label" for="formGroupInputLarge{{$index}}">{{inputObj.label}}</label>'
			+			'<div class="col-xs-8">'
			+				'<input class="form-control" ng-required="inputObj.required" data-ng-virtual-keyboard="{kt:' + "'POS Keyboard'" + ', relative: false, size: 5}" type="text" data-ng-model="inputObj.value" id="formGroupInputLarge{{$index}}" placeholder="{{inputObj.placeholder}}">'
			+			'</div>'
			+		'</div>'
			+	'</div>'
	);
	$templateCache.put('inputs.html',
				'<form class="input-form">'
			+	'<div class="row">'
			+		'<div class="col-xs-1"></div>'
			+		'<div class="col-xs-4">'
			+			'<h1>{{title}}</h1><br/>'
			+			'<keyboard-input input-objs="inputObjs"></keyboard-input>'
			+			'<br/>'
			+			'<div class="row">'
			+				'<button class="btn btn-primary btn-lg btn-block" data-ng-click="action()">{{actionName}}</button>'
			+			'</div>'
			+		'</div>'
			+		'<div class="col-xs-6">'
			+			'<br/><br/>'
			+			'<table class="table">'
			+				'<tbody>'
			+					'<tr data-ng-click="rowClickAction(row)" data-ng-repeat="row in ::results" data-ng-class="row.id === idSelected ?' + "'selected' : ''" + '">'
			+						'<td>{{$index+1}}</td>'				
			+						'<td data-ng-repeat="str in ::row.strs">{{::str}}</td>'
			+					'</tr>'
			+				'</tbody>'
			+			'</table>'
			+		'</div>'
			+		'<div class="col-xs-1"></div>'
			+	'</div>'
			+	'</form>'
	);
});



app.component('keyboardInput', {
	templateUrl: 'keyboardInputComponent.html',
	bindings: {
		inputObjs: '<'
	}
});

app.component('newcustomer', {
	controller: function($scope, customerService) {
		$scope.title = 'New Customer';
		$scope.actionName = 'Save';
		$scope.inputObjs = [	{'label': 'Last Name', 'placeholder': 'Last Name', 'value': null, required: true},
                     		{'label': 'First Name', 'placeholder': 'First Name', 'value': null, required: false},
                     		{'label': 'Phone Number', 'placeholder': 'Phone Number', 'value': null, required: false}
                     	];
		
		$scope.action = function() {
			customerService.save({	'lastName': $scope.inputObjs[0].value,
									'firstName':$scope.inputObjs[1].value,
									'phoneNumber': $scope.inputObjs[2].value},
									function (res) {
										customerService.setCurrentCustomer(res.data);
										reset();}, 
									function (res) {}	);
		};
		
		function reset() {
			$scope.inputObjs = [	{'label': 'Last Name', 'placeholder': 'Last Name', 'value': null, required: true},
		                     		{'label': 'First Name', 'placeholder': 'First Name', 'value': null, required: false},
		                     		{'label': 'Phone Number', 'placeholder': 'Phone Number', 'value': null, required: false}
		                     	];
		};
	},
	templateUrl: 'inputs.html' 	
});

app.component('customersearch', {
	controller: function($scope, customerService) {
		$scope.title = 'Search';
		$scope.actionName = 'Search';
		$scope.idSelected = 0;
		$scope.inputObjs = [	
	                 		{label: 'Customer', placeholder: 'Last Name', value: null, required: true}
	                 	];
		
		$scope.action = function() {
			customerService.search($scope.inputObjs[0].value,
					function(res) {
					$scope.results = res.data;
					$scope.results.map(function(customer) {
						customer.strs = toStrings(customer);
				});
				}, function(res) {
					
				});
		};
		
		$scope.rowClickAction = function(customer) {
			$scope.idSelected = customer.id;
			customerService.setCurrentCustomer(customer);
		};
		
		function toStrings(customer) {
			var strs = [];
			strs.push(customer.lastName);
			
			if (customer.firstName) {
				strs.push(customer.firstName);
			}
			
			if (customer.number) {
				strs.push(customer.number);
			}
			
			return strs;
		};
		
		function reset() {
			$scope.inputObjs = [	
		                 		{label: 'Customer', placeholder: 'Last Name', value: null, required:true}
		                 	];
		};
	},
	templateUrl: 'inputs.html' 	
});

app.controller('mainController', ['$scope', 'menuService', function($scope, menuService) {
	
}]);

app.controller('menuController', ['$scope', 'menuService', function($scope, menuService) {
	menuService.ajaxListMenuItem(
		function (res) {
			menuService.setMenuItems(res.data);
		}, function (res) {		
	});
}]);

