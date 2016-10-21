var manageMenuComponent = {
	controller:
		function manageMenuCtrl(itemService, menuService) {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.itemGroups = itemService.getItems();
				ctrl.items = null;
				
				let defaultSizes = menuService.getManageMenuDefaultSizes();
				ctrl.numberOfTypes = defaultSizes.types;
				ctrl.numberOfItems = defaultSizes.items;
			}

			ctrl.selectItemType = function(index) {
				
				let _itemGroup = ctrl.itemGroups[index];
				ctrl.itemType = _itemGroup.type;
				ctrl.items = _itemGroup.items;
			}
		},
	template:'<div class="form-group col-xs-4 vertical-line-right">'
		+		'<manageitemtype item-groups="$ctrl.itemGroups" select-type="$ctrl.selectItemType(index)"></manageitemtype>'
		+	'</div>'
		+	'<div class="form-group col-xs-7">'
		+		'<manageitem items="$ctrl.items" item-type="$ctrl.itemType"></manageitem>'
		+	'</div>'
		+	'<div class="col-xs-1"></div>'
}