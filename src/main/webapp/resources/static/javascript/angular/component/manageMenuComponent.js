var manageMenuComponent = {
	controller:
		function manageMenuCtrl() {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.items = null;
				ctrl.currentItemType = null;
			}

			ctrl.setItems = function(itemsGroupedByType) {
				ctrl.currentItemType = itemsGroupedByType.type;
				ctrl.items = itemsGroupedByType.items;
			}
		},
	template:'<div class="form-group col-xs-4 vertical-line-right">'
		+		'<manageitemtype set-items="$ctrl.setItems(itemsGroupedByType)"/>'
		+	'</div>'
		+	'<div class="form-group col-xs-7">'
		+		'<manageitem items="$ctrl.items" item-type="$ctrl.currentItemType"></manageitem>'
		+	'</div>'
		+	'<div class="col-xs-1"></div>'
}