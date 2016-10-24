let manageItemTypeComponent = {
	controller:
		function manageItemTypeCtrl(itemService, menuService, utilsService, keyboardService) {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.numberPadConfig = keyboardService.getNumberPad();
				ctrl.keyboardConfig = keyboardService.getKeyboard();

				ctrl.itemTypes = itemService.getItemsGroupedByType();
			}
			
			ctrl.saveNewItemType = function() {
				itemService.saveOrUpdateItemType({name: ctrl.newItemTypeName});
			}
			
			ctrl.updateItemType = function() {
			}
			
			ctrl.deselectItemType = function() {
				
			}
			
			ctrl.selectItemType = function(itemsGroupedByType) {
				ctrl.setItems({itemsGroupedByType: itemsGroupedByType});
			}
		},
	bindings: {
		setItems: '&'
	},
	template:
			'<div class="form-group col-xs-12">'
		+		'<sw-input input-model="$ctrl.newItemTypeName" span-width="7" font-size="20" keyboard-config="$ctrl.keyboardConfig" place-holder="New Item Type"></sw-input>'
		+		'<span class="col-xs-1" />'
		+		'<sw-button span-width="2" button-name="Save" do-click="$ctrl.saveNewItemType()"/>'	
		+	'</div>'
		
		+	'<item-type-list items="$ctrl.itemTypes" do-click="$ctrl.selectItemType(itemsGroupedByType)"/>'
};

let editSelectedItemType = {
	controller:
		function() {
		
		},
	bindings: {
		
	},
	require: {
		
	},
	template:
			'<div class="col-xs-12">'
		+		'<sw-input input-model="$ctrl.newItemTypeName" span-width="7" font-size="20" keyboard-config="$ctrl.keyboardConfig" place-holder="New Item Type"></sw-input>'
		+	'</div>'
}

let itemTypeListComponent = {
	controller: 
		function(utilsService, keyboardService) {
			let ctrl = this;
	
			ctrl.$onInit = function() {
				ctrl.pageSize = 10;
				ctrl.curPage = 0;
				ctrl.maxPageNum = utilsService.getMaxPageNum(ctrl.items, ctrl.pageSize);
				ctrl.numberPadConfig = keyboardService.getNumberPad();
			}
				
			ctrl.changePageNum = function(curPage) {
				ctrl.curPage = curPage;
			}
				
			ctrl.selectItemType = function(index) {
				let _itemsGroupedByType = ctrl.items[index];
				ctrl.doClick({itemsGroupedByType: _itemsGroupedByType});
			}
		},
	bindings: {
		items: '<',
		doClick: '&'
	},
	template: 
			'<div class="item col-xs-12" data-ng-repeat="item in $ctrl.items | limitTo:$ctrl.pageSize:$ctrl.curPage*$ctrl.pageSize">'
		+		'<sw-input input-model="item.type.weight" span-width="3" font-size="20" keyboard-config="$ctrl.numberPadConfig"></sw-input>'
		+		'<span class="col-xs-6" data-ng-click="$ctrl.selectItemType($index)">{{item.type.name}}</span>'
		+		'<span class="col-xs-1" />'
		+		'<input type="checkbox" "class="col-xs-1" data-ng-model="item.type.active"/>'
		+		'<span class="col-xs-1" />'
		+	'</div>'
		+	'<pn-buttons update-current-page="$ctrl.changePageNum(curPage)" max-page="$ctrl.maxPageNum" />'
};