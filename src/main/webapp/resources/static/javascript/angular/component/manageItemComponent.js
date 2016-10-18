var manageItemComponent = {
	controller:
		function manageItemCtrl(itemService, menuService, utilsService) {
			var ctrl = this;
			
			ctrl.saveItem = function() {
				
			}
			
			ctrl.updateItem = function() {
				
			}
		},
	bindings: {
		items: '<'
	},
	template:'<div class="col-xs-4 form-group">'
		+		'<input class="form-control font-20" type="text" data-ng-model="$ctrl.newItemName" placeholder="New Item"/>'
		+	'</div>'
		+	'<div class="col-xs-1"></div><div class="col-xs-2"><button class="btn btn-primary" data-ng-click="">Save</button></div>'
		+	'<div class="item col-xs-12" data-ng-repeat="item in $ctrl.items | limitTo:$ctrl.pageSize:$ctrl.pageNum*$ctrl.pageSize">'
		+		'<div class="col-xs-3"><input type="text" class="form-control font-20" data-ng-model="item.type.weight"/></div>'
		+		'<span class="col-xs-6">{{item.type.name}}</span>'
		+		'<span class="col-xs-1"></span>'
		+		'<input type="checkbox" "class="col-xs-1" data-ng-model="item.type.active"/>'
		+		'<span class="col-xs-1"></span>'
		+	'</div>'
		+	'<prevnextbuttons update-current-page="$ctrl.chagenPageNum(curPage)" max-page="$ctrl.maxPageNum"></prevnextbuttons>'
};