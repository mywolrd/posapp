function menuService(APP_CONFIG, $q, navigationService, itemService) {
	
	var _data = {};
	var refreshMenu = false;
	var IS_MENU_READY = false;
	
	function _initMenu() {
		var promises = itemService.getAJAXItemPromises();
		
		$q.all(promises).then(
			function(res) {
				var itemsRes = res[0];
				var items = itemsRes.data;
				var groupedByType = itemService.groupItemsByType(items);
				_buildItemMenu(groupedByType);
			
				_data.addonitems = [ {
					itemName : 'Button1',
					price : {
						dollar : 5,
						cent : 0
					}
					}, {
						itemName : 'Button2',
						price : {
							dollar : 5,
							cent : 0
						}
					}, {
						itemName : 'Button3',
						price : {
							dollar : 5,
							cent : 0
						}
					}, {
						itemName : 'Button4',
						price : {
							dollar : 5,
							cent : 0
						}
					}, {
						itemName : 'Button5',
						price : {
							dollar : 5,
							cent : 0
						}
					}, {
						itemName : 'Button6',
						price : {
							dollar : 5,
							cent : 0
						}
					}, {
						itemName : 'Button7',
						price : {
							dollar : 5,
							cent : 0
						}
					} ];
				
				navigationService.setReady(true);
			}, function(res) {
				//GET request failed
			});
	}
	
	function _buildItemMenuGrid(items, numberOfItems) {
		var itemMenu = [];
		var row = [];
		var i, len;
		
		for (i=0, len=items.length; i < len; i++) {
			var item = items[i];
			row.push(item);

			if (((i + 1) % numberOfItems) == 0 || i == (len - 1)) {
				itemMenu.push(row);
				row = [];
			}			
		}
		return itemMenu;
	}
	
	function _buildItemMenu(items) {
		var itemMenu = [];
		var i, len;
		for (i=0, len=items.length; i < len; i++) {

			var submenu = items[i].items;
			var item = {name: items[i].type.name, submenu: _buildItemMenuGrid(submenu, 5)};
			
			itemMenu.push(item);
		}
		
		var mainItemMenu = _buildItemMenuGrid(itemMenu, 5);
		_data.mainItemMenu = mainItemMenu;
	}
	
	return {
		isPriceLocked: function() {
			return APP_CONFIG.IS_PRICE_LOCKED;
		},
		getNumberOfAddonItemButtons: function() {
			return APP_CONFIG.NUMBER_OF_ADDON_ITEM_BUTTONS;
		},
		initMenu: function() {
			if (!IS_MENU_READY) {
				_initMenu();
			}
		},
		isMenuReady: function() {
			return IS_MENU_READY;
		},
		getMainItemMenu: function() {
			if (_data.mainItemMenu)
				return _data.mainItemMenu;
			
			return null;
		},
		getAddonItemMenu: function() {
			if (_data.addonitems)
				return _data.addonitems;
			
			return null;
		},
		getManageMenuDefaultSizes: function() {
			return {
				types: APP_CONFIG.MANAGE_MENU_DEFAULT_NUMBER_OF_TYPES,
				items: APP_CONFIG.MANAGE_MENU_DEFAULT_NUMBER_OF_ITEMS
			};
		}
	};
}
