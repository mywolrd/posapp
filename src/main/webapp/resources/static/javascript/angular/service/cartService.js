/**
 * Cart Service
 */
function cartService(APP_CONFIG, stringService) {
	var _data = {};
	_data.cart = [];

	return {
		getCart : function() {
			return _data.cart;
		},
		clearCart : function() {
			_data.cart = [];
		},
		addItem : function(item) {
			var itemCopy = angular.copy(item);
			var cartItem = itemCopy.itemType ? new _CartItem(itemCopy, 1, true) : new _CartItem(itemCopy, 0, false);
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
				total = total + cart[i].quantity;
			}
			return total;
		},
		getTotalPrice: function() {
			
		},
		isEmpty: function() {
			return _data.cart.length == 0;
		}
	};
}

class _CartItem {
	constructor(item, quantity, hasQuantity) {
		this.item = item;
		this.price = angular.copy(item.price);
		this.newprice = {};
		this.oldprice = {};
		this.quantity = quantity;
		this.hasQuantity = hasQuantity;
	}
	
	get itemName() {
		return this.item.itemName;
	}	
}
