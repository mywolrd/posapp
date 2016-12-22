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
