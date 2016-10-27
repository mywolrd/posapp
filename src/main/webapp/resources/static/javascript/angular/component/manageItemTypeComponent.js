let manageItemTypeComponent = {
	controller:
		function manageItemTypeCtrl(itemService, menuService, utilsService, keyboardService) {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.numberPadConfig = keyboardService.getNumberPad();
				ctrl.keyboardConfig = keyboardService.getKeyboard();

				ctrl.itemTypes = itemService.getItemTypes();
				ctrl.items = itemService.getItems();
			}
			
			ctrl.saveNewItemType = function() {
				itemService.saveOrUpdateItemType({name: ctrl.newItemTypeName});
			}
			
			ctrl.updateItemType = function() {
				itemService.saveOrUpdateItemType(ctrl.currentItemType);
			}
			
			ctrl.unselectItemType = function() {
				ctrl.currentItemType = null;
				ctrl.setItems({type: ctrl.currentItemType});
			}
			
			ctrl.selectItemType = function(index) {
				ctrl.currentItemType = ctrl.itemTypes[index];
				ctrl.setItems({type: ctrl.currentItemType});
			}
		},
	bindings: {
		setItems: '&'
	},
	template:
			'<div class="form-group col-xs-12">'
		+		'<sw-input input-model="$ctrl.newItemTypeName" span-width="7" font-size="20" keyboard-config="$ctrl.keyboardConfig" place-holder="New Item Type"></sw-input>'
		+		'<span class="col-xs-1" />'
		+		'<sw-button button-class="btn-primary" span-width="2" button-name="Save" do-click="$ctrl.saveNewItemType()"/>'	
		+	'</div>'
		
		+	'<div class="form-group col-xs-12" data-ng-if="$ctrl.currentItemType">'
		+		'<span class="col-xs-12" />'
		+		'<sw-input input-model="$ctrl.currentItemType.name" span-width="7" font-size="20" keyboard-config="$ctrl.keyboardConfig" />'
		+		'<span class="col-xs-12" />'
		+		'<span class="col-xs-2"/>'
		+		'<sw-button button-class="btn-default" span-width="3" button-name="Back" do-click="$ctrl.unselectItemType()" />'
		+		'<span class="col-xs-2"/>'
		+		'<sw-button button-class="btn-primary" span-width="3" button-name="Update" do-click="$ctrl.updateItemType()" />'
		+		'<span class="col-xs-2"/>'
		+	'</div>'
		+	'<item-type-list data-ng-if="!$ctrl.currentItemType" item-types="$ctrl.itemTypes" do-click="$ctrl.selectItemType(index)"/>'
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
				ctrl.doClick({index: index});
			}
		},
	bindings: {
		itemTypes: '<',
		doClick: '&'
	},
	template: 
			'<div class="item col-xs-12" data-ng-repeat="itemType in $ctrl.itemTypes | limitTo:$ctrl.pageSize:$ctrl.curPage*$ctrl.pageSize">'
		+		'<sw-input input-model="itemType.weight" span-width="3" font-size="20" keyboard-config="$ctrl.numberPadConfig"></sw-input>'
		+		'<span class="col-xs-6" data-ng-click="$ctrl.selectItemType($index)">{{itemType.name}}</span>'
		+		'<span class="col-xs-1" />'
		+		'<input type="checkbox" "class="col-xs-1" data-ng-model="itemType.active"/>'
		+		'<span class="col-xs-1" />'
		+	'</div>'
		+	'<pn-buttons update-current-page="$ctrl.changePageNum(curPage)" max-page="$ctrl.maxPageNum" />'
};