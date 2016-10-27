let manageMenuComponent = {
	controller:
		function manageMenuCtrl(itemService) {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.items = itemService.getItems();
				
				ctrl.currentItems = null;
				ctrl.currentItemType = null;
			}

			ctrl.setItems = function(type) {
				if (!type) {
					ctrl.currentItemType = null;
					ctrl.currentItems = null;
				} else {
					ctrl.currentItemType = type;
					ctrl.currentItems = ctrl.items.get(type.id);
				}
			}
		},
	template:'<div class="form-group col-xs-5">'
		+		'<manageitemtype set-items="$ctrl.setItems(type)"/>'
		+	'</div>'
		+	'<div class="form-group col-xs-7">'
		+		'<manageitem data-ng-if="$ctrl.currentItemType" items="$ctrl.currentItems" item-type="$ctrl.currentItemType"></manageitem>'
		+	'</div>'
}