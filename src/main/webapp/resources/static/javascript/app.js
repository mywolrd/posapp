//
// polyfill
//

String.prototype.repeat = String.prototype.repeat || function(n){ 
    return n<=1 ? this : (this + this.repeat(n-1)); 
}

//
//	Templates
//
function templates(angularTemplateCache) {
		angularTemplateCache.put('navigation.html',
				'<nav class="navbar navbar-inverse" role="navigation">'
			+		'<div class="navbar-header">'
			+ 			'<a class="navbar-brand" data-ui-sref="app">POS App</a>'
			+ 		'</div>'
			+ 		'<ul class="nav navbar-nav">'
			+ 			'<li class="dropdown" data-ng-repeat="navigation in $ctrl.navigations">'
			+ 				'<a class="dropdown-toggle" data-toggle="dropdown" href="">{{navigation.name}}'
			+ 					'<span class="caret"></span>'
			+ 				'</a>'
			+ 				'<ul class="dropdown-menu">'
			+ 					'<li data-ng-repeat="route in navigation.menu">'
			+ 						'<a ui-sref="{{route.link}}">{{route.name}}</a>'
			+ 					'</li>'
			+ 				'</ul>'
			+ 			'</li>'
			+ 		'</ul>' 
			+	'</nav>');

		angularTemplateCache.put('keyboardInputComponent.html',					
				'<div class="row form-horizontal" data-ng-repeat="inputObj in $ctrl.inputObjs">'
			+ 		'<div class="form-group form-group-lg">'
			+ 			'<label class="col-xs-4 control-label" for="formGroupInputLarge{{$index}}">{{inputObj.label}}</label>'
			+ 			'<div class="col-xs-8">'
			+ 				'<input class="form-control" ng-required="inputObj.required" data-ng-virtual-keyboard="{kt:' + "'POS Keyboard'" + ', relative: false, size: 5}" type="text" data-ng-model="inputObj.value" id="formGroupInputLarge{{$index}}" placeholder="{{inputObj.placeholder}}">'
			+ 			'</div>' 
			+ 		'</div>'
			+ 	'</div>');
		
		angularTemplateCache.put('inputs.html',
				'<form class="input-form">'
			+		'<div class="row">'
			+ 			'<div class="col-xs-1"></div>'
			+ 			'<div class="col-xs-4">'
			+ 				'<h1>{{title}}</h1><br/>'
			+ 				'<keyboard-input input-objs="$ctrl.inputObjs"></keyboard-input><br/>'
			+ 				'<div class="row">'
			+ 					'<button class="btn btn-primary btn-lg btn-block" data-ng-click="$ctrl.action()">{{$ctrl.actionName}}</button>'
			+ 				'</div>'
			+ 			'</div>'
			+ 			'<div class="col-xs-6">'
			+ 				'<br/><br/>'
			+ 				'<table class="table">'
			+ 					'<tbody>'
			+ 						'<tr class="cursor-pointer" data-ng-click="$ctrl.rowClickAction(row)" data-ng-repeat="row in $ctrl.results" data-ng-class="row.id === $ctrl.idSelected ?' + "'selected' : ''" + '">'
			+ 							'<td>{{$index+1}}</td>'
			+ 							'<td data-ng-repeat="str in ::row.displayValue">{{::str}}</td>'
			+ 						'</tr>'
			+ 					'</tbody>' 
			+ 				'</table>'
			+ 			'</div>'
			+ 			'<div class="col-xs-1"></div>'
			+ 		'</div>'
			+	'</form>');

		angularTemplateCache.put('menu.html',
				'<table class="table borderless">'
			+ 		'<tbody>'
			+ 			'<tr data-ng-repeat="items in $ctrl.itemMenu">'
			+ 				'<td class="col-xs-2" data-ng-repeat="item in items">'
			+ 					'<button class="btn-block" data-ng-click="item.action(item)">{{item.name}}</button>'
			+ 				'</td>' 
			+ 			'</tr>' 
			+ 		'</tbody>'
			+ 	'</table>'
			+ 	'<addonitemview></addonitemview>'
			+ 	'<menunumpad></menunumpad>');

		angularTemplateCache.put('neworder.html',
				'<div class="row">'
			+ 		'<div class="col-xs-1"></div>'
			+ 		'<div class="col-xs-4">'
			+ 			'<cartview></cartview>' 
			+ 		'</div>'
			+ 		'<div class="col-xs-6">'
			+ 			'<menuview></menuview>'
			+ 		'</div>'
			+ 		'<div class="col-xs-1"></div>' 
			+ 	'</div>');

		angularTemplateCache.put('cartview.html',
				'<table id="cart-info-table" class="table">'
			+ 		'<tbody>'
			+ 			'<tr data-ng-repeat="info in $ctrl.cartInfo">'
			+ 				'<td data-ng-if="info.enabled">'
			+ 					'<button class="btn btn-block" data-ng-click="info.action()">{{info.name}}</button>'
			+ 				'</td>'
			+ 				'<td data-ng-if="!info.enabled"><label>{{info.name}}</label></td>'
			+ 			'</tr>'
			+ 		'</tbody>'
			+ 	'</table>'
			+ 	'<div id="cart-items-list" class="col-xs-12">'
			+ 		'<span class="col-xs-12 cart-item" data-ng-repeat="cartItem in $ctrl.cart" data-ng-click="$ctrl.select($index)" data-ng-class="$index === $ctrl.selectedId ?' + "'selected' : ''" + '">'
			+ 			'{{cartItem.toString()}}'
			+ 		'</span>'
			+ 	'</div>');
}

