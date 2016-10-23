var manageMenuComponent = {
	controller:
		function manageMenuCtrl(itemService, menuService) {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.itemTypes = itemService.getItems();
				ctrl.items = null;
				
				let defaultSizes = menuService.getManageMenuDefaultSizes();
				ctrl.numberOfTypes = defaultSizes.types;
				ctrl.numberOfItems = defaultSizes.items;
			}

			ctrl.selectItemType = function(index) {
				let _itemType = ctrl.itemTypes[index];
				ctrl.itemType = _itemType.type;
				ctrl.items = _itemType.items;
			}
		},
	template:'<div class="form-group col-xs-4 vertical-line-right">'
		+		'<manageitemtype/>'
		+	'</div>'
		+	'<div class="form-group col-xs-7">'
		+		'<manageitem items="$ctrl.items" item-type="$ctrl.itemType"></manageitem>'
		+	'</div>'
		+	'<div class="col-xs-1"></div>'
}