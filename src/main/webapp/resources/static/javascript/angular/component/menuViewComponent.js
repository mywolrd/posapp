var menuViewComponent = {
	controller:
		function itemMenuCtrl(menuService, cartService) {
			var ctrl = this;
			
			ctrl.items = null;
			ctrl.mainItemName = null;
			
			ctrl.$onInit = function() {
				ctrl.mainItemMenu = menuService.getMainItemMenu();
				ctrl.itemMenu = ctrl.mainItemMenu;
			}
			
			ctrl.itembuttonAction = function(item) {
				if (item.submenu) {
					ctrl.mainItemName = item.name;
					ctrl.itemMenu = item.submenu;
				} else {
					cartService.addItem(item);
					showMainItemMenu();
					ctrl.mainItemName = null;
				}
			}
			
			function showMainItemMenu() {
				ctrl.itemMenu = ctrl.mainItemMenu;
			}
		},
	template:'<table class="table borderless">'
		+ 		'<tbody>'
		+ 			'<tr data-ng-repeat="items in $ctrl.itemMenu">'
		+ 				'<td class="col-xs-2" data-ng-repeat="item in items">'
		+ 					'<button class="btn-block" data-ng-click="$ctrl.itembuttonAction(item)">{{item.name}}</button>'
		+ 				'</td>' 
		+ 			'</tr>' 
		+ 		'</tbody>'
		+ 	'</table>'
		+ 	'<addonitemview></addonitemview>'
}