//
//	Services
//	States and data are shared in services.
//

/**
 * String Service
 */
function stringService() {
	var _NBSP = '\xa0';

	function _repeatChar(str, len, char) {
		var pad = angular.isDefined(char) ? char : _NBSP;
		var padlen = len - str.length;
		return pad.repeat(padlen);
	}
	
	return {
		isLetterOnly : function(str) {
			if (str.search(/[^A-Za-z\s]/) != -1)
				return false;

			return true;
		},
		isNumberOnly : function(str) {
			if (str.search(/[^0-9]/) != -1)
				return false;

			return true;
		},
		getEmptyString : function(len) {
			var char = _NBSP;
			return char.repeat(len);
		},
		lpad : function(s, len, char) {
			var str = s.toString();

			return _repeatChar(str, len, char) + str;
		},
		rpad : function(s, len, char) {
			var str = s.toString();

			return str + _repeatChar(str, len, char);
		}
	};
}

/**
 * Url Service
 */
function urlService() {
	var protocol = location.protocol;
	var host = location.host;
	var root = 'app';
	var base = protocol + '//' + host + '/' + root;

	return {
		main : base + '/main',
		item : base + '/item',
		order : base + '/order',
		customer : base + '/customer',
	}
}

/**
 * Cart Service
 */
function cartService(APP_CONFIG, stringService) {
	var _DASH = '-';
	var _CHAR_ZERO = '0';
	var _ZERO = 0;
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

		this.setNewPrice = function(dollar, cent) {
			newprice = {dollar: dollar, cent: cent}
		}
		
		this.toString = function() {
			var str = '';
			var pricePtr = newprice ? newprice : item.price;
			var quantityPtr = quantity == 0 ? _DASH : quantity;

			str += stringService.lpad(quantityPtr, 5);
			str += stringService.getEmptyString(3);
			str += stringService.rpad(item.itemName, 25);
			
			str += stringService.lpad(pricePtr.dollar, 10);
			str += '.';
			str += stringService.lpad(pricePtr.cent, 2, _CHAR_ZERO);
			
			return str;
		}
	}

	return {
		getCart : function() {
			return _data.cart;
		},
		clearCart : function() {
			_data.cart = [];
		},
		addItem : function(item) {
			var itemCopy = angular.copy(item);
			var cartItem = itemCopy.itemType ? new _CartItem(itemCopy, 1, null) : new _CartItem(itemCopy, 0, null);
			_data.cart.push(cartItem);
		},
		getCartInfo : function() {
			//TODO Do I need this?
			var cartInfo = [];
		},
		getTotalQuantity: function() {
			var i, len;
			var total = 0;
			var cart = _data.cart;
			for(i=0, len=cart.length; i < len; i++) {
				total = total + cart[i].getQuantity();
			}
			return total;
		},
		getTotalPrice: function() {
			
		}
	};
}

