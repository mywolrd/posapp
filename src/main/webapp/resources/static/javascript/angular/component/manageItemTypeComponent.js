var manageItemTypeComponent = {
	controller:
		function manageItemTypeCtrl(itemService, menuService, utilsService) {
			var ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.pageSize = 10;
				ctrl.curPage = 0;
				ctrl.maxPageNum = utilsService.getMaxPageNum(ctrl.itemGroups, ctrl.pageSize);
			}
			
			ctrl.changePageNum = function(curPage) {
				ctrl.curPage = curPage;
			}
			
			ctrl.saveNewItemType = function() {
				itemService.saveOrUpdateItemType(ctrl.newItemTypeName);
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
	template:'<div class="col-xs-6 form-group">'
		+		'<input class="form-control font-20" type="text" data-ng-model="$ctrl.newItemTypeName" placeholder="New Item Type"/>'
		+	'</div>'
		+	'<div class="col-xs-2"></div><div class="col-xs-2"><button class="btn btn-primary" data-ng-click="$ctrl.saveNewItemType()">Save</button></div>'
		+	'<div class="item col-xs-12" data-ng-repeat="itemGroup in $ctrl.itemGroups | limitTo:$ctrl.pageSize:$ctrl.curPage*$ctrl.pageSize">'
		+		'<div class="col-xs-3"><input type="text" class="form-control font-20" data-ng-model="itemGroup.type.weight"/></div>'
		+		'<span class="col-xs-6" data-ng-click="$ctrl.selectItemType($index)">{{itemGroup.type.name}}</span>'
		+		'<span class="col-xs-1"></span>'
		+		'<input type="checkbox" "class="col-xs-1" data-ng-model="itemGroup.type.active"/>'
		+		'<span class="col-xs-1"></span>'
		+	'</div>'
		+	'<prevnextbuttons update-current-page="$ctrl.changePageNum(curPage)" max-page="$ctrl.maxPageNum"></prevnextbuttons>'
};