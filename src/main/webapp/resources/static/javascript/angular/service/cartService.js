/**
 * Cart Service
 */
function cartService(APP_CONFIG, stringService, rx) {
	let _cart = [],
		subject = new rx.Subject();
	
	function _remove(index) {
		_cart.splice(index, 1);
		subject.onNext(Array.from(_cart));
	}
	
	function _clear() {
		_cart = [];
	}
	
	function _addItem(typeName, item) {
		let itemCopy = angular.copy(item);
		let cartItem = itemCopy.itemTypeId ? 
						new _CartItem(itemCopy, typeName, 1) 
					: 	new _CartItem(itemCopy, typeName, 0);
		_cart.push(cartItem);
		subject.onNext(Array.from(_cart));
	}
	
	function _isEmpty() {
		return _cart.length == 0;
	}
	
	function _subscribe(o) {
		return subject.subscribe(o);
	}
	
	return {
		remove: _remove,
		subscribe: _subscribe,
		clear: _clear,
		addItem: _addItem,
		getTotalQuantity: function() {
			let i, len;
			let total = 0;
			let cart = _cart;
			for(i=0, len=cart.length; i < len; i++) {
				total = total + cart[i].quantity;
			}
			return total;
		},
		getTotalPrice: function() {
			
		},
		isEmpty: _isEmpty
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