/**
 * Customer Service
 */
function customerService(APP_CONFIG, $http, urlService, stringService) {
	var _data = {};
	return {
		getNewCustomerInput : function() {
			return angular.copy(APP_CONFIG.NEW_CUSTOMER_INPUT);
		},
		getSearchCustomerInput : function() {
			return angular.copy(APP_CONFIG.SEARCH_CUSTOMER_INPUT);
		},
		save : function(info, success, fail) {
			$http.post(urlService.customer + '/save', info).then(success, fail);
		},

		update : function(info, success, fail) {
			$http.post(urlService.customer + '/update', info).then(success,
					fail);
		},

		search : function(querystr, success, fail) {
			if (querystr)
				$http.get(
						urlService.customer + '/search/'
								+ querystr.toLowerCase()).then(success, fail);
		},

		setCurrentCustomer : function(customer) {
			if (customer) {
				_data.previous = _data.current;
				_data.current = customer;
			}
		},

		getCurrentCustomer : function() {
			if (_data.current)
				return _data.current;

			return null;
		},

		clearCurrentCustomer : function() {
			if (_data.current)
				_data.previous = _data.current;

			_data.current = null;
		}
	};
}


/**
 * Navigation Service
 */
function navigationService(APP_CONFIG, $state) {
	var _data = {};

	function _buildNavigation() {
		var navigationObj = APP_CONFIG.NAVIGATION;
		var customerMode = APP_CONFIG.CUSTOMER_MODE;
		if (navigationObj) {
			_data.root = navigationObj.splice(0, 1);

			var arr = [];
			var i, len;
			for (i = 0, len = navigationObj.length; i < len; i++) {
				if (!(navigationObj[i].customer & !customerMode)) {
					arr.push(navigationObj[i]);
				}
			}
			_data.navigations = arr;
		}
	}

	return {
		setRoute : function(next, previous) {
			if (next) {
				_data.next = next;
			}

			if (!previous) {
				_data.previous = $state.current.name;
			} else {
				_data.previous = previous;
			}
		},
		go : function() {
			if (_data.next) {
				$state.go(_data.next);
			}
		},
		back : function() {
			if (_data.previous) {
				$state.go(_data.previous);
			}
		},
		getRoot : function() {
			if (_data.root)
				return _data.root;

			return null;
		},
		getNavigation : function() {
			if (_data.navigations) {
				return _data.navigations;
			}
			return null;
		},
		buildNavigation : function() {
			if (!_data.root && !_data.navigations) {
				_buildNavigation();
			}
		}
	};
}

/** TODO
 * Order Service 
**/

function orderService() {
	return  {
		
	};
}

/**
 * Item Service
 */
function itemService(APP_CONFIG, $http, urlService) {
	var _data = {};
	
	//TODO
	//Add weight to item object. Java...
	function _groupItemsByType(items) {
		var groupedItems = {};
		var i, len;
		
		for (i=0, len=items.length; i < len; i++) {
			var item = angular.copy(items[i]);
			if (item.itemType) {
				var itemType = item.itemType.name;
				var groupedByType = groupedItems[itemType];
				
				if (!groupedByType) {
					groupedByType = [];
				}
				
				groupedByType.push(item);
				groupedItems[itemType] = groupedByType;
			}
		}
		return groupedItems;
	}
	
	function _ajaxGetItems() {
		$http.get(urlService.item + '/list')
				.then(
					function (res) {
						_data.items = _groupItemsByType(res.data);
					},
					function (res) {
						console.log(res);
					});
	}
	
	function _ajaxGetAddOnItems() {
		if (APP_CONFIG.SHOW_ADD_ON_ITEMS)
			$http.get(urlService.item + '/addonitem/list')
					.then(
						function (res) {
							_data.addonitems = res.data;
						},
						function (res) {
							console.log(res);
						});
	}
	
	return {
		initItemData: function() {
			_ajaxGetItems();
			//_ajaxGetAddOnItems();
		
			_data.addonitems = [ {
				itemName : 'Button1',
				price : {
					dollar : 5,
					cent : 0
				}
				}, {
					itemName : 'Button2',
					price : {
						dollar : 5,
						cent : 0
					}
				}, {
					itemName : 'Button3',
					price : {
						dollar : 5,
						cent : 0
					}
				}, {
					itemName : 'Button4',
					price : {
						dollar : 5,
						cent : 0
					}
				}, {
					itemName : 'Button5',
					price : {
						dollar : 5,
						cent : 0
					}
				}, {
					itemName : 'Button6',
					price : {
						dollar : 5,
						cent : 0
					}
				}, {
					itemName : 'Button7',
					price : {
						dollar : 5,
						cent : 0
					}
				} ];
		},
		getItems: function() {
			if (!_data.items) {
				return null;
			}			
			return _data.items;
		},
		getAddOnItems: function() {
			if (!_data.addonitems) {
				return null;
			}			
			return _data.addonitems;
		}
		
	};
}

