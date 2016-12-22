let editListComponentCtrl = function(utilsService) {
	let ctrl = this,
		currentIndex = -1;
				
	ctrl.$onInit = function() {
		if (!ctrl.prefPageSize)
			ctrl.prefPageSize = 10;
		
		ctrl.pageSize = ctrl.prefPageSize;
		ctrl.curPage = 0;
				
		ctrl.maxPageNum = getMaxPageNum(ctrl.list, ctrl.pageSize);
	}
				
	ctrl.$onChanges = function(changesObj) {
		let newMaxPageNum = getMaxPageNum(ctrl.list, ctrl.pageSize);
		
		if (newMaxPageNum !== ctrl.maxPageNum) {
			ctrl.maxPageNum = newMaxPageNum;
			ctrl.curPage = ctrl.maxPageNum;
		}
	}
				
	ctrl.changePageNum = function(curPage) {
		ctrl.curPage = curPage;
	}
			
	ctrl.update = function(name, value, index) {
		ctrl.onUpdate({name: name, value: value, index: getTrueIndex(index)});
	}
			
	ctrl.select = function(index) {
		let _index = getTrueIndex(index);
		if (currentIndex == _index)
			currentIndex = -1;
		else
			currentIndex = _index;
	
		ctrl.doClick({index: currentIndex});
	}
	
	function getMaxPageNum(array, pageSize) {
		if (angular.isDefined(array) && angular.isObject(array)) {
			let len = array.length,
				div = Math.floor(len / pageSize),
				rem = len % pageSize;
			if (rem > 0) div++;
			div--;
			return div;
		}
		return 0;
	}
	
	function getTrueIndex(index) {
		return (ctrl.pageSize * ctrl.curPage) + index;
	}
}
let manageMenuComponent = {
	controller:
		function manageMenuCtrl(itemService) {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.items = itemService.getItems();
				
				ctrl.currentItems = null;
				ctrl.currentItemType = null;
				
				ctrl.showAddonItems = false;
				ctrl.showItems = !ctrl.showAddonItems ;
			}

			ctrl.setItems = function(type) {
				if (!type) {
					ctrl.currentItemType = null;
					ctrl.currentItems = null;
				} else {
					ctrl.currentItemType = type;
					ctrl.currentItems = ctrl.items.get(type.id);
				}
			}
			
			ctrl.updateItems = function() {
				ctrl.items = itemService.getItems();
				ctrl.currentItems = ctrl.items.get(ctrl.currentItemType.id);
			}

			ctrl.changeView = function() {
				ctrl.showAddonItems = !ctrl.showAddonItems;
				ctrl.showItems = !ctrl.showAddonItems;
			}
		},
	template:
			'<div class="form-group col-xs-12">'
		+		'<div class="form-group col-xs-6 manage-menu-buttons">'
		+			'<sw-button button-class="btn-primary" span-width="2" button-name="Items" do-click="$ctrl.changeView()"/>'	
		+			'<span class="col-xs-4"/>'
		+			'<sw-button button-class="btn-primary" span-width="4" button-name="Addon Items" do-click="$ctrl.changeView()"/>'
		+		'</div>'
		+	'</div>'
		
		+	'<div class="form-group col-xs-7" data-ng-if="$ctrl.showAddonItems">'
		+		'<manageaddon />'
		+	'</div>'
		
		+	'<div class="form-group col-xs-5" data-ng-if="$ctrl.showItems">'
		+		'<manageitemtype set-items="$ctrl.setItems(type)"/>'
		+	'</div>'
		
		+	'<div class="form-group col-xs-7" data-ng-if="$ctrl.showItems">'
		+		'<manageitem data-ng-if="$ctrl.currentItemType" items="$ctrl.currentItems"' 
		+			'update-items="$ctrl.updateItems()" item-type="$ctrl.currentItemType"></manageitem>'
		+	'</div>'
}
let manageItemComponent = {
	controller:
		function manageItemCtrl(itemService, menuService, keyboardService) {
			let ctrl = this,
				_name = "name",
				_cent = "cent",
				_dollar = "dollar",
				_itemTypeId = "itemTypeId",
				_price = "price";
				
			
			ctrl.$onInit = function() {
				ctrl.numberPadConfig = keyboardService.getNumberPad();
				ctrl.keyboardConfig = keyboardService.getKeyboard();
				
				_reset();
			}
			
			ctrl.$onChanges = function(changesObj) {
				_reset();
			}
			
			ctrl.saveItem = function(name, value) {
				ctrl.newItem[name] = value;				
				//Meh...
				ctrl.newItemName = ctrl.newItem[_name];
				ctrl.dollar = ctrl.newItem[_dollar];
				ctrl.cent = ctrl.newItem[_cent];
				
				if (_isCompleteItem())
					itemService.saveOrUpdateItem(ctrl.newItem, _saveOrUpdateSuccess);
			}
			
			ctrl.update = function(name, value, index) {
				if (angular.isDefined(name) && angular.isDefined(value) && angular.isDefined(index)) {
					let _item = angular.copy(ctrl.items[index]);
					_item[_cent] = _item[_price][_cent];
					_item[_dollar] = _item[_price][_dollar];
					_item[name] = value;
					delete _item[_price];
					
					itemService.saveOrUpdateItem(_item, _saveOrUpdateSuccess);
				}
			}
			
			function _saveOrUpdateSuccess() {
				_reset();
				menuService.refreshMenu();
				ctrl.updateItems();
			}
			
			function _reset() {
				ctrl.newItem = {};
				ctrl.newItem[_itemTypeId] = ctrl.itemType.id;
				
				ctrl.newItemName = null;
				ctrl.dollar = null;
				ctrl.cent = null;
			}
			
			function _isCompleteItem() {
				return ctrl.newItem[_name] 
					&& ctrl.newItem[_cent] 
					&& ctrl.newItem[_dollar] 
					&& ctrl.newItem[_itemTypeId];
			}
		},
	bindings: {
		items: '<',
		itemType: '<',
		updateItems: '&'
	},
	template:
			'<div class="form-group col-xs-12">'
		+		'<span class="col-xs-12">{{$ctrl.itemType.name}}</span>'
		+		'<sw-input input-type="text" input-value="$ctrl.newItemName" input-name="name" on-update="$ctrl.saveItem(name, value, index)"' 
		+			'span-width="4" font-size="20" keyboard-config="$ctrl.keyboardConfig" place-holder="New Item" />'
		
		+		'<span class="col-xs-2"></span>'
		
		+		'<sw-input input-type="text" input-value="$ctrl.dollar" input-name="dollar" on-update="$ctrl.saveItem(name, value, index)"' 
		+			'span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig" place-holder="$" />'
		
		+		'<sw-input input-type="text" input-value="$ctrl.cent" input-name="cent" on-update="$ctrl.saveItem(name, value, index)"' 
		+			'span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig" place-holder="&#162;" />'
		
		+		'<span class="col-xs-2" />'		
		+	'</div>'

		+	'<div data-ng-if="!$ctrl.items"><span>No Items for {{$ctrl.itemType.name}}</span></div>'
		
		+	'<item-list list="$ctrl.items" pref-page-size="7" on-update="$ctrl.update(name, value, index)" />'
};

let itemListComponent = {
	controller: editListComponentCtrl,
	bindings: {
		list: '<',
		doClick: '&',
		onUpdate: '&',
		prefPageSize: '@'
	},
	template: 
			'<div class="item col-xs-12" data-ng-repeat="item in $ctrl.list | limitTo:$ctrl.pageSize:$ctrl.curPage*$ctrl.pageSize">'
		+		'<item item="item" data-ng-if="item.active" item-index="$index" do-click="$ctrl.select(index)" on-update="$ctrl.update(name, value, index)" />'
		+	'</div>'
		+	'<pn-buttons cur-page="$ctrl.curPage" update-current-page="$ctrl.changePageNum(curPage)" max-page="$ctrl.maxPageNum" />'
}

let editItemComponent = {
	controller:
		function(keyboardService) {
			let ctrl = this;
		
			ctrl.$onInit = function() {
				ctrl.numberPadConfig = keyboardService.getNumberPad();
				ctrl.keyboardConfig = keyboardService.getKeyboard();
			}

			ctrl.update = function(name, value, index) {
				ctrl.onUpdate({name: name, value: value, index: index});
			}
		},
	bindings: {
		item: '<',
		itemIndex: '<',
		onUpdate: '&'
	},
	template:
			'<sw-input input-type="text" input-value="$ctrl.item.weight" input-name="weight" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig"></sw-input>'
		
		+	'<sw-input input-type="text" input-value="$ctrl.item.name" input-name="name" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="4" font-size="20" keyboard-config="$ctrl.keyboardConfig"></sw-input>'
		
		+	'<span class="col-xs-1" />'
		
		+	'<sw-input input-type="text" input-value="$ctrl.item.price.dollar" input-name="dollar" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig"></sw-input>'
		
		+	'<sw-input input-type="text" input-value="$ctrl.item.price.cent" input-name="cent" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig"></sw-input>'
		
		+	'<sw-input input-type="checkbox" input-value="$ctrl.item.active" input-name="active" on-update="$ctrl.update(name, value, index)"'
		+		'item-index="$ctrl.itemIndex" span-width="1" />'

}
let formComponent = {
	controller:
		function() {
			let ctrl = this;
			
			ctrl.update = function(name, value, index) {
				ctrl.onUpdate({name: name, value: value, index: index});
			};
		
	},
	bindings: {
		formInput: '<',
		title: '@',
		buttonName: '@',
		submit: '&',
		onUpdate: '&'
	},
	template:
			'<form id="input-form" class="input-form col-xs-12" data-ng-submit="$ctrl.submit()">'
		+		'<span class="col-xs-1" data-ng-if="$ctrl.title"/><h2 class="col-xs-11" data-ng-if="$ctrl.title">{{$ctrl.title}}</h2>'
		+		'<span data-ng-if="$ctrl.formInput" class="col-xs-12"/>'
		+ 		'<div data-ng-if="$ctrl.formInput" class="col-xs-12 labeled-input-row" data-ng-repeat="input in $ctrl.formInput">'
		+			'<sw-labeled-input label-for="{{input.id}}" input-value="input.value" span-width="6" input-label="{{input.label}}"'
		+				'input-type="text" item-index="$index" input-name="{{input.id}}" is-required="input.required" place-holder="{{input.label}}"'
		+				'font-size="20" on-update="$ctrl.update(name, value, index)" keyboard-config="input.keyboardConfig"/>'
		+ 		'</div>'
		+		'<span class="col-xs-3" />'
		+		'<sw-button type="submit" button-class="btn-primary" span-width="9" font-size="20" button-name="{{$ctrl.buttonName}}" />'
		+	'</form>'
};

