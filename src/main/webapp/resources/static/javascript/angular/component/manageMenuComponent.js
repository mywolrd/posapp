let manageMenuComponent = {
	controller:
		function manageMenuCtrl(itemService) {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.items = itemService.getItems();
				
				ctrl.currentItems = null;
				ctrl.currentItemType = null;
				
				ctrl.showAddonItems = false;
				ctrl.showItems = !ctrl.showAddonItems ;
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
			
			ctrl.updateItems = function() {
				ctrl.items = itemService.getItems();
				ctrl.currentItems = ctrl.items.get(ctrl.currentItemType.id);
			}

			ctrl.changeView = function() {
				ctrl.showAddonItems = !ctrl.showAddonItems;
				ctrl.showItems = !ctrl.showAddonItems;
			}
		},
	template:
			'<div class="form-group col-xs-12">'
		+		'<div class="form-group col-xs-6 manage-menu-buttons">'
		+			'<sw-button button-class="btn-primary" span-width="2" button-name="Items" do-click="$ctrl.changeView()"/>'	
		+			'<span class="col-xs-4"/>'
		+			'<sw-button button-class="btn-primary" span-width="4" button-name="Addon Items" do-click="$ctrl.changeView()"/>'
		+		'</div>'
		+	'</div>'
		
		+	'<div class="form-group col-xs-7" data-ng-if="$ctrl.showAddonItems">'
		+		'<manageaddon />'
		+	'</div>'
		
		+	'<div class="form-group col-xs-5" data-ng-if="$ctrl.showItems">'
		+		'<manageitemtype set-items="$ctrl.setItems(type)"/>'
		+	'</div>'
		
		+	'<div class="form-group col-xs-7" data-ng-if="$ctrl.showItems">'
		+		'<manageitem data-ng-if="$ctrl.currentItemType" items="$ctrl.currentItems"' 
		+			'update-items="$ctrl.updateItems()" item-type="$ctrl.currentItemType"></manageitem>'
		+	'</div>'
}