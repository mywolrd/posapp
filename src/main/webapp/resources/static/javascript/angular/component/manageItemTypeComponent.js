var manageItemTypeComponent = {
	controller:
		function manageItemTypeCtrl(itemService, menuService, utilsService, keyboardService) {
			var ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.pageSize = 10;
				ctrl.curPage = 0;
				ctrl.maxPageNum = utilsService.getMaxPageNum(ctrl.itemGroups, ctrl.pageSize);
				
				ctrl.numberPadConfig = keyboardService.getNumberPad();
				ctrl.keyboardConfig = keyboardService.getKeyboard();
			}
			
			ctrl.changePageNum = function(curPage) {
				ctrl.curPage = curPage;
			}
			
			ctrl.saveNewItemType = function() {
				itemService.saveOrUpdateItemType({name: ctrl.newItemTypeName});
			}
			
			ctrl.updateItemType = function() {
			}
			
			ctrl.selectItemType = function(index) {
				ctrl.selectType({index: index});
			}
		},
	bindings: {
		itemGroups: '<',
		selectType: '&'
	},
	template:
		
			'<div class="form-group col-xs-12">'
		+		'<sw-input input-model="$ctrl.newItemTypeName" span-width="7" font-size="20" keyboard-config="$ctrl.keyboardConfig" place-holder="New Item Type"></sw-input>'
		+		'<span class="col-xs-1"></span>'
		+		'<span class="col-xs-2 no-padding"><button class="btn btn-primary btn-block" data-ng-click="$ctrl.saveNewItemType()">Save</button></span>'		
		+	'</div>'
		
		+	'<div class="item col-xs-12" data-ng-repeat="itemGroup in $ctrl.itemGroups | limitTo:$ctrl.pageSize:$ctrl.curPage*$ctrl.pageSize">'
		+		'<div class="col-xs-3"><input type="text" class="form-control font-20" data-ng-model="itemGroup.type.weight" data-ng-virtual-keyboard="{kt:' + "'Number_Pad'" + ', relative: false, size: 5}"/></div>'
		+		'<span class="col-xs-6" data-ng-click="$ctrl.selectItemType($index)">{{itemGroup.type.name}}</span>'
		+		'<span class="col-xs-1"></span>'
		+		'<input type="checkbox" "class="col-xs-1" data-ng-model="itemGroup.type.active"/>'
		+		'<span class="col-xs-1"></span>'
		+	'</div>'
		+	'<prevnextbuttons update-current-page="$ctrl.changePageNum(curPage)" max-page="$ctrl.maxPageNum"></prevnextbuttons>'
};