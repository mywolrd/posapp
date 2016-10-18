/**
 * Item Service
 */
function itemService(APP_CONFIG, $http, urlService) {
	var _data = {};

	function _groupItemsByType(itemTypes, items) {
		var groupedItems = items.reduce(function(dict, currentItem) {
			dict[currentItem['itemTypeId']] = dict[currentItem['itemTypeId']] || [];
			dict[currentItem['itemTypeId']].push(currentItem);
			return dict;
		}, {});
		
		var i, len;
		var groupedByType = [];
		for (i=0, len=itemTypes.length; i < len; i++) {
			var itemType = itemTypes[i];
			var obj = {
					type: itemType,
					items: groupedItems[itemType.id]
				};
			groupedByType.push(obj);
		}
		_data.itemTypes = itemTypes;
		_data.items = groupedByType;
		return groupedByType;
	}

	function sortByWeight(a, b) {
		if (!angular.isDefined(a.weight) && !angular.isDefined(b.weight))
			return 0;
		
		var weight_a = new Number(a.weight);
		var weight_b = new Number(b.weight);
		
		if (a.weight < b.weight) {
			return -1;
		}
		
		if (a.weight > b.weight) {
			return 1;
		}
		
		return 0;
	}
	
	function _ajaxGetItems() {
		return $http.get(urlService.item + '/list');
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
		$http.post(urlService.item + '/type', itemType)
		.then(function success(){
		}, function error() {
		} );
	}
	
	return {
		groupItemsByType: function(itemTypes, items) {
			return _groupItemsByType(itemTypes, items);
		},
		getAJAXItemPromises: function() {
			var promises = [];
			
			var itemTypes = _ajaxGetItemTypes();
			if (itemTypes)	promises.push(itemTypes);
			
			var items = _ajaxGetItems();
			if (items)	promises.push(items);
			
			//var addonitems = _ajaxGetAddOnItems();
			//if (addonitems)	promises.push(addonitems);
			
			return promises;
		},
		/*
		 * Takes name, weight, active, id
		 * Weight, active, id can be undefined, but name must not be null, undefined.
		 */
		saveOrUpdateItemType: function(name, weight, active, id) {
			var itemType = new _ItemTypeRequestBody(name, weight, active, id);
			return _saveOrUpdateItemType(itemType);
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

class _ItemTypeRequestBody {
	constructor(name, weight, active, id) {
		this.name = name;
		this.weight = angular.isDefined(weight) ? weight:0;
		this.active = angular.isDefined(active) ? active:true;
		this.id = angular.isDefined(id) ? id:0;
	}
}