let selectListComponent = {
	controller: 
		function(utilsService) {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				let totalWidth = 11;
				let singleSpanWidth = 2;
				if (ctrl.col)
					singleSpanWidth = Math.trunc(totalWidth/ctrl.col);
				
				ctrl.span_class = [];
				ctrl.span_class.push(utilsService.getCSScolxs() + singleSpanWidth);
			}
			
			ctrl.select = function(entry) {
				ctrl.doClick({selected: entry});
			}
	},
	bindings: {
		list: '<',
		col: '<',
		doClick: '&'
	},
	template:
			'<div class="col-xs-6">'
		+		'<div class="col-xs-12 cursor-pointer" data-ng-repeat="entry in $ctrl.list"'
		+			'data-ng-click="$ctrl.select(entry)">'
		+			'<span class="col-xs-1">{{$index + 1}}</span>'
		+			'<span data-ng-class="$ctrl.span_class" data-ng-repeat="out in entry.displayValue">{{out}}</span>'
		+		'</div>'
		+	'</div>'
};
var newOrderComponent = {
	template:'<div class="row">'
		+ 		'<div class="col-xs-6 cart-container">'
		+ 			'<cart class="col-xs-12 cart" />'
		+ 		'</div>'
		+ 		'<div class="col-xs-6 menu-container">'
		+ 			'<menu class="col-xs-12 menu" />'
		+ 		'</div>'
		+ 	'</div>'
}
var navigationComponent = {
	controller: 
		function navigationCtrl(navigationService) {
			var ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.ready = false;
				if (!navigationService.getNavigation())
					navigationService.buildNavigation();

				ctrl.navigations = navigationService.getNavigation();
			}

			ctrl.$doCheck = function() {
				var isReady = navigationService.isReady();
				if (isReady)	ctrl.ready = isReady;
			}	
		},
	template:'<nav class="navbar navbar-inverse" role="navigation" data-ng-show="$ctrl.ready">'
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
		+	'</nav>'
}
let newCustomerComponent = {
	controller:
		function newCustomerCtrl(customerService, keyboardService) {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.new_customer_info = [
					{label: 'Last Name', id: "lastName", value: null, required: true, keyboardConfig: keyboardService.getKeyboard()}, 
					{label: 'First Name', id: "firstName", value: null, required: false, keyboardConfig: keyboardService.getKeyboard()}, 
					{label: 'Phone Number',id: "phoneNumber", value: null, required: false, keyboardConfig: keyboardService.getNumberPad()}];
						
				ctrl.title = 'New Customer';
			}

			ctrl.save = function() {
				let new_customer = ctrl.new_customer_info.reduce(function(map, currentItem) {
					map[currentItem.id] = currentItem.value;
					return map;
				}, {});

				customerService.save(new_customer, function(res) {
					customerService.setCurrentCustomer(res.data);
					_reset();
				}, function(res) {
				});
			};
			
			ctrl.update = function(name, value, index) {
				ctrl.new_customer_info[index].value = value;
			};
			
			function _reset() {				
				for (info of ctrl.new_customer_info) {
					info.value = null;
				}				
			};
		},
	template:
			'<div class="col-xs-6">'
		+		'<p-form form-input="$ctrl.new_customer_info" title="{{$ctrl.title}}" button-name="Save"'
		+			'on-update="$ctrl.update(name, value, index)" submit="$ctrl.save()" />'
		+	'</div>'
}
let spanWrappedLabeledInputComponent = {
	controller:
		function(utilsService) {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.label_class = [];
				
				ctrl.label_class.push(utilsService.getCSScolxs() + (12 - ctrl.spanWidth));
				ctrl.label_class.push(utilsService.getCSStextFontSize() + ctrl.fontSize);
			}
			
			ctrl.update = function(name, value, index) {
				ctrl.onUpdate({name: name, value: value, index: index});
			}
		},
	bindings: {
		inputValue: '<',
		keyboardConfig: '<',
		isRequired: '<',
		itemIndex: '<',
		inputType: '@',
		inputName: '@',
		spanWidth: '@',
		fontSize: '@',
		placeHolder: '@',
		inputLabel: '@',
		labelFor: '@',
		onUpdate:'&'
	},

	template: 
			'<label for="{{$ctrl.labelFor}}" class="control-label" data-ng-class="$ctrl.label_class">{{$ctrl.inputLabel}}</label>'
		+	'<sw-input id="{{$ctrl.labelFor}}" input-type="{{$ctrl.inputType}}" input-value="$ctrl.inputValue" input-name="{{$ctrl.inputName}}"'
		+		'span-width="{{$ctrl.spanWidth}}" font-size="{{$ctrl.fontSize}}" is-required="$ctrl.isRequired"'
		+		'item-index="$ctrl.itemIndex" on-update="$ctrl.update(name, value, index)" place-holder="{{$ctrl.placeHolder}}" keyboard-config="$ctrl.keyboardConfig"/>'
}
let searchCustomerComponent = {
	controller:
		function (customerService, navigationService, keyboardService) {
			let ctrl = this;
	
			ctrl.$onInit = function() {
				ctrl.search_customer_input = [
					{label: 'Last Name', id: "lastName", value: null, required: true, keyboardConfig: keyboardService.getKeyboard()}];
						
				ctrl.title = 'Search Customer';
			}
			
			ctrl.update = function(name, value, index) {
				ctrl.search_customer_input[index].value = value;
			};
			
			ctrl.search = function() {
				customerService.search(ctrl.search_customer_input[0].value, 
					function(customers) {
					ctrl.results = customers;
					_reset();
				}, function(res) {

				});
			}
			
			ctrl.select = function(selected) {
				customerService.setCurrentCustomer(selected);
				navigationService.back();
			};
			
			function _reset() {
				ctrl.search_customer_input[0].value = null;
			};
		},
	template:
			'<div class="col-xs-6">'
		+		'<p-form form-input="$ctrl.search_customer_input" title="{{$ctrl.title}}" button-name="Find"'
		+		'on-update="$ctrl.update(name, value, index)" submit="$ctrl.search()" />'
		+	'</div>'
		+	'<select-list list="$ctrl.results" col="3" do-click="$ctrl.select(selected)"/>'
}
let pickupComponent = {
	controller:
		function pickupCtrl(customerService, itemService,
				navigationService, orderService, stringService, cartService, $filter) {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.search_input = [
					{label: 'Order ID', id: "orderId", value: null, required: false, keyboardConfig: null}];
				ctrl.customer_button = 'Find Customer';		
				ctrl.customer = customerService.getCurrentCustomer();			
			}
			
			ctrl.update = function(name, value, index) {
				ctrl.search_input[index].value = value;
			}
			
			ctrl.updateCheckBox = function(index, value) {
				ctrl.checked[index] = value;
				if (value) {
					ctrl.order = ctrl.list[index];
				}
			};
			
			ctrl.search = function() {
				//Search for a single order
				if (ctrl.search_input[0].value) {
					let orderId = ctrl.search_input[0].value;
					if (stringService.isNumberOnly(orderId)) {
						orderService.getById(orderId, showOrder, fail);
					}
				} else {
					//Get all orders for a customer
					if (ctrl.customer) {
						orderService.getByCustomer(ctrl.customer, showOrders, fail);
					}
				}
			};
			
			function showOrders(orders) {
				ctrl.select = true;

				let _orders = $filter('orderBy')(orders, 'id');
				ctrl.list = _orders;
				ctrl.checked = new Array(orders.length);
			}
			
			function showOrder(order) {
				ctrl.select = false;
				
				let _order = [];				
				_order.push(order);
				ctrl.list = _order;
				ctrl.checked = new Array(1);
			}
			
			function fail() {
				
			}
			
			ctrl.searchCustomer = function() {
				navigationService.setRoute('searchcustomer');
				navigationService.go();
			}
			
			ctrl.pickup = function() {
				let checkedIds = _getCheckedOrderIds(true);
				orderService.completeOrders(checkedIds);
			}
			
			ctrl.cancel = function() {
				let checkedIds = _getCheckedOrderIds(false);
				orderService.voidOrders(checkedIds);
			}
			
			ctrl.modify = function() {
				if (!ctrl.select && ctrl.list) {
					ctrl.order = ctrl.list[0];
				}
				let checkedOrders = _getCheckedOrderIds(false);
				if (!ctrl.order || checkedOrders.length !== 1)
					return;
				
				cartService.clear();
				
				let order = ctrl.order, itemMap = itemService.getItemMap(),
				itemTypeMap = itemService.getItemTypeMap(), 
				addonItemMap = itemService.getAddonItemMap();
				
				let orderDetails = order.orderDetails;
				let cart = [];
				for (let i = 0, len = orderDetails.length; i < len; i++) {
					let itemId = orderDetails[i].itemId;
					let item = itemMap.get(itemId);
					let itemType = itemTypeMap.get(item.itemTypeId);
				
					cartService.addItem(itemType.name, item, orderDetails[i].newPrice, orderDetails[i].quantity);	
				
					let addonItems = orderDetails[i].orderDetailAddonItems;
					for (let j = 0, n = addonItems.length; j < n; j++) {
						let addonItem = addonItems[j];
						cartService.addItem(null, addonItemMap.get(addonItem.id), addonItem.newPrice);
					}
				}
				let readyDate = new Date(0);
				readyDate.setUTCSeconds(order.readyDate / 1000);
				cartService.setReadyDate(readyDate);
				cartService.setOrderId(order.id);
				navigationService.setRoute('neworder');
				navigationService.go();
			}
			
			function _getCheckedOrderIds(pickup) {
				let orderIdList = [];
				if (!ctrl.list)
					return orderIdList;
				
				if (ctrl.select) {
					for (let i = 0, len = ctrl.list.length; i < len; i++) {
						if (ctrl.checked[i] && !(ctrl.list[i].completed && pickup)) {
							orderIdList.push(ctrl.list[i].id);
						}
					}
				} else {
					if (ctrl.list.length === 1) {
						orderIdList.push(ctrl.list[0].id);
					}
				}
				return orderIdList;
			}
	},
	template:
			'<div class="col-xs-4">'
		+		'<span class="col-xs-3" /> <h2 class="col-xs-6">Pick Up</h2>'
		
		+		'<p-form button-name="{{$ctrl.customer ? $ctrl.customer.name : $ctrl.customer_button}}" submit="$ctrl.searchCustomer()" />'
		+		'<span class="col-xs-12" />'
		+		'<p-form form-input="$ctrl.search_input" title="{{$ctrl.title}}" button-name="Find Order(s)"'
		+			'on-update="$ctrl.update(name, value, index)" submit="$ctrl.search()" />'
		
		+		'<span class="col-xs-12" />'
		+		'<span class="col-xs-12" />'
		+		'<span class="col-xs-12" />'
		+		'<span class="col-xs-12" />'
		+		'<p-form class="btn-default" button-name="Pick-Up" submit="$ctrl.pickup()" />'
		+		'<span class="col-xs-12" />'
		+		'<span class="col-xs-12" />'
		+		'<p-form button-name="Change" submit="$ctrl.modify()" />'
		+		'<span class="col-xs-12" />'
		+		'<span class="col-xs-12" />'
		+		'<p-form button-name="Cancel" submit="$ctrl.cancel()" />'
		
		+	'</div>'
		
		+	'<div class="col-xs-8">'
		+		'<order-item-list on-update="$ctrl.updateCheckBox(index, value)" list="$ctrl.list"/>'
		+	'</div>'
}

