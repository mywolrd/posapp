var manageMenuComponent = {
	controller:
		function manageMenuCtrl(itemService, menuService) {
			var ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.itemGroups = itemService.getItems();
				ctrl.items = null;
				
				var defaultSizes = menuService.getManageMenuDefaultSizes();
				ctrl.numberOfTypes = defaultSizes.types;
				ctrl.numberOfItems = defaultSizes.items;
			}

			ctrl.updateItemType = function() {
				
			}
			
			ctrl.selectItemType = function(index) {
				ctrl.items = ctrl.itemGroups[index].items;
			}
		},
	template:'<div class="col-xs-1"></div>'
		+	'<div class="form-group col-xs-3 vertical-line-right">'
		+		'<manageitemtype item-groups="$ctrl.itemGroups" select-type="$ctrl.selectItemType(index)"></manageitemtype>'
		+	'</div>'
		+	'<div class="form-group col-xs-7">'
		+		'<manageitem items="$ctrl.items"></manageitem>'
		+	'</div>'
		+	'<div class="col-xs-1"></div>'
}