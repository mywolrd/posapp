var manageMenuComponent = {
	controller:
		function manageMenuCtrl(itemService, menuService) {
			var ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.items = itemService.getItems();
				
				var defaultSizes = menuService.getManageMenuDefaultSizes();
				ctrl.numberOfTypes = defaultSizes.types;
				ctrl.numberOfItems = defaultSizes.items;
			}

			this.save = function() {
				
			}
		},
	template:'<div class="col-xs-1">Manage Menu</div>'
		+	'<div class="form-group col-xs-3">'
		+		'<table class="table borderless">'
		+		'</table>'
		+		'<table class="table borderless">'
		+			'<tbody>'
		+				'<tr data-ng-repeat="item in $ctrl.items">'
		+					'<td>{{item.type.name}}</td>'
		+				'</tr>'
		+			'</tbody>'
		+		'</table>'
		+	'</div>'
		+	'<div class="form-group col-xs-7">'
		+		'<table class="table borderless" id="itemTypeTable">'
		+			'<tbody>'
		+				'<tr data-ng-repeat="item in $ctrl.items">'
		+					'<td>{{item.name}}</td>'
		+				'</tr>'
		+			'</tbody>'
		+		'</table>'	
		+	'</div>'
		+	'<div class="col-xs-1"></div>'
}