function messageService(APP_CONFIG) {
	var _data = {};
	
	return {
		setMessage: function(message) {
			_data.message = message;
		},
		getMessage: function() {
			if (!angular.isDefined(_data.message))
				return null;
			
			return _data.message;
		},
		clearMessage: function() {
			_data.message = null;
		}
	};
}

function menuService(APP_CONFIG, $http, urlService, cartService) {
	var _data = {};

	function _buildAddOnItemsMenu(addOnItems) {
		if (!_data.addOnItems) {
			_data.addOnItems = addOnItems;

			_data.addOn_num_of_buttons = APP_CONFIG.NUMBER_OF_ADD_ON_ITEM_BUTTONS;
			_data.addOn_begin = 0;

			_setAddOnCurrent();
		}
	}

	function _resetAddOnItems() {
		if (_data.addOnItems) {
			_data.addOn_begin = 0;

			_setAddOnCurrent();
		}
	}

	function _setAddOnCurrent() {
		if (_data.addOn_begin >= 0) {
			_data.addOn_end = _data.addOn_begin + _data.addOn_num_of_buttons;
			_data.addOn_current = _data.addOnItems.slice(_data.addOn_begin,
					_data.addOn_end);
		}
	}


	return {
		ajaxGetAddOnItem : function(success, fail) {
			if (!_data.addonitems && APP_CONFIG.SHOW_ADD_ON_ITEMS)
				$http.get(urlService.menu + '/addonitem/list').then(success,
						fail);
		},
		ajaxGetMenuItem : function(success, fail) {
			if (!_data.menu)
				$http.get(urlService.menu + '/list').then(success, fail);
		},
		getAddOnItems : function() {
			if (_data.addOnItems) {
				_resetAddOnItems();
				return _data.addOn_current;
			}

			return [];
		},
		getCurrentAddOnItems : function() {
			if (_data.addOn_current)
				return _data.addOn_current;

			return [];
		},
		moveLeftAddOnItems : function() {
			_addOn_move_left();
		},
		moveRightAddOnItems : function() {
			_addOn_move_right();
		},
		buildAddOnMenu : function(addOnItems) {
			_buildAddOnItemsMenu(addOnItems);
		}
	}
}


//
//  Component controllers
//  Feeds data from services to UI. Stores UI states.
//

/**
 * New Customer Controller 
**/
function newCustomerCtrl(customerService) {
	var ctrl = this;

	ctrl.title = 'New Customer';
	ctrl.actionName = 'Save';
	ctrl.inputObjs = customerService.getNewCustomerInput();

	ctrl.action = function() {
		var param = {
			'lastName' : this.inputObjs[0].value,
			'firstName' : this.inputObjs[1].value,
			'phoneNumber' : this.inputObjs[2].value
		};
		
		customerService.save(param, function(res) {
			customerService.setCurrentCustomer(res.data);
			reset();
		}, function(res) {
		});
	};

	function reset() {
		ctrl.inputObjs = customerService.getNewCustomerInput();
	};
}

