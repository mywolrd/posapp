/**
 * Item Service
 */
function itemService(APP_CONFIG, $http, urlService) {
	let _data = {};

	function _groupItemsByType(itemTypes, items) {
		let groupedItems = items.reduce(function(dict, currentItem) {
			dict[currentItem['itemTypeId']] = dict[currentItem['itemTypeId']] || [];
			dict[currentItem['itemTypeId']].push(currentItem);
			return dict;
		}, {});
		
		itemTypes.sort(sortByWeight);
		let groupedByType = itemTypes.reduce(function(arr, itemType) {
			let items = groupedItems[itemType.id];
			if (items) {
				items.sort(sortByWeight);
			} else {
				items = null;
			}
			arr.push({ type: itemType, items: items })
			return arr;
		}, []);

		_data.itemTypes = itemTypes;
		_data.items = items;
		_data.itemsGroupedByType = groupedByType;
		return groupedByType;
	}

	function sortByWeight(a, b) {
		if (!angular.isDefined(a.weight) && !angular.isDefined(b.weight))
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
	
	function _saveOrUpdateItemType(itemType) {
		console.log(itemType);
		$http.post(urlService.item + '/type', itemType)
		.then(function success(){
		}, function error() {
		} );
	}
	
	function _saveOrUpdateItem(item) {
		$http.post(urlService.item + '/item', item)
		.then(function success(){
		}, function error() {
		} );
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
			
			//let addonitems = _ajaxGetAddOnItems();
			//if (addonitems)	promises.push(addonitems);
			
			return promises;
		},
		/*
		 * Takes name, weight, active, id
		 * Weight, active, id can be undefined, but name must not be null, undefined.
		 */
		saveOrUpdateItemType: function(options) {
			let _itemType = new _ItemTypeRequestBody(options);
			return _saveOrUpdateItemType(_itemType);
		},
		saveOrUpdateItem: function(options) {
			let _item = new _ItemRequestBody(options);
			return _saveOrUpdateItem(_item);
		},
		getItemsGroupedByType: function() {
			if (!_data.itemsGroupedByType)	return null;
			
			return _data.itemsGroupedByType;
		},
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