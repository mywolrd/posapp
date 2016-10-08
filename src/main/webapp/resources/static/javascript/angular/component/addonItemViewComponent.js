var addonItemViewComponent = {
	controller:
		function addonItemMenuCtrl(itemService, cartService, menuService) {
			var ctrl = this;
			
			ctrl.addonItems = null;
			ctrl.numberOfButtons = 4;
			ctrl.begin = 0;
			
			ctrl.$onInit = function() {
				ctrl.addonItems = menuService.getAddonItemMenu();					
				setCurrentAddonItems();
			}
	
			ctrl.itembuttonAction = function(addonItem) {
				if (!cartService.isEmpty()) {
					cartService.addItem(addonItem);
				}
			}
			
			ctrl.moveLeft = function() {
				if (ctrl.begin > 0) {
					ctrl.begin -= 1;
	
					setCurrentAddonItems();
				}
			}
	
			ctrl.moveRight = function() {
				var end = ctrl.begin + ctrl.numberOfButtons;
				if (end < ctrl.addonItems.length) {
					ctrl.begin += 1;
	
					setCurrentAddonItems();
				}
			}
			
			function setCurrentAddonItems() {
				ctrl.addonItemsCurrent = ctrl.addonItems.slice(ctrl.begin, ctrl.begin + ctrl.numberOfButtons);
			}
		},
	template:'<table class="table borderless">'
		+		'<tbody>'
		+ 			'<tr>'
		+ 				'<td class="col-xs-1"><button class="btn-block" data-ng-click="$ctrl.moveLeft()"><</button></td>'
		+ 				'<td class="col-xs-1"></td>'
		+ 				'<td class="col-xs-2" data-ng-repeat="addonItem in $ctrl.addonItemsCurrent">'
		+ 					'<button class="btn-block" data-ng-click="$ctrl.itembuttonAction(addonItem)">{{addonItem.itemName}}</button>'
		+ 				'</td>'
		+ 				'<td class="col-xs-1"></td>'
		+ 				'<td class="col-xs-1"><button class="btn-block" data-ng-click="$ctrl.moveRight()">></button></td>'
		+ 			'<tr>'
		+		'</tbody>'
		+ 	'</table>'

}