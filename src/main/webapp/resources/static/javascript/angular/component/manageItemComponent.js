let manageItemComponent = {
	controller:
		function manageItemCtrl(itemService, menuService, keyboardService) {
			let ctrl = this,
				_name = "name",
				_cent = "cent",
				_dollar = "dollar",
				_itemTypeId = "itemTypeId",
				_price = "price";
				
			
			ctrl.$onInit = function() {
				ctrl.numberPadConfig = keyboardService.getNumberPad();
				ctrl.keyboardConfig = keyboardService.getKeyboard();
				
				_reset();
			}
			
			ctrl.$onChanges = function(changesObj) {
				_reset();
			}
			
			ctrl.saveItem = function(name, value) {
				ctrl.newItem[name] = value;				
				//Meh...
				ctrl.newItemName = ctrl.newItem[_name];
				ctrl.dollar = ctrl.newItem[_dollar];
				ctrl.cent = ctrl.newItem[_cent];
				
				if (_isCompleteItem())
					itemService.saveOrUpdateItem(ctrl.newItem, _saveOrUpdateSuccess);
			}
			
			ctrl.update = function(name, value, index) {
				if (angular.isDefined(name) && angular.isDefined(value) && angular.isDefined(index)) {
					let _item = angular.copy(ctrl.items[index]);
					_item[_cent] = _item[_price][_cent];
					_item[_dollar] = _item[_price][_dollar];
					_item[name] = value;
					delete _item[_price];
					
					itemService.saveOrUpdateItem(_item, _saveOrUpdateSuccess);
				}
			}
			
			function _saveOrUpdateSuccess() {
				_reset();
				menuService.refreshMenu();
				ctrl.updateItems();
			}
			
			function _reset() {
				ctrl.newItem = {};
				ctrl.newItem[_itemTypeId] = ctrl.itemType.id;
				
				ctrl.newItemName = null;
				ctrl.dollar = null;
				ctrl.cent = null;
			}
			
			function _isCompleteItem() {
				return ctrl.newItem[_name] 
					&& ctrl.newItem[_cent] 
					&& ctrl.newItem[_dollar] 
					&& ctrl.newItem[_itemTypeId];
			}
		},
	bindings: {
		items: '<',
		itemType: '<',
		updateItems: '&'
	},
	template:
			'<div class="form-group col-xs-12">'
		+		'<span class="col-xs-12">{{$ctrl.itemType.name}}</span>'
		+		'<sw-input input-type="text" input-value="$ctrl.newItemName" input-name="name" on-update="$ctrl.saveItem(name, value, index)"' 
		+			'span-width="4" font-size="20" keyboard-config="$ctrl.keyboardConfig" place-holder="New Item" />'
		
		+		'<span class="col-xs-2"></span>'
		
		+		'<sw-input input-type="text" input-value="$ctrl.dollar" input-name="dollar" on-update="$ctrl.saveItem(name, value, index)"' 
		+			'span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig" place-holder="$" />'
		
		+		'<sw-input input-type="text" input-value="$ctrl.cent" input-name="cent" on-update="$ctrl.saveItem(name, value, index)"' 
		+			'span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig" place-holder="&#162;" />'
		
		+		'<span class="col-xs-2" />'		
		+	'</div>'

		+	'<div data-ng-if="!$ctrl.items"><span>No Items for {{$ctrl.itemType.name}}</span></div>'
		
		+	'<item-list list="$ctrl.items" pref-page-size="7" on-update="$ctrl.update(name, value, index)" />'
};

let itemListComponent = {
	controller: editListComponentCtrl,
	bindings: {
		list: '<',
		doClick: '&',
		onUpdate: '&',
		prefPageSize: '@'
	},
	template: 
			'<div class="item col-xs-12" data-ng-repeat="item in $ctrl.list | limitTo:$ctrl.pageSize:$ctrl.curPage*$ctrl.pageSize">'
		+		'<item item="item" item-index="$index" do-click="$ctrl.select(index)" on-update="$ctrl.update(name, value, index)" />'
		+	'</div>'
		+	'<pn-buttons cur-page="$ctrl.curPage" update-current-page="$ctrl.changePageNum(curPage)" max-page="$ctrl.maxPageNum" />'
}

let editItemComponent = {
	controller:
		function(keyboardService) {
			let ctrl = this;
		
			ctrl.$onInit = function() {
				ctrl.numberPadConfig = keyboardService.getNumberPad();
				ctrl.keyboardConfig = keyboardService.getKeyboard();
			}

			ctrl.update = function(name, value, index) {
				ctrl.onUpdate({name: name, value: value, index: index});
			}
		},
	bindings: {
		item: '<',
		itemIndex: '<',
		onUpdate: '&'
	},
	template:
			'<sw-input input-type="text" input-value="$ctrl.item.weight" input-name="weight" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig"></sw-input>'
		
		+	'<sw-input input-type="text" input-value="$ctrl.item.name" input-name="name" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="4" font-size="20" keyboard-config="$ctrl.keyboardConfig"></sw-input>'
		
		+	'<span class="col-xs-1" />'
		
		+	'<sw-input input-type="text" input-value="$ctrl.item.price.dollar" input-name="dollar" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig"></sw-input>'
		
		+	'<sw-input input-type="text" input-value="$ctrl.item.price.cent" input-name="cent" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig"></sw-input>'
		
		+	'<sw-input input-type="checkbox" input-value="$ctrl.item.active" input-name="active" on-update="$ctrl.update(name, value, index)"'
		+		'item-index="$ctrl.itemIndex" span-width="1" />'

}