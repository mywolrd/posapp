let menuComponent = {
	controller:
		function itemMenuCtrl(menuService, cartService) {
			let ctrl = this;
			
			ctrl.items = null;
			ctrl.mainItems = null;
			
			ctrl.$onInit = function() {
				ctrl.mainItems = menuService.getMainItemMenu();
				ctrl.items = ctrl.mainItems;
			}
			
			ctrl.click = function(item) {
				if (item.submenu) {
					ctrl.typeName = item.name;
					ctrl.items = item.submenu;
				} else {
					cartService.addItem(ctrl.typeName, item);
					_showMainItems();
					ctrl.typeName = null;
				}
			}
			
			ctrl.showMainitems = function() {
				_showMainItems()
			}
			
			function _showMainItems() {
				if (ctrl.items !== ctrl.mainItems)				
					ctrl.items = ctrl.mainItems;
			}
		},
	template:
			'<div class="col-xs-12 menu-row">'
		+		'<sw-button button-class="btn-primary" do-click="$ctrl.showMainitems()" span-width="3" button-name="Back"/>'
		+		'<span class="col-xs-3" />'
		+		'<span class="col-xs-3" />'
		+		'<sw-button button-class="btn-primary" span-width="3" button-name="Order"/>'		
		+	'</div>'
		+	'<div class="col-xs-12 menu-row" data-ng-repeat="row in $ctrl.items">'
		+		'<sw-button button-class="btn-default" span-width="3" data-ng-repeat="item in row" '
		+			'do-click="$ctrl.click(item)" button-name="{{item.name}}"/>'
		+	'</div>'
		//+ 	'<addonitemview></addonitemview>'
}