let orderItemListComponent = {
	controller:
		function() {
			let ctrl = this;
					
			ctrl.$onInit = function() {
				if (!ctrl.prefPageSize)
					ctrl.prefPageSize = 10;
				
				ctrl.pageSize = ctrl.prefPageSize;
				ctrl.curPage = 0;
						
				ctrl.maxPageNum = getMaxPageNum(ctrl.list, ctrl.pageSize);
				
				ctrl.isSingle = true;
				ctrl.picked = false;

				if (ctrl.list)	{
					if (ctrl.list.length > 1)	ctrl.isSingle = false;
				}
			}
					
			ctrl.$onChanges = function(changesObj) {
				ctrl.updateList();
				setNewPageNum();
			}

			function setNewPageNum() {
				let newMaxPageNum = getMaxPageNum(ctrl.filteredList, ctrl.pageSize);
				
				if (newMaxPageNum !== ctrl.maxPageNum) {
					ctrl.maxPageNum = newMaxPageNum;
					ctrl.curPage = ctrl.maxPageNum;
				}
			}
			
			ctrl.changePageNum = function(curPage) {
				ctrl.curPage = curPage;
			}

			ctrl.update = function(index, value) {	
				ctrl.onUpdate({index: (ctrl.pageSize * ctrl.curPage) + index, value: value});
			}
			
			ctrl.updateList = function() {
				if (ctrl.list) {
					ctrl.isSingle = true;
					if (ctrl.list.length > 1)
						ctrl.isSingle = false;
					
					ctrl.filteredList = [];
					for (let i=0, len=ctrl.list.length; i < len; i++) {
						let item = ctrl.list[i];
						if (!(item.voided || item.completed) || ctrl.picked) {
							ctrl.filteredList.push(item);
						}
					}
					setNewPageNum();
				}
			}
			
			function getMaxPageNum(array, pageSize) {
				if (angular.isDefined(array) && angular.isObject(array)) {
					let len = array.length,
						div = Math.floor(len / pageSize),
						rem = len % pageSize;
					if (rem > 0) div++;
					div--;
					return div;
				}
				return 0;
			}
	},
	bindings: {
		list: '<',
		onUpdate: '&',
		prefPageSize: '@'
	},
	template:
			'<div class="col-xs-12 order-item-header">'
		+		'<span data-ng-if="!$ctrl.isSingle" class="col-xs-1" />'
		+		'<span class="col-xs-1">Id</span>'
		+		'<span class="col-xs-1">Q.</span>'
		+		'<span class="col-xs-2">Price</span>'
		+		'<span class="col-xs-2">Drop</span>'
		+		'<span class="col-xs-2">Ready</span>'
		+		'<span class="col-xs-2">Picked</span>'
		+		'<span class="col-xs-1">'
		+			'<input type="checkbox" data-ng-model="$ctrl.picked" data-ng-change="$ctrl.updateList()"/>'
		+		'</span>'
		+	'</div>'	
		+	'<div class="col-xs-12 cursor-pointer order-item" data-ng-class="{strike: item.voided}" '
		+		'data-ng-repeat="item in $ctrl.filteredList | limitTo:$ctrl.pageSize:$ctrl.curPage*$ctrl.pageSize">'
		+		'<order-item item="item" is-single="$ctrl.isSingle" item-index="$index" on-update="$ctrl.update(index, value)" />'
		+	'</div>'
		+	'<pn-buttons cur-page="$ctrl.curPage" update-current-page="$ctrl.changePageNum(curPage)" max-page="$ctrl.maxPageNum" />'
}

