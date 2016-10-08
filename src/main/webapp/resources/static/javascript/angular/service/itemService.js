/**
 * Item Service
 */
function itemService(APP_CONFIG, $http, urlService) {
	var _data = {};

	function _groupItemsByType(items) {	
		var groupedItems = {};
		var i, len;
		
		for (i=0, len=items.length; i < len; i++) {
			var item = angular.copy(items[i]);
			if (item.itemType) {
				var itemType = item.itemType.name;
				var groupedByType = groupedItems[itemType];
				
				if (!groupedByType) {
					groupedByType = [];
				}
				var itemCopy = angular.copy(item);
				groupedByType.push(itemCopy);
				groupedItems[itemType] = groupedByType;
			}
		}
		
		var listItems = [];
		
		for (key in groupedItems) {
			var groupedByType = groupedItems[key];
			groupedByType.sort(sortByWeight);
			
			var itemType = null;
			if (groupedByType.length > 0) {
				itemType = groupedByType[0].itemType;
			}
			
			var obj = {
				type: itemType,
				items: groupedByType
			};
			listItems.push(obj);
		}
		
		listItems.sort(function(a, b) {
			return sortByWeight(a.type, b.type);
		});
		
		_data.items = listItems;
		return listItems;
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
	
	function _ajaxGetAddOnItems() {
		if (APP_CONFIG.SHOW_ADD_ON_ITEMS) {
			return $http.get(urlService.item + '/addonitem/list');
		}
		return null;
	}
	
	return {
		groupItemsByType: function(items) {
			return _groupItemsByType(items);
		},
		getAJAXItemPromises: function() {
			var promises = [];
			
			var items = _ajaxGetItems();
			if (items)
				promises.push(items);
			
			//var addonitems = _ajaxGetAddOnItems();
			//if (addonitems)
				//promises.push(addonitems);
			
			return promises;
		},
		getItems: function() {
			if (!_data.items) {
				return null;
			}			
			return _data.items;
		},
		getAddOnItems: function() {
			if (!_data.addonitems) {
				return null;
			}			
			return _data.addonitems;
		}
	};
}