/**
 * Search Customer Controller 
**/
function searchCustomerCtrl(customerService, navigationService) {
	var ctrl = this;

	ctrl.title = 'Search';
	ctrl.actionName = 'Search';
	ctrl.idSelected = 0;
	ctrl.inputObjs = customerService.getSearchCustomerInput();

	ctrl.action = 
		function() {
			customerService.search( ctrl.inputObjs[0].value,
									function(res) {
										ctrl.results = res.data;
										ctrl.results.map(function(customer) {
											customer.displayValue = formatString(customer);
										});
							}, function(res) {

							});
		};

	ctrl.rowClickAction = 
		function(customer) {
			// this.idSelected = customer.id;
			customerService.setCurrentCustomer(customer);
			navigationService.back();
		};

	function formatString(customer) {
		var displayValue = [];
		displayValue.push(customer.lastName);

		if (customer.firstName) {
			displayValue.push(customer.firstName);
		}

		if (customer.number) {
			displayValue.push(customer.number);
		}

		return displayValue;
	};

	function reset() {
		ctrl.inputObjs = customerService.getSearchCustomerInput();
	};
}

/**
 * Navigation Controller 
**/
function navigationCtrl(navigationService) {
	var ctrl = this;
	
	ctrl.$onInit = function() {
		if (!navigationService.getNavigation())
			navigationService.buildNavigation();

		ctrl.navigations = navigationService.getNavigation();
	}
}


/**
 *  Menu Controller
**/
function itemMenuCtrl(itemService, cartService) {
	var ctrl = this;
	
	ctrl.items = null;
	ctrl.mainItemName = null;
	
	ctrl.$onInit = function() {
		if (!ctrl.items) {
			var items = itemService.getItems();
			if (items) {
				ctrl.items = items;
				_buildItemMenu();
			}
		}
	}
	
	function _buildItemMenu() {
		var itemMenu = [];
		var items = ctrl.items;
		
		for (var itemType in items) {
			var submenu = items[itemType];
			
			submenu.map(function(item) {
				item.action = function(item) {
					cartService.addItem(item);
					showMainItemMenu();
					ctrl.mainItemName = null;
				}
			});
			
			var item = {name: itemType, submenu: _buildItemMenuGrid(submenu, 5)};
			item.action = function(item) {
				ctrl.mainItemName = item.name;
				ctrl.itemMenu = item.submenu;
			}
			itemMenu.push(item);
		}
		
		ctrl.mainItemMenu = _buildItemMenuGrid(itemMenu, 5);
		ctrl.itemMenu = ctrl.mainItemMenu;
	}
	
	function showMainItemMenu() {
		ctrl.itemMenu = ctrl.mainItemMenu;
	}
	
	function _buildItemMenuGrid(items, numberOfItems) {
		var itemMenu = [];
		var row = [];
		var i, len;
		
		for (i=0, len=items.length; i < len; i++) {
			var item = items[i];
			row.push(item);

			if (((i + 1) % numberOfItems) == 0 || i == (len - 1)) {
				itemMenu.push(row);
				row = [];
			}			
		}
		return itemMenu;
	}
}

/**
 * AddonItemMenuController
**/
function addonItemMenuCtrl(itemService, cartService) {
	var ctrl = this;
	
	ctrl.addonItems = null;
	ctrl.numberOfButtons = 4;
	ctrl.begin = 0;
	
	ctrl.$onInit = function() {
		if (!ctrl.items) {
			var addonItems = itemService.getAddOnItems();
			if (addonItems) {
				addonItems.map(function(addonItem) {
					addonItem.action = function() {
						cartService.addItem(addonItem);
					}
				});
				
				ctrl.addonItems = addonItems;					
				setCurrentAddonItems();
			}
		}
	}
	

	ctrl.moveLeft = function() {
		if (ctrl.begin > 0) {
			ctrl.begin -= 1;

			setCurrentAddonItems();
		}
	}

	ctrl.moveRight = function() {
		var end = ctrl.begin + ctrl.numberOfButtons;
		if (end < ctrl.addonItems.length) {
			ctrl.begin += 1;

			setCurrentAddonItems();
		}
	}
	
	function setCurrentAddonItems() {
		ctrl.addonItemsCurrent = ctrl.addonItems.slice(ctrl.begin, ctrl.begin + ctrl.numberOfButtons);
	}
	
}