let orderItemComponent = {
	controller:
		function() {
			let ctrl = this;
			ctrl.update = function() {
				ctrl.onUpdate({index: ctrl.itemIndex, value: ctrl.checked});
			}
	},
	bindings: {
		item: '<',
		itemIndex: '<',
		onUpdate: '&',
		isSingle: '<'
	},
	template:
			'<span data-ng-if="!$ctrl.isSingle" class="col-xs-1">'
		+		'<input data-ng-if="!$ctrl.item.voided" type="checkbox" data-ng-model="$ctrl.checked" data-ng-change="$ctrl.update()"/>'
		+	'</span>'
		+	'<span class="col-xs-1">{{$ctrl.item.id}}</span>'
		+	'<span class="col-xs-1">{{$ctrl.item.quantity}}</span>'
		+	'<span class="col-xs-2">{{$ctrl.item.dollar}}.{{$ctrl.item.cent}}</span>'
		+	'<span class="col-xs-2" data-ng-if="!$ctrl.item.voided">{{$ctrl.item.dropDate | date:"EEE MM/dd"}}</span>'
		+	'<span class="col-xs-2" data-ng-if="!$ctrl.item.voided">{{$ctrl.item.readyDate | date:"EEE MM/dd"}}</span>'
		+	'<span class="col-xs-2" data-ng-if="$ctrl.item.completed && !$ctrl.item.voided">{{$ctrl.item.pickupDate | date:"EEE MM/dd"}}</span>'
}
let manageAddonItemComponent = {
	controller:
		function(keyboardService, itemService, menuService) {
			let ctrl = this,
				_name = 'name',
				_cent = 'cent',
				_dollar = 'dollar',
				_price = 'price';
			
			ctrl.$onInit = function() {
				ctrl.numberPadConfig = keyboardService.getNumberPad();
				ctrl.keyboardConfig = keyboardService.getKeyboard();
	
				_reset();
			}
			
			function _reset() {
				ctrl.newAddonItem = {};
				ctrl.addonItems = itemService.getAddonItems();
			}
			
			ctrl.save = function(name, value) {
				ctrl.newAddonItem[name] = value;
				
				if (_isCompleteAddonItem())
					itemService.saveOrUpdateAddonItem(ctrl.newAddonItem, _saveOrUpdateSuccess);
			}
			
			ctrl.update = function(name, value, index) {
				if (angular.isDefined(name) && angular.isDefined(value) && angular.isDefined(index)) {
					let _addonItem = angular.copy(ctrl.addonItems[index]);
					_addonItem[_cent] = _addonItem[_price][_cent];
					_addonItem[_dollar] = _addonItem[_price][_dollar];
					_addonItem[name] = value;
					
					delete _addonItem[_price];
					
					itemService.saveOrUpdateAddonItem(_addonItem, _saveOrUpdateSuccess);
				}
			}
			
			function _saveOrUpdateSuccess() {
				_reset();
			}
			
			function _isCompleteAddonItem() {
				return ctrl.newAddonItem[_name]
					&& ctrl.newAddonItem[_cent]
					&& ctrl.newAddonItem[_dollar];
			}
	},
	template:
			'<div class="form-group col-xs-12">'
		+		'<sw-input input-type="text" input-value="$ctrl.newAddonItem.name" input-name="name" on-update="$ctrl.save(name, value)"' 
		+			'span-width="4" font-size="20" keyboard-config="$ctrl.keyboardConfig" place-holder="New Addon Item" />'
		
		+		'<span class="col-xs-2"></span>'
		
		+		'<sw-input input-type="text" input-value="$ctrl.newAddonItem.dollar" input-name="dollar" on-update="$ctrl.save(name, value)"' 
		+			'span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig" place-holder="$" />'
		
		+		'<sw-input input-type="text" input-value="$ctrl.newAddonItem.cent" input-name="cent" on-update="$ctrl.save(name, value)"' 
		+			'span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig" place-holder="&#162;" />'
		
		+		'<span class="col-xs-2" />'		
		+	'</div>'
		
		+	'<item-list list="$ctrl.addonItems" pref-page-size="7" on-update="$ctrl.update(name, value, index)" />'
};
let prevNextButtonsComponent = {
	controller:
		function prevNextButtonsCtrl() {
			let ctrl = this;
			
			ctrl.prevPage = function() {
				if (0 !== ctrl.curPage) {
					ctrl.updateCurrentPage({curPage: ctrl.curPage - 1})
				}
			}
			
			ctrl.nextPage = function() {
				if (ctrl.curPage !== ctrl.maxPage) {
					ctrl.updateCurrentPage({curPage: ctrl.curPage + 1})
				}
			}
		},
	bindings: {
		updateCurrentPage: '&',
		maxPage: '<',
		curPage: '<'
	},
	template:
			'<div class="col-xs-12 pn-buttons-container" data-ng-show="$ctrl.maxPage > 0">'
		+		'<span class="col-xs-3"/>'
		+		'<sw-button  button-class="btn-primary" span-width="2" button-name="<" do-click="$ctrl.prevPage()"/>'
		+		'<span class="col-xs-2" />'
		+		'<sw-button  button-class="btn-primary" span-width="2" button-name=">" do-click="$ctrl.nextPage()"/>'
		+		'<span class="col-xs-3" />'
		+	'</div>'
};
let spinnerModalComponent = {
	template:
			'<div class="col-xs-12" id="loading-spinner-container">'
		+		'<div id="loading-bar-spinner">'
		+			'<div class="spinner-icon"></div>'
		+		'</div>'
		+	'<div>'
};
let addonItemsComponent = {
	controller:
		function addonItemMenuCtrl(itemService, cartService) {
			let ctrl = this,
				_numberOfButtons = 4,
				_begin = 0;
						
			ctrl.$onInit = function() {
				ctrl.addonItems = itemService.getAddonItems();					
				setCurrentAddonItems();
			}
	
			ctrl.click = function(addonItem) {
				if (!cartService.isEmpty()) {
					cartService.addItem(null, addonItem);
				}
			}
			
			ctrl.moveLeft = function() {
				if (_begin > 0) {
					_begin -= _numberOfButtons;
	
					setCurrentAddonItems();
				}
			}
	
			ctrl.moveRight = function() {
				let end = _begin + _numberOfButtons;
				if (end < ctrl.addonItems.length) {
					_begin += _numberOfButtons;
	
					setCurrentAddonItems();
				}
			}
			
			function setCurrentAddonItems() {
				ctrl.currentAddonItems = ctrl.addonItems.slice(_begin, _begin + _numberOfButtons);
			}
		},
	template:
			'<div class="col-xs-12 addon-item-row">'
		+		'<div class="col-xs-3 addon-item-nav">'
		+			'<sw-button button-class="btn-primary" span-width="12" do-click="$ctrl.moveLeft()" button-name="<"/>'
		+		'</div>'
		+		'<div class="col-xs-6 addon-item-menu">'
		+			'<sw-button data-ng-repeat="addonItem in $ctrl.currentAddonItems" button-class="btn-default" span-width="6" do-click="$ctrl.click(addonItem)" button-name="{{addonItem.name}}"/>'
		+		'</div>'
		+		'<div class="col-xs-3 addon-item-nav">'
		+			'<sw-button button-class="btn-primary" span-width="12" do-click="$ctrl.moveRight()" button-name=">"/>'
		+		'</div>'
		+	'</div>'

}
let menuComponent = {
	controller:
		function itemMenuCtrl(menuService, cartService) {
			let ctrl = this;
			
			ctrl.items = null;
			ctrl.mainItems = null;
			
			ctrl.$onInit = function() {
				ctrl.mainItems = menuService.getMainItemMenu();
				ctrl.items = ctrl.mainItems;
			}
			
			ctrl.click = function(item) {
				if (item.submenu) {
					ctrl.typeName = item.name;
					ctrl.items = item.submenu;
				} else {
					cartService.addItem(ctrl.typeName, item);
					_showMainItems();
					ctrl.typeName = null;
				}
			}
			
			ctrl.showMainitems = function() {
				_showMainItems()
			}
			
			ctrl.saveOrUpdateOrder = function() {
				cartService.saveOrUpdateOrder();
			}
			
			function _showMainItems() {
				if (ctrl.items !== ctrl.mainItems)				
					ctrl.items = ctrl.mainItems;
			}
		},
	template:
			'<div class="col-xs-12 menu-row">'
		+		'<sw-button button-class="btn-primary" do-click="$ctrl.showMainitems()" span-width="3" button-name="Back"/>'
		+		'<span class="col-xs-3" />'
		+		'<span class="col-xs-3" />'
		+		'<sw-button button-class="btn-primary" do-click="$ctrl.saveOrUpdateOrder()" span-width="3" button-name="Order"/>'		
		+	'</div>'
		+	'<div class="col-xs-12 menu-row" data-ng-repeat="row in $ctrl.items">'
		+		'<sw-button button-class="btn-default" span-width="3" data-ng-repeat="item in row" '
		+			'do-click="$ctrl.click(item)" button-name="{{item.name}}"/>'
		+	'</div>'
		+ 	'<addonitems/>'
}
let manageItemTypeComponent = {
	controller:
		function manageItemTypeCtrl(itemService, menuService, keyboardService) {
			let ctrl = this, 
				_name = 'name';
			
			ctrl.$onInit = function() {
				ctrl.numberPadConfig = keyboardService.getNumberPad();
				ctrl.keyboardConfig = keyboardService.getKeyboard();

				ctrl.itemTypes = itemService.getItemTypes();
				ctrl.items = itemService.getItems();
				
				ctrl.newItemTypeName = null;				
			}
			
			_saveOrUpdateItemType = function(itemType) {
				itemService.saveOrUpdateItemType(itemType, function success(){
					ctrl.newItemTypeName = null;
					ctrl.itemTypes = itemService.getItemTypes();
					
					menuService.refreshMenu();
				});
			}
			
			ctrl.selectItemType = function(index) {
				if (index == -1)
					ctrl.currentItemType = null;
				else
					ctrl.currentItemType = ctrl.itemTypes[index];
				
				ctrl.setItems({type: ctrl.currentItemType});
			}
			
			ctrl.update = function(name, value, index) {
				if (angular.isUndefined(index) && angular.equals(_name, name)) {
					if (value) {
						ctrl.newItemTypeName = value;
						_saveOrUpdateItemType({name: value});
					}
				}
				
				if (angular.isDefined(index) &&
						angular.isDefined(name) &&
						angular.isDefined(value)) {
					let _itemType = angular.copy(ctrl.itemTypes[index]);
					_itemType[name] = value;
					_saveOrUpdateItemType(_itemType);
				}
			}
		},
	bindings: {
		setItems: '&'
	},
	template:
			'<div class="form-group col-xs-12">'
		+		'<sw-input input-type="text" input-value="$ctrl.newItemTypeName" input-name="name" on-update="$ctrl.update(name, value, index)"' 
		+			'span-width="7" font-size="20" keyboard-config="$ctrl.keyboardConfig" place-holder="New Item Type"></sw-input>'		
		+		'<span class="col-xs-1" />'
		+	'</div>'
		
		+	'<item-type-list list="$ctrl.itemTypes" pref-page-size="7" on-update="$ctrl.update(name, value, index)" do-click="$ctrl.selectItemType(index)" />'
};

let itemTypeListComponent = {
	controller: editListComponentCtrl,
	bindings: {
		list: '<',
		doClick: '&',
		onUpdate: '&',
		prefPageSize: '@'
	},
	template: 
			'<div class="item col-xs-12" data-ng-repeat="itemType in $ctrl.list | limitTo:$ctrl.pageSize:$ctrl.curPage*$ctrl.pageSize">'
		+		'<itemtype class="item-type" data-ng-if="itemType.active" item-type="itemType" item-index="$index" do-click="$ctrl.select(index)" on-update="$ctrl.update(name, value, index)" />'
		+	'</div>'
		+	'<pn-buttons cur-page="$ctrl.curPage" update-current-page="$ctrl.changePageNum(curPage)" max-page="$ctrl.maxPageNum" />'
};

