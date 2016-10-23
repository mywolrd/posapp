let manageItemTypeComponent = {
	controller:
		function manageItemTypeCtrl(itemService, menuService, utilsService, keyboardService) {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.pageSize = 10;
				ctrl.curPage = 0;
				ctrl.maxPageNum = utilsService.getMaxPageNum(ctrl.itemGroups, ctrl.pageSize);
				
				ctrl.numberPadConfig = keyboardService.getNumberPad();
				ctrl.keyboardConfig = keyboardService.getKeyboard();

				ctrl.itemTypes = ctrl.parentCtrl.itemTypes;
			}
			
			ctrl.saveNewItemType = function() {
				itemService.saveOrUpdateItemType({name: ctrl.newItemTypeName});
			}
			
			ctrl.updateItemType = function() {
			}
			
			ctrl.selectItemType = function(index) {
				ctrl.parentCtrl.selectItemType(index);
			}
			
			ctrl.deselectItemType = function() {
				
			}
		},
	require: {
		parentCtrl: '^^managemenu'
	},
	template:
			'<div class="form-group col-xs-12">'
		+		'<sw-input input-model="$ctrl.newItemTypeName" span-width="7" font-size="20" keyboard-config="$ctrl.keyboardConfig" place-holder="New Item Type"></sw-input>'
		+		'<span class="col-xs-1" />'
		+		'<sw-button span-width="2" button-name="Save" do-click="$ctrl.saveNewItemType()"/>'	
		+	'</div>'
		
		+	'<item-type-list/>'
};

let editSelectedItemType = {
	controller:
		function() {
		
		},
	bindins: {
		
	},
	require: {
		
	},
	template:
			'<>'
		+	'<>'
}

let itemTypeListComponent = {
	controller: 
		function(utilsService) {
			let ctrl = this;
	
			ctrl.$onInit = function() {
				ctrl.pageSize = 10;
				ctrl.curPage = 0;
				ctrl.items = ctrl.parentCtrl.itemTypes;
				ctrl.maxPageNum = utilsService.getMaxPageNum(ctrl.items, ctrl.pageSize);

				ctrl.numberPadConfig = ctrl.parentCtrl.numberPadConfig;
			}
				
			ctrl.changePageNum = function(curPage) {
				ctrl.curPage = curPage;
			}
				
			ctrl.selectItemType = function(index) {
				ctrl.parentCtrl.selectItemType(index);
			}
		},
	require: {
		parentCtrl: '^^manageitemtype'
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