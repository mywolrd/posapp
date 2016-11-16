function menuService(APP_CONFIG, $q, navigationService, itemService) {
	
	let _data = {};
	let IS_MENU_READY = false;
	
	function _initMenu() {
		let promises = itemService.getAJAXItemPromises();
		$q.all(promises).then(
			function(res) {

				itemService.setItemTypes(res[0].data);
				itemService.setItems(res[1].data);
				itemService.setAddonItems(res[2].data);
				
				_buildItemMenu();
				
				navigationService.setReady(true);
			}, function(res) {
				//GET request failed
			});
	}
	
	function _buildItemMenuGrid(items, numberOfItems) {
		let itemMenu = [],
			row = [];
		
		for (let i=0, len=items.length; i < len; i++) {
			let item = items[i];
			row.push(item);

			if (((i + 1) % numberOfItems) == 0 || i == (len - 1)) {
				itemMenu.push(row);
				row = [];
			}			
		}
		return itemMenu;
	}
	
	function _buildItemMenu() {
		let itemMenu = [],
			itemTypes = itemService.getItemTypes(),
			items = itemService.getItems();
		
		for (let i=0, len=itemTypes.length; i < len; i++) {
			let _itemsByType = items.get(itemTypes[i].id);
			if (_itemsByType) {
				itemMenu.push({	name: itemTypes[i].name, 
								submenu: _buildItemMenuGrid(_itemsByType, APP_CONFIG.NUMBER_OF_BUTTONS_PER_ROW)});				
			}
		}
		
		let mainItemMenu = _buildItemMenuGrid(itemMenu, APP_CONFIG.NUMBER_OF_BUTTONS_PER_ROW);
		_data.mainItemMenu = mainItemMenu;
	}
	
	function _isPriceLocked () {
		return APP_CONFIG.IS_PRICE_LOCKED;
	}
	
	return {
		isPriceLocked: _isPriceLocked,
		getNumberOfAddonItemButtons: function() {
			return APP_CONFIG.NUMBER_OF_ADDON_ITEM_BUTTONS;
		},
		initMenu: function() {
			if (!IS_MENU_READY) {
				_initMenu();
			}
		},
		refreshMenu: function() {
			_buildItemMenu();
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
