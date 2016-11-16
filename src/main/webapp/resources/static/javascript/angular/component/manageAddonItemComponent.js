let manageAddonItemComponent = {
	controller:
		function(keyboardService, itemService, menuService) {
			let ctrl = this,
				_name = 'name',
				_cent = 'cent',
				_dollar = 'dollar',
				_price = 'price';
			
			ctrl.$onInit = function() {
				ctrl.numberPadConfig = keyboardService.getNumberPad();
				ctrl.keyboardConfig = keyboardService.getKeyboard();
	
				_reset();
			}
			
			function _reset() {
				ctrl.newAddonItem = {};
				ctrl.addonItems = itemService.getAddonItems();
			}
			
			ctrl.save = function(name, value) {
				ctrl.newAddonItem[name] = value;
				
				if (_isCompleteAddonItem())
					itemService.saveOrUpdateAddonItem(ctrl.newAddonItem, _saveOrUpdateSuccess);
			}
			
			ctrl.update = function(name, value, index) {
				if (angular.isDefined(name) && angular.isDefined(value) && angular.isDefined(index)) {
					let _addonItem = angular.copy(ctrl.addonItems[index]);
					_addonItem[_cent] = _addonItem[_price][_cent];
					_addonItem[_dollar] = _addonItem[_price][_dollar];
					_addonItem[name] = value;
					
					delete _addonItem[_price];
					
					itemService.saveOrUpdateAddonItem(_addonItem, _saveOrUpdateSuccess);
				}
			}
			
			function _saveOrUpdateSuccess() {
				_reset();
			}
			
			function _isCompleteAddonItem() {
				return ctrl.newAddonItem[_name]
					&& ctrl.newAddonItem[_cent]
					&& ctrl.newAddonItem[_dollar];
			}
	},
	template:
			'<div class="form-group col-xs-12">'
		+		'<sw-input input-type="text" input-value="$ctrl.newAddonItem.name" input-name="name" on-update="$ctrl.save(name, value)"' 
		+			'span-width="4" font-size="20" keyboard-config="$ctrl.keyboardConfig" place-holder="New Addon Item" />'
		
		+		'<span class="col-xs-2"></span>'
		
		+		'<sw-input input-type="text" input-value="$ctrl.newAddonItem.dollar" input-name="dollar" on-update="$ctrl.save(name, value)"' 
		+			'span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig" place-holder="$" />'
		
		+		'<sw-input input-type="text" input-value="$ctrl.newAddonItem.cent" input-name="cent" on-update="$ctrl.save(name, value)"' 
		+			'span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig" place-holder="&#162;" />'
		
		+		'<span class="col-xs-2" />'		
		+	'</div>'
		
		+	'<item-list list="$ctrl.addonItems" pref-page-size="7" on-update="$ctrl.update(name, value, index)" />'
};