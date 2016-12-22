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