let editItemTypeComponent = {
	controller:
		function(keyboardService) {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.numberPadConfig = keyboardService.getNumberPad();
				ctrl.keyboardConfig = keyboardService.getKeyboard();
			}
			
			ctrl.update = function(name, value, index) {
				ctrl.onUpdate({name: name, value: value, index: index});
			}
			
			ctrl.click = function(index) {
				ctrl.doClick({index: index});
			}
		},
	bindings: {
		itemType: '<',
		itemIndex: '<',
		onUpdate: '&',
		doClick: '&'
	},
	template:
			'<sw-input input-type="text" input-value="$ctrl.itemType.weight" input-name="weight" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig"></sw-input>'
		
		+	'<sw-input input-type="text" input-value="$ctrl.itemType.name" input-name="name" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="5" font-size="20" keyboard-config="$ctrl.keyboardConfig"></sw-input>'
		
		+	'<span class="col-xs-1" />'
		
		+	'<sw-input input-type="checkbox" input-value="$ctrl.itemType.active" input-name="active" on-update="$ctrl.update(name, value, index)"'
		+		'item-index="$ctrl.itemIndex" span-width="1" />'

		+	'<sw-button button-class="btn-default" span-width="2" button-name="Items" do-click="$ctrl.click($ctrl.itemIndex)"/>'	
};
let cartComponent = {
	controller:
		function cartCtrl(cartService, customerService, navigationService) {
		let ctrl = this,
			cartSubscription,
			_quantity = "quantity",
			_price = "newprice",
			_cent = "cent",
			_dollar = "dollar";
		
		ctrl.$onInit = function() {
			cartSubscription = cartService.subscribe(function(d) {
				ctrl.cart = flattenCart(d);
				total();
			})
			
			let cart = cartService.get();
			if (cart) {
				ctrl.cart = flattenCart(cart);
				total();
			}
			
			ctrl.customer = customerService.getCurrentCustomer();
			
			ctrl.dateOptions = {
				dateDisabled: disabled,
				maxDate: new Date(2030, 5, 22),
				minDate: new Date(),
				startingDay: 1,
				showWeeks: false
			};

			ctrl.dt = cartService.defaultReadyDate();
			ctrl.dateFormat = 'EEE dd';
				
			ctrl.openDateWindow = function() {
			    ctrl.opened = true;
			};
				
			ctrl.opened = false;
		}

		ctrl.$onDestroy = function() {
			cartService.setReadyDate(null);

			if (cartSubscription)
				cartSubscription.dispose();
		}
		
		ctrl.changeDate = function() {
			cartService.setReadyDate(ctrl.dt);
		}
		
		ctrl.customerInfo = {
			name : "Customer",
			enabled : true,
			action : function() {
				navigationService.setRoute('searchcustomer');
				navigationService.go();
			}
		};

		function disabled(data) {
			let date = data.date, mode = data.mode;
			return mode === 'day' && date.getDay() === 0;
		}
		
		ctrl.update = function(name, value, index) {
			let cartItem = ctrl.cart[index];

			// Remove item
			if (angular.equals(name, _quantity) && value == 0) {
				if (cartItem.hasQuantity) {
					cartService.remove(cartItem.index);
				} else {
					cartService.remove(cartItem.index, cartItem.parentIndex);
				}
			} else {				
				cartService.update(name, value, cartItem.index, cartItem.parentIndex);
			}
		}

		function total() {
			let total = cartService.getTotal();
			ctrl.tQ = total.q;
			ctrl.tDollar = total.d;
			ctrl.tCent = total.c;
		}
		
		function flattenCart(cartArray) {
			let newCart = [];
			
			for (let i = 0, len = cartArray.length; i < len; i++) {
				newCart.push(cartArray[i]);
				
				let orderDetailAddonItems = cartArray[i].orderDetailAddonItems;
				if (orderDetailAddonItems) {
					newCart = newCart.concat(orderDetailAddonItems);
				}
			}
			return newCart;
		}	
	},
	template:
			'<div class="col-xs-12 cart-info">'
		+		'<span class="col-xs-1" />'
		+		'<sw-button data-ng-if="$ctrl.customerInfo.enabled" span-width="6" button-name="{{ $ctrl.customer ? $ctrl.customer.name:$ctrl.customerInfo.name }}" button-class="btn-primary" do-click="$ctrl.customerInfo.action()"/>'
		+		'<span class="col-xs-1" />'
		+		'<div class="col-xs-3">'
        +			'<p class="input-group">'
        + 				'<input type="text" class="form-control" data-ng-change="$ctrl.changeDate()" uib-datepicker-popup="{{$ctrl.dateFormat}}" data-ng-model="$ctrl.dt" is-open="$ctrl.opened" datepicker-options="$ctrl.dateOptions" ng-required="true" close-text="Close"/>'
        +  				'<span class="input-group-btn">'
        +    				'<button type="button" class="btn btn-default" data-ng-click="$ctrl.openDateWindow()"><i class="glyphicon glyphicon-calendar"></i></button>'
        +	  			'</span>'
        +			'</p>'
        +		'</div>'
		+		'<span class="col-xs-1" />'
		+	'</div>'
		
	    +	'<div class="col-xs-12 cart-info">'
		+		'<span class="col-xs-6">Total Quantity : {{$ctrl.tQ}}</span>'
		+		'<span class="col-xs-6">Total Price : {{$ctrl.tDollar}}.{{$ctrl.tCent}}</span>'
		+	'</div>'
		
		+	'<cart-item-list list="$ctrl.cart" on-update="$ctrl.update(name, value, index)" pref-page-size="7" />'
}

let cartItemListComponent = {
	controller: editListComponentCtrl,
	bindings: {
		list: '<',
		onUpdate: '&',
		prefPageSize: '@'
	},
	template:		
			'<div class="item col-xs-12 cart-item" data-ng-repeat="item in $ctrl.list | limitTo:$ctrl.pageSize:$ctrl.curPage*$ctrl.pageSize">'
		+		'<cart-item item="item" item-index="$index" on-update="$ctrl.update(name, value, index)" />'
		+	'</div>'
		+	'<pn-buttons cur-page="$ctrl.curPage" update-current-page="$ctrl.changePageNum(curPage)" max-page="$ctrl.maxPageNum" />'

}

let cartItemComponent = {
	controller:
		function(keyboardService) {
			let ctrl = this;
			ctrl.keyboardConfig = keyboardService.getNumberPad();
			
			ctrl.update = function(name, value, index) {
				ctrl.onUpdate({name: name, value: value, index: index});
			}
			
			ctrl.removeAddon = function() {
				ctrl.onUpdate({name: 'quantity', value: 0, index: ctrl.itemIndex});
			}
		},
	bindings: {
		item: '<',
		itemIndex: '<',
		onUpdate: '&'
	},
	template:
			'<sw-input data-ng-if="$ctrl.item.hasQuantity" input-type="text" input-value="$ctrl.item.quantity" input-name="quantity" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="2" font-size="20" keyboard-config="$ctrl.keyboardConfig" />'
		
		+	'<sw-button data-ng-if="! $ctrl.item.hasQuantity" button-class="btn-primary" button-name="-"' 
		+		'span-width="2"  do-click="$ctrl.removeAddon()"/>'
		
		+	'<span class="col-xs-6 font-18">{{$ctrl.item.itemName}}</span>'
		
		+	'<sw-input input-type="text" input-value="$ctrl.item.dollar" input-name="dollar" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="2" font-size="20" keyboard-config="$ctrl.keyboardConfig" />'
		
		+	'<sw-input input-type="text" input-value="$ctrl.item.cent" input-name="cent" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="2" font-size="20" keyboard-config="$ctrl.keyboardConfig" />'
};
let spanWrappedButtonComponent = {
	controller:
		function(utilsService) {
			var ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.span_class = [];
				if (ctrl.spanWidth)
					ctrl.span_class.push(utilsService.getCSScolxs() + ctrl.spanWidth);
			
				ctrl.button_class = [];
				if (ctrl.buttonClass)
					ctrl.button_class.push(ctrl.buttonClass);
				
				if (! ctrl.type)
					ctrl.type = 'button';
			}
		},
	bindings: {
		spanWidth:'@',
		buttonName:'@',
		buttonClass:'@',
		type:'@',
		doClick:'&'
	},
	template:
			'<span class="no-padding" data-ng-class="$ctrl.span_class">'
		+		'<button type="$ctrl.type" data-ng-class="$ctrl.button_class" class="btn form-control" data-ng-click="$ctrl.doClick()">{{$ctrl.buttonName}}</button>'
		+	'</span>'
}
let spanWrappedInputComponent = {
	controller:
		function(utilsService) {
			let ctrl = this;
			let _text = 'text';
			
			ctrl.$onInit = function() {
				ctrl.span_class = [];
				if (ctrl.spanWidth)
					ctrl.span_class.push(utilsService.getCSScolxs() + ctrl.spanWidth);
				
				ctrl.input_class = [];
				if (ctrl.fontSize);
					ctrl.input_class.push(utilsService.getCSStextFontSize() + ctrl.fontSize);
				
				ctrl.updateOn = {};
				if (_text === ctrl.inputType)
					ctrl.updateOn = {updateOn: 'blur'};				
			}

			ctrl.update = function() {
				ctrl.onUpdate({	name: ctrl.inputName, value: ctrl.inputValue, index: ctrl.itemIndex});
			}
		},
	bindings: {
		inputValue: '<',
		keyboardConfig: '<',
		isRequired: '<',
		itemIndex: '<',
		inputType: '@',
		inputName: '@',
		spanWidth: '@',
		fontSize: '@',
		placeHolder: '@',
		onUpdate:'&'
	},
	template:
			'<span class="no-left-padding" data-ng-class="$ctrl.span_class">'
		+		'<input class="form-control" data-ng-class="$ctrl.input_class" data-ng-required="$ctrl.isRequired" placeholder="{{$ctrl.placeHolder}}"' 
		+			'data-ng-model="$ctrl.inputValue" ng-change="$ctrl.update()" data-ng-model-options="$ctrl.updateOn"' 
		+			'ng-change="$ctrl.update()" type="{{$ctrl.inputType}}" data-ng-virtual-keyboard="$ctrl.keyboardConfig"/>'
		+	'</span>'
}
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
 * Cart Service
 */
