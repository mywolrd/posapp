var app = 
angular
.module('posapp', ['ui.router', 'angular-virtual-keyboard'])
.config(['VKI_CONFIG', function(VKI_CONFIG) {
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
}])
.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode({enabled:true,   requireBase: false});
    $urlRouterProvider.otherwise('/app');
    $stateProvider        
        .state('app', {
            url: '/app',
            template: "<neworder></neworder>"
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
    		template: '<neworder></neworder>'
    	})
    	.state('pickuporder', {
    		url: '/app/pickuporder',
    		tempate: '<h2>Pick Up Order</h2>'
    	});

}])
.factory('urlService', function() {
	
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
})
.factory('cartService', function() {
	var _data = {};
	_data.cart = [];
	
	return {
		getCart: function() {
			return _data.cart;
		},
		clearCart: function() {
			_data.cart = [];
			return _data.cart;
		},
		addItem: function(item) {
			var itemCopy = angular.copy(item);
			_data.cart.push(itemCopy);
			console.log(itemCopy);
			console.log(_data.cart);
		}
	};
})
.factory('menuService', ['$http', 'urlService', 'cartService', function($http, urlService, cartService) {
	
	var _data = {};

	function _setCurrentMenu(menu) {
		if(menu) {
			if (_data['current'])
				_data['previous'] = _data['current'];
			_data['current'] = menu;
		}
	}
	
	function _showPreviousMenu() {
		if(_data['previous']) {
			var _currentMenu = _data['current'];
			_data['current'] = _data['previous'];
			if (_currentMenu)
				_data['previous'] = _currentMenu;
		}
	}
	
	function _buildMenu(menuItems, numberOfItems) {
		var menu = [];
		var row = [];
		var i, len;
		var menuItem;
		
		for (i=0,len = menuItems.length; i < len; i++) {
			menuItem = menuItems[i];
			if (menuItem) {
				if (menuItem.submenu) {
					var submenu = _buildMenu(menuItem.submenu, numberOfItems);
					menuItem.submenu = submenu;
					
					menuItem.action = function(item) {
						_setCurrentMenu(item.submenu);
					}
				} else {
					menuItem.action = function(item) {
						cartService.addItem(item);
						_showPreviousMenu();
					}
				} 
				row.push(menuItem);
				
				if (((i+1) % numberOfItems) == 0 || i == (len-1)) {
					menu.push(row);
					row = [];
				}
			}
		}
		return menu;
	}
	
	return {
		ajaxGetMenuItem: function(success, fail) {
			if (!_data['menu'])
				$http.get(urlService.menu + '/list').then(success, fail);
		},
		getMainMenu: function() {
			if (_data['main'])
				return _data['main'];
		
			return [];
		},
		getCurrentMenu: function() {
			if (_data['current'])
				return _data['current'];
			
			return [];
		},
		setCurrentMenu: function(menu) {
			_setCurrentMenu(menu);
		},
		buildMenu: function(menuItems, numberOfItems) {
			if (!_data['main']) {
				var main = _buildMenu(menuItems, numberOfItems);
				_data['main'] = main;
				_data['current'] = main;
			}
		}
	}
}])
.factory('customerService', ['$http', 'urlService', 'stringService', function($http, urlService, stringService) {
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
}])
.factory('orderService', ['$http', 'urlService', 'stringService', function($http, urlService, stringService){
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
}])
.factory('stringService', function() {
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
		},
		lpad: function(str, len, char) {
			var pad = typeof char !== 'undefined' ? char : '0'; 
			while (str.length < len) 
				str = pad + str;
			return str;
		},
		rpad: function(str, lenm char) {
			
		}
	};
})
.component('keyboardInput', {
	templateUrl: 'keyboardInputComponent.html',
	bindings: {
		inputObjs: '<'
	}
})
.component('newcustomer', {
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
										reset();
									}, 
									function (res) {});
		};
		
		function reset() {
			$scope.inputObjs = [	{'label': 'Last Name', 'placeholder': 'Last Name', 'value': null, required: true},
		                     		{'label': 'First Name', 'placeholder': 'First Name', 'value': null, required: false},
		                     		{'label': 'Phone Number', 'placeholder': 'Phone Number', 'value': null, required: false}
		                     	];
		};
	},
	templateUrl: 'inputs.html' 	
})
.component('customersearch', {
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
})
.component('menuview', {
	controller : function(menuService) {
		this.$doCheck = function() {
			var menu = menuService.getCurrentMenu();
			if (menu) {
				this.items = menu;
			}
		}
	},
	templateUrl: 'menu.html'
})
.component('neworder', {
	controller : function(menuService, cartService) {
		this.$doCheck = function() {
			var cart = cartService.getCart();
			if(cart) {
				console.log(this.cart);
				this.cart = cart;
			}
		}
	},
	templateUrl: 'neworder.html'
})
.run(function($templateCache) {
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
			+					'<tr class="cursor-pointer" data-ng-click="rowClickAction(row)" data-ng-repeat="row in ::results" data-ng-class="row.id === idSelected ?' + "'selected' : ''" + '">'
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
	
	$templateCache.put('menu.html', 
			'<table class="table borderless">'
			+	'<tbody>'
			+		'<tr data-ng-repeat="menuItems in $ctrl.items">'
			+			'<td class="col-xs-2" data-ng-repeat="menuItem in menuItems">'
			+				'<button class="btn-block" data-ng-click="menuItem.action(menuItem)">{{menuItem.item.itemName}}</button>'
			+			'</td>'
			+		'</tr>'
			+	'</tbody>'
			+'</table>'
	);
	
	$templateCache.put('neworder.html',
			'<div class="row">'
			+	'<div class="col-xs-1"></div>'
			+	'<div class="col-xs-4">'
			+		'<table class="table borderless">'
			+			'<tbody>'
			+				'<tr>'
			+					'<td>Current Customer if needed</td>'
			+				'</tr>'
			+				'<tr>'
			+					'<td>Pick ups</td>'
			+				'</tr>'
			+				'<tr>'
			+					'<td>Date</td>'
			+				'</tr>'
			+				'<tr>'
			+					'<td>Date</td>'
			+				'</tr>'
			+				'<tr data-ng-repeat="item in $ctrl.cart">'
			+			   		'<td>{{item.item.itemName}}</td>'
			+				'</tr>'
			+				'<tr>'
			+					'<td>Quantity</td> <td>Price</td>'
			+				'</tr>'
			+			'</tbody>'
			+		'</table>'
			+	'</div>'
			+	'<div class="col-xs-6">'
			+		'<menuview></menuview>'
			+	'</div>'
			+	'<div class="col-xs-1"></div>'
			+'</div>'

	);
})
.run(['$http', 'menuService', function($http, menuService) {
	var numberOfButtons = 5;
	
	menuService.ajaxGetMenuItem(
		function (res) {
			//menuService.setMenuItems(res.data);
			processMenuItems(res.data);
		}, function (res) {		
	});
	
	function processMenuItems(menuItems) {		
		var menu = menuService.buildMenu(menuItems, numberOfButtons);
	};
}]);