var app = angular.module('posapp', [ 'ui.router', 'angular-virtual-keyboard' ])
	.constant('APP_CONFIG', {
			NAVIGATION : [ {
				name : "POS App"
			}, {
				name : "Order",
				menu : [ {
					name : "New",
					link : "neworder"
				}, {
					name : "PickUp",
					link : "pickuporder"
				} ],
				customer : false
			}, {
				name : "Customer",
				menu : [ {
					name : "New",
					link : "newcustomer"
				}, {
					name : "Search",
					link : "searchcustomer"
				} ],
				customer : true
			} ],
			NEW_CUSTOMER_INPUT : [ {
				'label' : 'Last Name',
				'placeholder' : 'Last Name',
				'value' : null,
				required : true
			}, {
				'label' : 'First Name',
				'placeholder' : 'First Name',
				'value' : null,
				required : false
			}, {
				'label' : 'Phone Number',
				'placeholder' : 'Phone Number',
				'value' : null,
				required : false
			} ],
			SEARCH_CUSTOMER_INPUT : [ {
				label : 'Customer',
				placeholder : 'Last Name',
				value : null,
				required : true
			} ],
			// true : requires a customer to complete an order
			// false: does not
			CUSTOMER_MODE : true,

			SHOW_ADD_ON_ITEMS : true,
			NUMBER_OF_ADD_ON_ITEM_BUTTONS : 4,
			NUMBER_OF_BUTTONS_MENU : 5,

			// false : requires a ready date/time to complete an order
			// true : does not
			FIRST_COME_FIRST_SERVE : false,

			// true : pick a date from the order menu
			// false: today's date
			READY_DATE : true
		})
		.config(
				[
						'VKI_CONFIG',
						function(VKI_CONFIG) {
							VKI_CONFIG.layout['POS Keyboard'] = {
								'name' : "POS Application Keyboard",
								'keys' : [
										[ [ "0" ], [ "1" ], [ "2" ], [ "3" ],
												[ "4" ], [ "5" ], [ "6" ],
												[ "7" ], [ "8" ], [ "9" ] ],
										[ [ "A" ], [ "B" ], [ "C" ], [ "D" ],
												[ "E" ], [ "F" ], [ "G" ],
												[ "H" ], [ "I" ], [ "J" ] ],
										[ [ "K" ], [ "L" ], [ "M" ], [ "N" ],
												[ "O" ], [ "P" ], [ "Q" ],
												[ "R" ], [ "S" ], [ "T" ] ],
										[ [ "U" ], [ "V" ], [ "W" ], [ "X" ],
												[ "Y" ], [ "Z" ], [ "", "" ],
												[ "", "" ], [ "", "" ],
												[ "", "" ] ],
										[ [ " ", " " ], [ "Bksp", "Bksp" ],
												[ "Enter", "Enter" ] ] ],
								'lang' : [ "en-US" ]
							};
						} ])
		.config(
				[
						'$locationProvider',
						'$stateProvider',
						'$urlRouterProvider',
						function($locationProvider, $stateProvider,
								$urlRouterProvider) {
							$locationProvider.html5Mode({
								enabled : true,
								requireBase : false
							});
							$urlRouterProvider.otherwise('/app');
							$stateProvider.state('app', {
								url : '/app',
								template : "<neworder></neworder>"
							}).state('newcustomer', {
								url : '/app/newcustomer',
								template : '<newcustomer></newcustomer>'
							}).state('searchcustomer', {
								url : '/app/searchcustomer',
								template : '<customersearch></customersearch>'
							}).state('neworder', {
								url : '/app/neworder',
								template : '<neworder></neworder>'
							}).state('pickuporder', {
								url : '/app/pickuporder',
								tempate : '<h2>Pick Up Order</h2>'
							});

						} ])
		.factory('stringService', stringService)
		.factory('urlService', urlService)
		.factory('cartService', [ 'APP_CONFIG', 'stringService', cartService ])
		.factory('menuService', [ 'APP_CONFIG', '$http', 'urlService', 'cartService', menuService ])
		.factory('customerService', [ 'APP_CONFIG', '$http', 'urlService', 'stringService', customerService ])
		.factory('navigationService', [ 'APP_CONFIG', '$state', navigationService ])
		.factory('orderService', [ '$http', 'urlService', 'stringService', orderService ])
		.factory('itemService', [ 'APP_CONFIG', '$http', 'urlService', itemService])
		.component('navigation', {
			controller : navigationCtrl,
			templateUrl : 'navigation.html'
		})
		.component('keyboardInput', {
			templateUrl : 'keyboardInputComponent.html',
			bindings : {
				inputObjs : '<'
			}
		})
		.component('newcustomer', {
			controller : newCustomerCtrl,
			templateUrl : 'inputs.html'
		})
		.component('customersearch', {
			controller : searchCustomerCtrl,
			templateUrl : 'inputs.html'
		})
		.component('menuview', {
			controller : itemMenuCtrl,
			templateUrl : 'menu.html'
		})
		.component(
				'addonitemview',
				{
					controller : addonItemMenuCtrl,
					template : '<table class="table borderless">'
							+ '<tr>'
							+ '<td class="col-xs-1"><button class="btn-block" data-ng-click="$ctrl.moveLeft()"><</button></td>'
							+ '<td class="col-xs-1"></td>'
							+ '<td class="col-xs-2" data-ng-repeat="addonItem in $ctrl.addonItemsCurrent">'
							+ '<button class="btn-block" data-ng-click="addonItem.action(addonItem)">{{addonItem.itemName}}</button>'
							+ '</td>'
							+ '<td class="col-xs-1"></td>'
							+ '<td class="col-xs-1"><button class="btn-block" data-ng-click="$ctrl.moveRight()">></button></td>'
							+ '<tr>' + '</table>'
				})
		.component(
				'menunumpad',
				{
					// Angular-virtual-keyboard requires an input field and a
					// keyboard shows
					// only when the input field is focused.
					// This number pad should always display.
					controller : function(cartService) {
						
						function _MenuNumberpadButton(label, action) {
							this.label = label;
							this.action = action;
						}
						
						var ctrl = this;
						var inputQueue = [];
						
						ctrl.mode_newprice = false;
						
						ctrl.button_labels = [ [ '1', '2', '3', '4', '5', 'Delete' ],
								[ '6', '7', '8', '9', '0', 'Save' ] ];
						
						ctrl.newpriceMode = function() {
							ctrl.mode_newprice = true;
							ctrl.mode_quantity = false;
						}
						
						ctrl.defaultMode = function() {
							ctrl.mode_quantity = true;
							ctrl.mode_newprice = false;
						}
						
						ctrl.action = function(number) {
							
							var test = new Number(number);
							if (!isNaN(test)) {
								
							
							} else {
								
							}
						}
						
						
					},
					template : '<table class="table borderless">'
							+ '<tr data-ng-repeat="row in $ctrl.button_labels">'
							+ '<td class="col-xs-2" data-ng-repeat="label in row">'
							+ '<button data-ng-if="label" class="btn-block" data-ng-click="$ctrl.action(label)">{{label}}</button>'
							+ '</td>' + '</tr>' + '</table>'
				})
		.component(
				'cartview',
				{
					controller : function(cartService, customerService,
							navigationService) {
						var ctrl = this;
						this.selectedId = null;
						
						this.$doCheck = function() {
							var cart = cartService.getCart();
							if (cart) {
								this.cart = cart;
							}
							var currentCustomer = customerService
									.getCurrentCustomer();
							if (currentCustomer) {
								this.cartInfo[0].name = currentCustomer.displayValue[0];
							}
						}
						
						this.select = function(index) {
							this.selectedId = index;
						}
						
						this.cartInfo = [ {
							name : "Customer",
							enabled : true,
							action : function() {
								navigationService.setRoute('searchcustomer');
								navigationService.go();
							}
						}, {
							name : "today's date",
							enabled : true,
							action : function() {
							}
						}, {
							name : "ready date",
							enabled : true,
							action : function() {
							}
						} ];
					},
					templateUrl : 'cartview.html'
				})
		.component('neworder', {
			templateUrl : 'neworder.html'
		})
.run(['$templateCache', 'itemService', 'menuService', function($templateCache, itemService, menuService) {
	templates($templateCache);
	
	//TODO
	// Nonblocking "AJAX call and creating a menu object and feeding it into controller"? how?
	itemService.initItemData();
	
	//var addOnItems = 
	//		menuService.buildAddOnMenu(addOnItems);
	//	
	} ]);