function cartService(APP_CONFIG, orderService, customerService, utilsService, rx) {
	let _cart = [],
		subject = new rx.Subject(),
		_readyDate = null,
		orderId = 0;
	
	function _remove(index, parentIndex) {
		if (angular.isUndefined(parentIndex)) {
			_cart.splice(index, 1);
			reindex();
		} else {
			_cart[parentIndex].orderDetailAddonItems.splice(index, 1);
			reindex(parentIndex)
		}
		subject.onNext(Array.from(_cart));
	}
	
	function reindex(parentIndex) {
		let listToIndex = _cart;
		if (angular.isDefined(parentIndex)) {
			listToIndex = _cart[parentIndex].orderDetailAddonItems;
		}
		
		for (let i = 0; i < listToIndex.length; i++) {
			listToIndex[i].index = i;
			let orderDetailAddonItems = listToIndex[i].orderDetailAddonItems;

			if (angular.isUndefined(parentIndex) && orderDetailAddonItems) {
				for (let j = 0; j < orderDetailAddonItems.length; j++) {
					orderDetailAddonItems[j].parentIndex = i;
				}
			}
		}
	}

	function _setReadyDate(date) {
		_readyDate = date;
	}

	function _defaultReadyDate() {
		if (_readyDate)
			return _readyDate;
		
		_readyDate = new Date();
		_readyDate.setDate(_readyDate.getDate() + 3);
		if (_readyDate.getDay() == 0) {
			_readyDate.setDate(_readyDate.getDate() + 1);
		}
		return _readyDate;
	}
	
	function _update(name, value, index, parentIndex) {
		let item = _cart[index];
		if (angular.isDefined(parentIndex)) {
			item = _cart[parentIndex].orderDetailAddonItems[index];
		}
		item[name] = value;
		subject.onNext(Array.from(_cart));
	}
	
	function _clear() {
		_cart = [];
		subject.onNext(Array.from(_cart));
	}
	
	function _get() {
		return Array.from(_cart);
	}
	
	function _addItem(typeName, item, price, quantity) {
		let itemCopy = item;//angular.copy(item);
		let cartItem = itemCopy.itemTypeId ? 
						new _CartItem(itemCopy, typeName, 1) 
					: 	new _CartItem(itemCopy, typeName, 0);
		
		if (quantity) {
			cartItem.quantity = quantity;
		}				
		
		if (price) {
			cartItem.dollar = price.dollar;
			cartItem.cent = price.cent;
		}
		
		//For addon items
		if (! cartItem.hasQuantity) {
			let _parentItem = _cart[_cart.length - 1];
			if (! _parentItem.orderDetailAddonItems) {
				_parentItem.orderDetailAddonItems = [];
			}
			
			cartItem.parentIndex = _cart.length - 1;
			cartItem.index = _parentItem.orderDetailAddonItems.length;
			_parentItem.orderDetailAddonItems.push(cartItem);
		} else {
			cartItem.index = _cart.length;
			_cart.push(cartItem);
		}
		subject.onNext(Array.from(_cart));
	}
	
	function _isEmpty() {
		return _cart.length == 0;
	}
	
	function _setOrderId(id) {
		orderId = id;
	}
	
	function _subscribe(o) {
		return subject.subscribe(o);
	}
	
	function _saveOrUpdateOrder() {
		let customer = customerService.getCurrentCustomer();
		let total = _getTotal()
		if (customer && total.q > 0) {
			let opts = 
				
			{	id : orderId,
				customerId: customer.id,
				dropDate : utilsService.formatDateTime(Date.now()),
				readyDate: utilsService.formatDateTime(_readyDate),
				quantity: total.q,
				dollar: total.d,
				cent: total.c
			};
			
			orderService.saveOrUpdateOrder(_cart, opts);
			_clear();
			orderId = 0;
		}
	}
	
	function _getTotal() {
		return _calculateTotal(_cart);
	}
	
	function _calculateTotal(items) {
		let q = 0, c = 0, d = 0;
		for (let i = 0, n = items.length; i < n; i++) {
			let cartItem = items[i];
			let dollar = Number(cartItem.dollar), cent = Number(cartItem.cent),
				quantity = Number(cartItem.quantity);
			let addonItems = cartItem.orderDetailAddonItems;
			if (addonItems) {
				for (let j = 0, len = addonItems.length; j < len; j++) {
					let addonItem = addonItems[j];
					dollar += Number(addonItem.dollar);
					cent += Number(addonItem.cent);
				}
			}
			
			dollar = dollar * quantity;
			cent = cent * quantity;
			
			q += quantity;
			d += dollar;
			c += cent;
		}

		let rem = c % 100;
		d = d + ((c - rem) / 100);
		c = rem;
		return {q: q, d: d, c: c};
	}
	
	return {
		get: _get,
		remove: _remove,
		subscribe: _subscribe,
		clear: _clear,
		addItem: _addItem,
		update: _update,
		saveOrUpdateOrder: _saveOrUpdateOrder,
		setReadyDate: _setReadyDate,
		defaultReadyDate: _defaultReadyDate,
		getTotal: _getTotal,
		isEmpty: _isEmpty,
		setOrderId: _setOrderId
	};
}

class _CartItem {
	constructor(item, typeName, quantity) {
		this.item = item;
		this.typeName = typeName;
		
		this.dollar = item.price.dollar;
		this.cent = item.price.cent;
		
		this.quantity = quantity;
		this.hasQuantity = quantity === 1;
	}
	
	get itemName() {
		if (this.typeName)
			return this.typeName.concat(" ", this.item.name);
		return this.item.name;
	}
}
function keyboardService(APP_CONFIG) {
	let options = {};

	options.number = {kt:'Number_Pad', relative: false, size: 5}
	options.letter = {kt:'POS_Keyboard', relative: false, size: 5}
	
	function _switchControl(control) {
		_control = control;
	}
	
	return {
		getNumberPad: function() {
			if (APP_CONFIG.ENABLE_ONSCREEN_KEYBOARD)
				return options.number;
			return null;
		},
		getKeyboard: function() {
			if (APP_CONFIG.ENABLE_ONSCREEN_KEYBOARD)
				return options.letter;
			return null;
		},
		switchControl: _switchControl,
		isOnScreenKeyboardInControl: function() {
			return _control;
		}
	};
}
function orderService(APP_CONFIG, $http, urlService) {
    
	function _collapseDuplicateOrderDetails(orderDetails) {
		let unique = [];
		let dupGroup = {};
		for (let i = 0, n = orderDetails.length; i < n; i++) {
			let uniqueIndex;
			if (! unique.some(function(other, index) {
					uniqueIndex = index;
					return orderDetails[i].equals(other); 
					})) {
				unique.push(orderDetails[i]);
			} else {
				let group = dupGroup[uniqueIndex] || [];
				group.push(i);
				dupGroup[uniqueIndex] = group;
			}
		}

		for (let index in dupGroup) {
			let subtotal = 0;
			let group = dupGroup[index];
			for(let i = 0, n = group.length; i < n; i++) {
				subtotal += orderDetails[group[i]].quantity;
			}
			unique[index].quantity += subtotal; 
		}
		
		return unique;
	}
	
	function _saveOrUpdate(cartItems, options) {
		let _orderDetails = [];
		for (let i = 0, n = cartItems.length; i < n; i++) {
			let _addonItems = [];
			if (cartItems[i].orderDetailAddonItems) {
				for (let j = 0, len = cartItems[i].orderDetailAddonItems.length; j < len; j++) {
					let addonItem = new _OrderDetailAddonItemRequestBody(cartItems[i].orderDetailAddonItems[j]);
					_addonItems.push(addonItem);
				}
			}
			let orderDetail = new _OrderDetailRequestBody(cartItems[i], _addonItems); 
			_orderDetails.push(orderDetail);
		}
		_orderDetails = _collapseDuplicateOrderDetails(_orderDetails);		
		options.orderDetails = _orderDetails;
		
		let _order = new _OrderRequestBody(options);
		$http.post(urlService.order + '/save', _order);
	}
	
	function _getById(orderId, success, fail) {
		$http.get(urlService.order + '/' + orderId)
			.then(function(res) {
				success(res.data);
			}, fail);
	}
	
	function _getByCustomer(customer, success, fail) {
		$http.get(urlService.order + '/customer/' + customer.id)
			.then(function(res) {
				success(res.data);
			}, fail);
	}
	
	function _completeOrders(orders, success, fail) {
		$http.post(urlService.order + '/complete', {orderId : orders}).then(function(res) {
			//success(res.data);
		}, fail);
	}
	
	function _completeOrder(order, success, fail) {
		
	}
	
	function _voidOrders(orders, success, fail) {
		$http.post(urlService.order + '/void', {orderId : orders}).then(function(res) {
			//success(res.data);
		}, fail);
	}
	
	function _voidOrder(order, success, fail) {
		$http.post(urlService.order + '/void', {orderId : orders}).then(function(res) {
			//success(res.data);
		}, fail);
	}
	
	return {
		saveOrUpdateOrder: _saveOrUpdate,
		getById: _getById,
		getByCustomer: _getByCustomer,
		completeOrders: _completeOrders,
		voidOrders: _voidOrders,
		completeOrder: _completeOrder,
		voidOrder: _voidOrder
	};
}

class _OrderRequestBody {
	constructor(options) {
		this.id = angular.isDefined(options.id) ? options.id : 0;
		this.orderDetails = options.orderDetails;
		this.customerId = angular.isDefined(options.customerId) ? options.customerId : 0;
		
		this.dropDate = angular.isDefined(options.dropDate) ? options.dropDate : null;
		this.readyDate = angular.isDefined(options.readyDate) ? options.readyDate : null;
		this.pickupDate = angular.isDefined(options.pickupDate) ? options.pickupDate : null;
		
		this.active = angular.isDefined(options.active) ? options.active:true;
		this.completed = angular.isDefined(options.completed) ? options.completed:false;
		this.voided = angular.isDefined(options.voided) ? options.voided:false;
	
		this.quantity = options.quantity;
		this.dollar = options.dollar;
		this.cent = options.cent;
	}
}

class _OrderDetailRequestBody {
	constructor(options, orderDetailAddonItems) {
		this.id = angular.isDefined(options.id) ? options.id : 0;
		this.itemId = options.item.id;
		this.quantity = Number(options.quantity);
		this.active = angular.isDefined(options.active) ? options.active:true;
		this.orderDetailAddonItems = orderDetailAddonItems;
		
		if (options.item.price.dollar !== options.dollar ||
				options.item.price.cent !== options.cent) {
			this.newPrice = new _NewPrice(options.dollar, options.cent);
		}
	}
	
	equals(other) {
		return angular.equals(this.itemId, other.itemId)
			&& angular.equals(this.newPrice, other.newPrice)
			&& angular.equals(this.orderDetailAddonItems, other.orderDetailAddonItems);
	}
}

class _OrderDetailAddonItemRequestBody {
	constructor(options) {
		this.addonItemId = options.item.id;
		this.active = angular.isDefined(options.active) ? options.active:true;

		if (options.item.price.dollar !== options.dollar ||
				options.item.price.cent !== options.cent) {
			this.newPrice = new _NewPrice(options.dollar, options.cent);
		}
	}
	
