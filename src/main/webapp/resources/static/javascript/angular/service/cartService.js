/**
 * Cart Service
 */
function cartService(APP_CONFIG, stringService) {
	var _data = {};
	_data.cart = [];

	function _remove(index) {
		_data.cart.splice(index, 1);
	}
	
	return {
		remove: _remove,
		getCart : function() {
			return _data.cart;
		},
		clearCart : function() {
			_data.cart = [];
		},
		addItem : function(typeName, item) {
			var itemCopy = angular.copy(item);
			var cartItem = itemCopy.itemTypeId ? 
							new _CartItem(itemCopy, typeName, 1) 
						: 	new _CartItem(itemCopy, typeName, 0);
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
	constructor(item, typeName, quantity) {
		this.item = item;
		this.typeName = typeName;
		
		this.newprice = angular.copy(item.price);
		this.oldprice = angular.copy(item.price);
		
		this.quantity = quantity;
		this.hasQuantity = quantity === 1 ? true : false;
	}
	
	get itemName() {
		return this.typeName.concat(" ", this.item.name);
	}	
}
