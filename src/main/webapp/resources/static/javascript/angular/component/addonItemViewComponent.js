let addonItemsComponent = {
	controller:
		function addonItemMenuCtrl(itemService, cartService) {
			let ctrl = this,
				_numberOfButtons = 4,
				_begin = 0;
						
			ctrl.$onInit = function() {
				ctrl.addonItems = itemService.getAddonItems();					
				setCurrentAddonItems();
			}
	
			ctrl.click = function(addonItem) {
				if (!cartService.isEmpty()) {
					cartService.addItem(null, addonItem);
				}
			}
			
			ctrl.moveLeft = function() {
				if (_begin > 0) {
					_begin -= _numberOfButtons;
	
					setCurrentAddonItems();
				}
			}
	
			ctrl.moveRight = function() {
				let end = _begin + _numberOfButtons;
				if (end < ctrl.addonItems.length) {
					_begin += _numberOfButtons;
	
					setCurrentAddonItems();
				}
			}
			
			function setCurrentAddonItems() {
				ctrl.currentAddonItems = ctrl.addonItems.slice(_begin, _begin + _numberOfButtons);
			}
		},
	template:
			'<div class="col-xs-12 addon-item-row">'
		+		'<div class="col-xs-3 addon-item-nav">'
		+			'<sw-button button-class="btn-primary" span-width="12" do-click="$ctrl.moveLeft()" button-name="<"/>'
		+		'</div>'
		+		'<div class="col-xs-6 addon-item-menu">'
		+			'<sw-button data-ng-repeat="addonItem in $ctrl.currentAddonItems" button-class="btn-default" span-width="6" do-click="$ctrl.click(addonItem)" button-name="{{addonItem.name}}"/>'
		+		'</div>'
		+		'<div class="col-xs-3 addon-item-nav">'
		+			'<sw-button button-class="btn-primary" span-width="12" do-click="$ctrl.moveRight()" button-name=">"/>'
		+		'</div>'
		+	'</div>'

}