	equals(other) {
		return angular.equals(this.addonItemId, other.addonItemId)
			&& angular.equals(this.newPrice, other.newPrice);
	}
}

class _NewPrice {
	constructor(dollar, cent) {
		this.dollar = dollar;
		this.cent = cent;
	}
}
/**
 * Navigation Service
 */
function navigationService(APP_CONFIG, $state) {
	var _data = {};
	_data.IS_READY = false;
	
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
		},
		isReady: function() {
			return _data.IS_READY;
		},
		setReady: function(ready) {
			_data.IS_READY = ready;
		}
	};
}
function menuService(APP_CONFIG, $q, navigationService, itemService) {
	
	let _data = {};
	let IS_MENU_READY = false;
	
	function _initMenu() {
		let promises = itemService.getAJAXItemPromises();
		$q.all(promises).then(
			function(res) {

				itemService.setItemTypes(res[0].data);
				itemService.setItems(res[1].data);
				itemService.setAddonItems(res[2].data);
				
				_buildItemMenu();
				
				navigationService.setReady(true);
			}, function(res) {
				//GET request failed
			});
	}
	
	function _buildItemMenuGrid(items, numberOfItems) {
		let itemMenu = [],
			row = [];
		
		for (let i=0, len=items.length; i < len; i++) {
			let item = items[i];
			if ((angular.isDefined(item.active) && item.active) || angular.isUndefined(item.active)) {
				row.push(item);		
				if (row.length == numberOfItems) {
					itemMenu.push(row);
					row = [];
				}	
			}
		}
		itemMenu.push(row);
		return itemMenu;
	}
	
	function _buildItemMenu() {
		let itemMenu = [],
			itemTypes = itemService.getItemTypes(),
			items = itemService.getItems();
		
		for (let i=0, len=itemTypes.length; i < len; i++) {
			let _itemsByType = items.get(itemTypes[i].id);
			if (_itemsByType && itemTypes[i].active) {
				itemMenu.push({	name: itemTypes[i].name, 
								submenu: _buildItemMenuGrid(_itemsByType, APP_CONFIG.NUMBER_OF_BUTTONS_PER_ROW)});				
			}
		}

		let mainItemMenu = _buildItemMenuGrid(itemMenu, APP_CONFIG.NUMBER_OF_BUTTONS_PER_ROW);
		_data.mainItemMenu = mainItemMenu;
	}
	
	function _isPriceLocked () {
		return APP_CONFIG.IS_PRICE_LOCKED;
	}
	
	return {
		isPriceLocked: _isPriceLocked,
		getNumberOfAddonItemButtons: function() {
			return APP_CONFIG.NUMBER_OF_ADDON_ITEM_BUTTONS;
		},
		initMenu: function() {
			if (!IS_MENU_READY) {
				_initMenu();
			}
		},
		refreshMenu: function() {
			_buildItemMenu();
		},
		isMenuReady: function() {
			return IS_MENU_READY;
		},
		getMainItemMenu: function() {
			if (_data.mainItemMenu)
				return _data.mainItemMenu;
			
			return null;
		},
		getAddonItemMenu: function() {
			if (_data.addonitems)
				return _data.addonitems;
			
			return null;
		},
		getManageMenuDefaultSizes: function() {
			return {
				types: APP_CONFIG.MANAGE_MENU_DEFAULT_NUMBER_OF_TYPES,
				items: APP_CONFIG.MANAGE_MENU_DEFAULT_NUMBER_OF_ITEMS
			};
		}
	};
}
/**
 * Customer Service
 */
function customerService(APP_CONFIG, $http, urlService, stringService) {
	let current = null,
		previous = null;
	
	function _getSearchCustomerInputFields() {
		return angular.copy(APP_CONFIG.SEARCH_CUSTOMER_INPUT);
	}
	
	function _save(info, success, fail) {
		$http.post(urlService.customer + '/save', info).then(success, fail);
	}
	
	function _update(info, success, fail) {
		$http.post(urlService.customer + '/update', info).then(success, fail);
	}
	
	function _formatString(customer) {
		let displayValue = [];
		displayValue.push(customer.lastName);

		if (customer.firstName) {
			displayValue.push(customer.firstName);
		}

		if (customer.number) {
			displayValue.push(customer.number);
		}

		return displayValue;
	}
	
	function _search(querystr, success, fail) {
		if (querystr)
			$http.get(urlService.customer + '/search/'+ querystr.toLowerCase())
				.then(function (res) {
					let customers = res.data;
					customers.map(function(customer) {
						customer.name = customer.lastName + ', ' + customer.firstName; 
						customer.displayValue = _formatString(customer);
					});
					success(customers);
				}, fail);
	}
	
	function _setCurrentCustomer(customer) {
		if (customer) {
			previous = current;
			current = customer;
		}
	}
	
	function _getCurrentCustomer() {
		if (current)
			return current;
		return null;
	}
	
	function _clearCurrentCustomer() {
		if (current)
			previous = current;
		current = null;
	}
	
	function _subscribe(o) {
		return subject.subscribe(o);
	}
	
	return {
		getSearchCustomerInput: _getSearchCustomerInputFields,
		save: _save,
		update: _update,
		search: _search,
		setCurrentCustomer: _setCurrentCustomer,
		getCurrentCustomer: _getCurrentCustomer,
		clearCurrentCustomer: _clearCurrentCustomer,
		subscribe: _subscribe
	};
}
function utilsService($filter) {
	let BOOTSTRAP_CSS_COL_XS = "col-xs-",
		TEXT_FONT_SIZE = 'font-';
	
	return {
		getCSScolxs: function() {
			return BOOTSTRAP_CSS_COL_XS;
		},
		
		getCSStextFontSize: function() {
			return TEXT_FONT_SIZE;
		},
		
		formatDateTime: function(datetime) {
			let epoch;
			
			if (angular.isNumber(datetime)) {
				epoch = datetime;
			} else if (Object.prototype.toString.call(datetime) === '[object Date]') {
				epoch = datetime.getTime();
			}
			
			// Otherwise, jackson2 complains.
			return $filter('date')(epoch, 'yyyy-MM-ddThh:mm:ss');
		}
	};
}
/**
 * Item Service
 */
function itemService(APP_CONFIG, $http, urlService) {
	let _data = {};
	
	function _groupItemsByType(items) {
		let itemMap = new Map();
		let groupedByType = items.reduce(function(map, currentItem) {
			itemMap.set(currentItem.id, currentItem);
			
			if (currentItem.active) {
				let itemTypeId = currentItem['itemTypeId'];
				let items = map.get(itemTypeId) || [];
				items.push(currentItem);
				map.set(itemTypeId, items);
			}
			return map;
		}, new Map());
		
		_data.itemMap = itemMap;

		for (let items of groupedByType.values()) {
			items.sort(_sortByWeight);
		}
		return groupedByType;
	}

	function _sortByWeight(a, b) {
		if (angular.isUndefined(a.weight) && angular.isUndefined(b.weight))
			return 0;
		
		let weight_a = new Number(a.weight);
		let weight_b = new Number(b.weight);
		
		if (a.weight < b.weight) {
			return -1;
		}
		
		if (a.weight > b.weight) {
			return 1;
		}
		
		return 0;
	}
	
	function _ajaxGetItems() {
		return $http.get(urlService.item + '/item/list');
	}
	
	function _ajaxGetItemTypes() {
		return $http.get(urlService.item + '/type/list')
	}
	
	function _ajaxGetAddOnItems() {
		if (APP_CONFIG.SHOW_ADD_ON_ITEMS) {
			return $http.get(urlService.item + '/addonitem/list');
		}
		return null;
	}
	
	function _saveOrUpdateItemType(itemType, fn) {
		let _itemType = new _ItemTypeRequestBody(itemType);
		
		$http.post(urlService.item + '/type', _itemType)
			.then(function (res){
				_setItemTypes(res.data);
				fn();
		}, function () {
		
		});
	}
	
	function _saveOrUpdateItem(item, fn) {
		let _item = new _ItemRequestBody(item);
		$http.post(urlService.item + '/item', _item)
			.then(function success(res){
				_setItemsByItemType(res.data, _item.itemTypeId);
				fn();
		}, function error() {
		
		});
	}
	
	function _saveOrUpdateAddonItem(addonItem, fn) {
		let _addonItem = new _AddonItemRequestBody(addonItem);
		$http.post(urlService.item + '/addonitem', _addonItem)
		.then(function success(res){
			_setAddonItems(res.data);
			fn();
		}, function error() {
	
		});
	}
	
	function _setItemTypes(itemTypes) {
		_data.itemTypes = null;
		if (angular.isArray(itemTypes)) {
			let itemTypeMap = new Map();
			for (let i=0, len=itemTypes.length; i < len; i++) {
				itemTypeMap.set(itemTypes[i].id, itemTypes[i]);
			}
			_data.itemTypeMap = itemTypeMap;

			itemTypes.sort(_sortByWeight);
			_data.itemTypes = itemTypes;
		}
	}
	
	function _setItems(items) {
		_data.items = null;
			
		if (angular.isArray(items)) {
			_data.items = _groupItemsByType(items);
		}
	}
	
	function _getItemMap(){
		return _data.itemMap;
	}
	
	function _getItemTypeMap() {
		return _data.itemTypeMap;
	}
	
	function _getAddonItemMap() {
		return _data.addonItemMap
	}
	
	function _setItemsByItemType(items, itemType) {
		let oldItems = _data.items.get(itemType);
		for (let i = 0, len = oldItems.length; i < len; i++) {
			_data.itemMap.delete(oldItems[i].id);
		}
		
		for (let i = 0, len = items.length; i < len; i++) {
			_data.itemMap.set(items[i].id, items[i]);
		}
		
		items.sort(_sortByWeight);
		let activeItems = items.filter(function(item) {
			return item.active;
		})
		_data.items.set(itemType, activeItems);
	}
	
	function _setAddonItems(addonItems) {
		_data.addonItems = null;
		if (angular.isArray(addonItems)) {
			let addonItemMap = new Map();
			for (let i=0, len=addonItems.length; i < len; i++) {
				addonItemMap.set(addonItems[i].id, addonItems[i]);
			}
			_data.addonItemMap = addonItemMap;
			
			addonItems.sort(_sortByWeight);
			_data.addonItems = addonItems;
		}
	}
	
	return {
		getAJAXItemPromises: function() {
			let promises = [];
			
			let itemTypes = _ajaxGetItemTypes();
			if (itemTypes)	promises.push(itemTypes);
			
			let items = _ajaxGetItems();
			if (items)	promises.push(items);
			
			let addonitems = _ajaxGetAddOnItems();
			if (addonitems)	promises.push(addonitems);
			
			return promises;
		},
		
		saveOrUpdateItemType: _saveOrUpdateItemType,
		saveOrUpdateItem: _saveOrUpdateItem,
		saveOrUpdateAddonItem: _saveOrUpdateAddonItem,
		getItemsGroupedByType: function() {
			if (!_data.itemsGroupedByType)	return null;
			
			return _data.itemsGroupedByType;
		},
		setItems: _setItems,
		setItemTypes: _setItemTypes,
		setAddonItems: _setAddonItems,
		getItemMap: _getItemMap,
		getItemTypeMap: _getItemTypeMap,
		getAddonItemMap: _getAddonItemMap,
		getItems: function() {
			if (!_data.items)	return null;
			
			return _data.items;
		},
		getItemTypes: function() {
			if (!_data.itemTypes)	return null;
			
			return _data.itemTypes;
		},
		getAddonItems: function() {
			if (!_data.addonItems) {
				return null;
			}			
			return _data.addonItems;
		}
	};
}

