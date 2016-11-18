/**
 * Cart Service
 */
function cartService(APP_CONFIG, stringService, rx) {
	let _cart = [],
		subject = new rx.Subject();
	
	function _remove(index, parentIndex) {
		if (angular.isUndefined(parentIndex)) {
			_cart.splice(index, 1);
			reindex();
		} else {
			_cart[parentIndex].addonItems.splice(index, 1);
			reindex(parentIndex)
		}
		subject.onNext(Array.from(_cart));
	}
	
	function reindex(parentIndex) {
		let listToIndex = _cart;
		if (angular.isDefined(parentIndex)) {
			listToIndex = _cart[parentIndex].addonItems;
		}
		
		for (var i = 0; i < listToIndex.length; i++) {
			listToIndex[i].index = i;
			let addonItems = listToIndex[i].addonItems;

			if (angular.isUndefined(parentIndex) && addonItems) {
				for (var j = 0; j < addonItems.length; j++) {
					addonItems[j].parentIndex = i;
				}
			}
		}
	}

	function _update(name, value, index, parentIndex) {
		let item = _cart[index];
		if (angular.isDefined(parentIndex)) {
			let parentIndex = _cart[parentIndex]
			item = parentIndex.addonItems[index];
		}
		item[name] = value;
		subject.onNext(Array.from(_cart));
	}
	
	function _clear() {
		_cart = [];
	}
	
	function _get() {
		return Array.from(_cart);
	}
	
	function _addItem(typeName, item) {
		let itemCopy = angular.copy(item);
		let cartItem = itemCopy.itemTypeId ? 
						new _CartItem(itemCopy, typeName, 1) 
					: 	new _CartItem(itemCopy, typeName, 0);
		
		//For addon items
		if (! cartItem.hasQuantity) {
			let _parentItem = _cart[_cart.length - 1];
			if (! _parentItem.addonItems) {
				_parentItem.addonItems = [];
			}
			
			cartItem.parentIndex = _cart.length - 1;
			cartItem.index = _parentItem.addonItems.length;
			_parentItem.addonItems.push(cartItem);
		} else {
			cartItem.index = _cart.length;
			_cart.push(cartItem);
		}
		subject.onNext(Array.from(_cart));
	}
	
	function _isEmpty() {
		return _cart.length == 0;
	}
	
	function _subscribe(o) {
		return subject.subscribe(o);
	}
	
	return {
		get: _get,
		remove: _remove,
		subscribe: _subscribe,
		clear: _clear,
		addItem: _addItem,
		update: _update,
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
