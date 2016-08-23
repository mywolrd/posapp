var app = 
angular
.module('posapp', ['ui.router', 'angular-virtual-keyboard'])
.constant('APP_CONFIG', {

	NAVIGATION : [
	              {name: "POS App"},
	              {name: "Order", menu: [{name: "New", link:"neworder"}, {name: "PickUp", link:"pickuporder"}], customer:false},
	              {name: "Customer", menu:[{name: "New", link:"newcustomer"}, {name: "Search", link:"searchcustomer"}], customer:true}
	              ],
	
	// true : requires a customer to save an order
	// false: does not
	CUSTOMER_MODE: true,

	// true : pick a date from the order menu
	// false: today's date 
	READY_DATE: true
})
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
.factory('stringService', function() {
	var _NBSP = '\xa0';

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
		lpad: function(s, len, char) {
			var str = s.toString();
			var pad = angular.isDefined(char) ? char : _NBSP; 
			while (str.length < len) {
				str = pad + str;
			}
			return str;
		},
		rpad: function(str, len, char) {
			
		}
	};
})
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
.factory('cartService', ['stringService', function(stringService) {
	var _data = {};
	_data.cart = [];
	
	function _CartItem(item, quantity, newprice) {
		var item = item;
		var quantity = quantity;
		var newprice = newprice;
		
		this.getItem = function() {
			return item;
		}
		
		this.getQuantity = function() {
			return quantity;
		}
		
		this.getNewprice = function() {
			return newprice;
		}
		
		this.toString = function() {
			var str = '';
			str += stringService.lpad(quantity, 5);
			str += stringService.lpad(item.itemName, 30);
			str += stringService.lpad(item.price.dollar, 10);
			str += '.';
			str += item.price.cent;
			return str;
		}
	}
	
	return {
		getCart: function() {
			return _data.cart;
		},
		clearCart: function() {
			_data.cart = [];
			return _data.cart;
		},
		addItem: function(menuItem) {
			var itemCopy = angular.copy(menuItem.item);
			var cartItem = new _CartItem(itemCopy, 1, null);
			_data.cart.push(cartItem);
		}
	};
}])
.factory('menuService', ['$http', 'urlService', 'cartService', function($http, urlService, cartService) {
	
	var _data = {};
	var _CUR = 'current';
	var	_PREV = 'previous';
	var _MAIN = 'main';
	var _MENU = 'menu';
	
	function _setCurrentMenu(menu) {
		if(menu) {
			if (_data[_CUR])
				_data[_PREV] = _data[_CUR];
			_data[_CUR] = menu;
		}
	}
	
	function _showPreviousMenu() {
		if(_data[_PREV]) {
			var _currentMenu = _data[_CUR];
			_data[_CUR] = _data[_PREV];
			if (_currentMenu)
				_data[_PREV] = _currentMenu;
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
			if (!_data[_MENU])
				$http.get(urlService.menu + '/list').then(success, fail);
		},
		getMainMenu: function() {
			if (_data[_MAIN])
				return _data[_MAIN];
		
			return [];
		},
		getCurrentMenu: function() {
			if (_data[_CUR])
				return _data[_CUR];
			
			return [];
		},
		setCurrentMenu: function(menu) {
			_setCurrentMenu(menu);
		},
		buildMenu: function(menuItems, numberOfItems) {
			if (!_data[_MAIN]) {
				var main = _buildMenu(menuItems, numberOfItems);
				_data[_MAIN] = main;
				_data[_CUR] = main;
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
.component('navigation', {
	controller: function(APP_CONFIG) {
		var navigationObj = APP_CONFIG.NAVIGATION;
		
		this.root = navigationObj.splice(0, 1);
		this.navigations = checkCustomerMode(navigationObj);
		
		function checkCustomerMode(navigationObj) {
			var arr = [];
			var i, len;
			for (i=0,len = navigationObj.length; i < len; i++) {
				if (!(navigationObj[i].customer & !APP_CONFIG.CUSTOMER_MODE)) {
					arr.push(navigationObj[i]);
				}
			}
			return arr;
		}
	},
	templateUrl: 'navigation.html'
		
})
.component('keyboardInput', {
	templateUrl: 'keyboardInputComponent.html',
	bindings: {
		inputObjs: '<'
	}
})
.component('newcustomer', {
	controller: function(customerService) {
		this.title = 'New Customer';
		this.actionName = 'Save';
		this.inputObjs = [	{'label': 'Last Name', 'placeholder': 'Last Name', 'value': null, required: true},
                     		{'label': 'First Name', 'placeholder': 'First Name', 'value': null, required: false},
                     		{'label': 'Phone Number', 'placeholder': 'Phone Number', 'value': null, required: false}
                     	];
		
		this.action = function() {
			customerService.save({	'lastName': this.inputObjs[0].value,
									'firstName':this.inputObjs[1].value,
									'phoneNumber': this.inputObjs[2].value},
									function (res) {
										customerService.setCurrentCustomer(res.data);
										reset();
									}, 
									function (res) {});
		};
		
		function reset() {
			this.inputObjs = [	{'label': 'Last Name', 'placeholder': 'Last Name', 'value': null, required: true},
		                     		{'label': 'First Name', 'placeholder': 'First Name', 'value': null, required: false},
		                     		{'label': 'Phone Number', 'placeholder': 'Phone Number', 'value': null, required: false}
		                     	];
		};
	},
	templateUrl: 'inputs.html' 	
})
.component('customersearch', {
	controller: function(customerService) {
		
		this.title = 'Search';
		this.actionName = 'Search';
		this.idSelected = 0;
		this.inputObjs = [	
	                 		{label: 'Customer', placeholder: 'Last Name', value: null, required: true}
	                 	];
		
		this.action = function() {
			var ctrl = this;
			customerService.search(this.inputObjs[0].value,
				function(res) {
					ctrl.results = res.data;
					ctrl.results.map(function(customer) {
						customer.strs = toStrings(customer);
				});
				}, function(res) {
					
				});
		};
		
		this.rowClickAction = function(customer) {
			this.idSelected = customer.id;
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
			this.inputObjs = [	
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
.component('cartview', {
	controller: function(cartService) {
		this.$doCheck = function() {
			var cart = cartService.getCart();
			if(cart) {
				this.cart = cart;
			}
		}
	},
	template: 	'<table class="table borderless">'
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
	+				'<tr data-ng-repeat="cartItem in $ctrl.cart">'
	+			   		'<td>{{cartItem.toString()}}</td>'
	+				'</tr>'
	+				'<tr>'
	+					'<td>Quantity</td> <td>Price</td>'
	+				'</tr>'
	+			'</tbody>'
	+		'</table>'
})
.component('neworder', {
	templateUrl: 'neworder.html'
})
.run(function($templateCache) {
	$templateCache.put('navigation.html',
			'<nav class="navbar navbar-inverse" role="navigation">'
			+	'<div class="navbar-header">'
			+		'<a class="navbar-brand" data-ui-sref="app">POS App</a>'
			+	'</div>'
			+	'<ul class="nav navbar-nav">'
			+		'<li class="dropdown" data-ng-repeat="navigation in $ctrl.navigations">'
			+			'<a class="dropdown-toggle" data-toggle="dropdown" href="">{{navigation.name}}'
			+				'<span class="caret"></span>'
			+			'</a>'
			+			'<ul class="dropdown-menu">'
			+				'<li data-ng-repeat="route in navigation.menu">'
			+					'<a ui-sref="{{route.link}}">{{route.name}}</a>'
			+				'</li>'
		   	+			'</ul>'
		   	+		'</li>'            		
		   	+	'</ul>'
		   	+'</nav>'	
	);
	
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
			+			'<keyboard-input input-objs="$ctrl.inputObjs"></keyboard-input>'
			+			'<br/>'
			+			'<div class="row">'
			+				'<button class="btn btn-primary btn-lg btn-block" data-ng-click="$ctrl.action()">{{$ctrl.actionName}}</button>'
			+			'</div>'
			+		'</div>'
			+		'<div class="col-xs-6">'
			+			'<br/><br/>'
			+			'<table class="table">'
			+				'<tbody>'
			+					'<tr class="cursor-pointer" data-ng-click="$ctrl.rowClickAction(row)" data-ng-repeat="row in $ctrl.results" data-ng-class="row.id === $ctrl.idSelected ?' + "'selected' : ''" + '">'
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
			+		'<cartview></cartview>'
			+	'</div>'
			+	'<div class="col-xs-6">'
			+		'<menuview></menuview>'
			+	'</div>'
			+	'<div class="col-xs-1"></div>'
			+'</div>'

	);
})
.run(['menuService', function(menuService) {
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

