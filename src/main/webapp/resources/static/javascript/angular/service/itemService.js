/**
 * Item Service
 */
function itemService(APP_CONFIG, $http, urlService) {
	let _data = {};
	
	function _groupItemsByType(items) {
		let groupedByType = items.reduce(function(map, currentItem) {
			let itemTypeId = currentItem['itemTypeId'];
			let items = map.get(itemTypeId) || [];
			items.push(currentItem);
			map.set(itemTypeId, items);
			return map;
		}, new Map());
		
		for (let items in groupedByType.values()) {
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
	
	function _saveOrUpdateItem(item) {
		$http.post(urlService.item + '/item', item)
		.then(function success(){
		}, function error() {
		} );
	}
	
	function _setItemTypes(itemTypes) {
		_data.itemTypes = null;
		if (angular.isArray(itemTypes)) {
			itemTypes.sort(_sortByWeight);
			_data.itemTypes = itemTypes;
		}
	}
	
	return {
		groupItemsByType: function(itemTypes, items) {
			return _groupItemsByType(itemTypes, items);
		},
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
		saveOrUpdateItem: function(options) {
			let _item = new _ItemRequestBody(options);
			return _saveOrUpdateItem(_item);
		},
		getItemsGroupedByType: function() {
			if (!_data.itemsGroupedByType)	return null;
			
			return _data.itemsGroupedByType;
		},
		setItems: function(items) {
			_data.items = null;
			
			if (angular.isArray(items)) {
				_data.items = _groupItemsByType(items);
			}
		},
		setItemTypes: _setItemTypes,
		getItems: function() {
			if (!_data.items)	return null;
			
			return _data.items;
		},
		getItemTypes: function() {
			if (!_data.itemTypes)	return null;
			
			return _data.itemTypes;
		},
		getAddOnItems: function() {
			if (!_data.addonitems) {
				return null;
			}			
			return _data.addonitems;
		}
	};
}

class _ItemRequestBody {
	constructor(options) {
		this.id = angular.isDefined(options.id) ? options.id:0;
		this.itemTypeId = options.itemTypeId;
		this.name = options.name;
		this.dollar = angular.isDefined(options.dollar) ? options.dollar:0;
		this.cent = angular.isDefined(options.cent) ? options.cent:0;
		this.weight = angular.isDefined(options.weight) ? options.weight:0;
		this.active = angular.isDefined(options.active) ? options.active:true;
	}
}

class _ItemTypeRequestBody {
	constructor(options) {
		this.name = angular.isDefined(options.name) ? options.name:null;
		this.weight = angular.isDefined(options.weight) ? options.weight:0;
		this.active = angular.isDefined(options.active) ? options.active:true;
		this.id = angular.isDefined(options.id) ? options.id:0;
	}
}