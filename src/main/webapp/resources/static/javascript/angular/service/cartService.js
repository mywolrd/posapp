/**
 * Cart Service
 */
function cartService(APP_CONFIG, orderService, rx) {
	let _cart = [],
		subject = new rx.Subject(),
		_readyDate = null;
	
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
		
		for (let i = 0; i < listToIndex.length; i++) {
			listToIndex[i].index = i;
			let addonItems = listToIndex[i].addonItems;

			if (angular.isUndefined(parentIndex) && addonItems) {
				for (let j = 0; j < addonItems.length; j++) {
					addonItems[j].parentIndex = i;
				}
			}
		}
	}

	function _setReadyDate(date) {
		_readyDate = date;
	}

	function _defaultReadyDate() {
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
			item = _cart[parentIndex].addonItems[index];
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
	
	function _saveOrUpdateOrder() {
		orderService.saveOrUpdateOrder(_cart, _readyDate, customerService.getCurrentCustomer());
		_clear();
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
		getTotalQuantity: function() {
			let total = 0;
			for(let i=0; i < _cart.length; i++) {
				total = total + _cart[i].quantity;
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
