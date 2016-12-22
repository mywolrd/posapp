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