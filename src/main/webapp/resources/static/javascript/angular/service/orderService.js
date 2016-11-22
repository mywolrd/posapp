function orderService(APP_CONFIG, $http, urlService) {
    
	function _saveOrUpdate(cartItems) {
		let _orderDetails = [];
		
		//TODO
		//Refactor?
		for (let i = 0; i < cartItems.length; i++) {
			let _addonItems;
			if (cartItems[i].addonItems) {
				_addonItems = [];
				for(let j = 0; j < cartItems[i].addonItems.length; j++) {
					let addonItem = new _OrderDetailAddonItemRequestBody(cartItems[i].addonItems[j]);
					_addonItems.push(addonItem);
				}
			}
			let orderDetail = new _OrderDetailRequestBody(cartItems[i], _addonItems); 
			_orderDetails.push(orderDetail);
		}
		let _order = new _OrderRequestBody({orderDetails: _orderDetails});
		$http.post(urlService.order + '/save', _order);
	}
	
	return {
		saveOrUpdateOrder: _saveOrUpdate
	};
}

class _OrderRequestBody {
	constructor(options) {
		this.id = angular.isDefined(options.id) ? options.id : 0;
		this.orderDetails = options.orderDetails;
	}
}

class _OrderDetailRequestBody {
	constructor(options, orderDetailAddonItems) {
		this.itemId = options.item.id;
		this.quantity = options.quantity;
		
		this.orderDetailAddonItems = orderDetailAddonItems;
		
		if (options.item.price.dollar !== options.dollar ||
				options.item.price.cent !== options.cent) {
			this.newPrice = new _NewPrice(options.dollar, options.cent);
		}
	}
	
	equals(other) {
		return angular.equals(this.itemId, other.itemId)
			&& angular.equals(this.newPrice, other.newPrice)
			&& angular.equals(this.orderDetailsAddonItems, other.orderDetailsAddonItems);
	}
}

class _OrderDetailAddonItemRequestBody {
	constructor(options) {
		this.addonItemId = options.item.id;
		
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