class _ItemRequestBody {
	constructor(options) {
		this.itemTypeId = options.itemTypeId;
		this.name = options.name;
		
		this.id = options.id || 0;
		this.dollar = options.dollar || 0;
		this.cent = options.cent || 0;
		this.weight = options.weight || 0;
		
		this.active = angular.isDefined(options.active) ? options.active:true;
	}
}

class _ItemTypeRequestBody {
	constructor(options) {
		this.id = options.id || 0;
		this.name = options.name || null;
		this.weight = options.weight || 0;
		
		this.active = angular.isDefined(options.active) ? options.active:true;
	}
}

class _AddonItemRequestBody {
	constructor(options) {
		this.id = options.id || 0;
		this.name = options.name || null;
		this.dollar = options.dollar || 0;
		this.cent = options.cent || 0;
		this.weight = options.weight || 0;
		
		this.active = angular.isDefined(options.active) ? options.active:true;
	}
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
		customer : base + '/customer'
	}
}
function spinnerModalProvider() {
	this.$get = ['$injector', '$timeout', function($injector, $timeout) {
		let completeTimeout,
	        started = false;
		let modalInstance = null;
		let $uibModal;
		
		function _start() {
	        $timeout.cancel(completeTimeout);

	        if (started) {
	          return;
	        }

	        started = true;

	        $uibModal = $uibModal || $injector.get('$uibModal');
	        
	        modalInstance = $uibModal.open({
	            animation: false,
	            backdrop: 'static',
	            component: 'spinner'
	        });
		}

	    function _complete() {
	        $timeout.cancel(completeTimeout);

	        started = false;
	        
	        if (modalInstance)
	        	modalInstance.close(null);
	        
	        modalInstance = null;
	    }

	    return {
	        start            : _start,
	        complete         : _complete
	    };
	}];
}
// Polyfill
String.prototype.repeat = String.prototype.repeat || function(n){ 
    return n<=1 ? this : (this + this.repeat(n-1)); 
}

function messageService(APP_CONFIG) {
	let _data = {};
	
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

let app = 
	angular.module('posapp', ['ui.router', 'ui.bootstrap', 'angular-virtual-keyboard', 'angular-loading-bar', 'rx'])
		.constant('APP_CONFIG', {
			NAVIGATION: [{
			              	name: "POS App"
			              }, 
			              {
			            	name: "Order",
							menu: [{
										name: "New",
										link: "neworder"
									}, 
									{
										name: "PickUp",
										link: "pickuporder"
									}],
									customer : false
			              }, 
			              {
			            	  name: "Customer",
			            	  menu:	[{
										name: "New",
										link: "newcustomer"
									}],
									customer : true
			              },
			              {
			            	  name: "Manage",
			            	  menu:	[{
										name: "Menu",
										link: "managemenu"
									}],
									customer : false
			              },
			              ],
			
		    NEW_CUSTOMER_INPUT:	[{
									'label' : 'Last Name',
									'placeholder' : 'Last Name',
									'value' : null,
									required : true
								}, 
								{
									'label' : 'First Name',
									'placeholder' : 'First Name',
									'value' : null,
									required : false
								}, 
								{
									'label' : 'Phone Number',
									'placeholder' : 'Phone Number',
									'value' : null,
									required : false
								}],
			
			SEARCH_CUSTOMER_INPUT : [ {
				label : 'Customer',
				placeholder : 'Last Name',
				value : null,
				required : true
			} ],
			// true : requires a customer to complete an order
			// false: does not
			CUSTOMER_MODE : true,
			ENABLE_ONSCREEN_KEYBOARD : false, 
			// manage menu configs
			MANAGE_MENU_DEFAULT_NUMBER_OF_TYPES : 10,
			MANAGE_MENU_DEFAULT_NUMBER_OF_ITEMS : 10,
			
			// menu configs
			SHOW_ADD_ON_ITEMS : true,
			NUMBER_OF_ADDON_ITEM_BUTTONS : 4,
			NUMBER_OF_BUTTONS_PER_ROW : 4,
			
			IS_PRICE_LOCKED: true,
			
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
							VKI_CONFIG.layout['POS_Keyboard'] = {
								'name' : "POS Application Keyboard",
								'keys' : [
										[ [ "0" ], [ "1" ], [ "2" ], [ "3" ], [ "4" ], [ "5" ], [ "6" ], [ "7" ], [ "8" ], [ "9" ] ],
										[ [ "A" ], [ "B" ], [ "C" ], [ "D" ], [ "E" ], [ "F" ], [ "G" ], [ "H" ], [ "I" ], [ "J" ] ],
										[ [ "K" ], [ "L" ], [ "M" ], [ "N" ], [ "O" ], [ "P" ], [ "Q" ], [ "R" ], [ "S" ], [ "T" ] ],
										[ [ "U" ], [ "V" ], [ "W" ], [ "X" ], [ "Y" ], [ "Z" ], [ "", "" ], [ "", "" ], [ "", "" ], [ "", "" ] ],
										[ [ " ", " " ], [ "Bksp", "Bksp" ], [ "Enter", "Enter" ] ] ],
								'lang' : [ "en-US" ]
							};
							
							VKI_CONFIG.layout['Number_Pad'] = {
								'name' : 'Number Only Pad',
								'keys' : [
								          	[ [ "0" ], [ "1" ], [ "2" ], [ "3" ], [ "4" ] ],
								          	[ [ "5" ], [ "6" ], [ "7" ], [ "8" ], [ "9" ] ],
								          	[ [ " ", " " ], [ "Bksp", "Bksp" ], [ "Enter", "Enter" ] ] 
								          ],
								 'lang': ["en-US"]
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
								template : "Home Page"
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
								template : '<pickup></pickup>'
							}).state('managemenu', {
								url: '/app/manage_menu',
								template: '<managemenu></managemenu>'
							})
						} ])		
		.provider('spinnerModal', spinnerModalProvider)
		.factory('keyboardService', ['APP_CONFIG', keyboardService])
		.factory('stringService', stringService)
		.factory('urlService', urlService)
		.factory('orderService', [ 'APP_CONFIG', '$http', 'urlService', 'utilsService', orderService ])
		.factory('cartService', [ 'APP_CONFIG', 'orderService', 'customerService', 'utilsService', 'rx', cartService ])
		.factory('customerService', [ 'APP_CONFIG', '$http', 'urlService', 'stringService', customerService ])
		.factory('navigationService', [ 'APP_CONFIG', '$state', navigationService ])
		.factory('itemService', [ 'APP_CONFIG', '$http', 'urlService', itemService])
		.factory('menuService', ['APP_CONFIG', '$q', 'navigationService', 'itemService', menuService])
		.factory('utilsService', ['$filter', utilsService])
		.component('navigation', navigationComponent)
		.component('newcustomer', newCustomerComponent)
		.component('customersearch', searchCustomerComponent)
		.component('menu', menuComponent)
		.component('addonitems', addonItemsComponent)
		.component('cart', cartComponent)
		.component('neworder', newOrderComponent)
		.component('pickup', pickupComponent)
		.component('managemenu', manageMenuComponent)
		.component('manageitemtype', manageItemTypeComponent)
		.component('manageitem', manageItemComponent)
		.component('pnButtons', prevNextButtonsComponent)
		.component('swInput', spanWrappedInputComponent)
		.component('swButton', spanWrappedButtonComponent)
		.component('spinner', spinnerModalComponent)
		.component('itemtype', editItemTypeComponent)
		.component('itemTypeList', itemTypeListComponent)
		.component('item', editItemComponent)
		.component('itemList', itemListComponent)
		.component('cartItem', cartItemComponent)
		.component('cartItemList', cartItemListComponent)
		.component('swLabeledInput', spanWrappedLabeledInputComponent)
		.component('pForm', formComponent)
		.component('selectList', selectListComponent)
		.component('manageaddon', manageAddonItemComponent)
		.component('orderItem', orderItemComponent)
		.component('orderItemList', orderItemListComponent)
.run(['menuService', 'navigationService', function(menuService, navigationService) {
	menuService.initMenu();
	navigationService.setRoute();
}]);
