var manageItemComponent = {
	controller:
		function manageItemCtrl(itemService, menuService, utilsService) {
			var ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.price = {};
			}
			
			ctrl.saveItem = function() {
				if (angular.isDefined(ctrl.itemType) && null !== ctrl.itemType) {
					itemService.saveOrUpdateItem({	itemTypeId: ctrl.itemType.id,
													name: ctrl.newItemName,
													dollar: ctrl.price.dollar,
													cent: ctrl.price.dollar});
				}
			}
			
			ctrl.updateItem = function() {
			}
		},
	bindings: {
		items: '<',
		itemType: '<'
	},
	template:'<div class="col-xs-3 form-group">'
		+		'<input class="form-control font-20" type="text" data-ng-model="$ctrl.newItemName" placeholder="New Item"/>'
		+	'</div>'
		+	'<div class="col-xs-1"></div>'
		+	'<div class="col-xs-2 form-group">'
		+		'<input class="form-control font-20" type="text" data-ng-model="$ctrl.price.dollar" placeholder="$" data-ng-virtual-keyboard="{kt:' + "'Number_Pad'" + ', relative: false, size: 5}"/>'
		+	'</div>'
		+	'<span> </span>'
		+	'<div class="col-xs-2 form-group">'
		+		'<input class="form-control font-20" type="text" data-ng-model="$ctrl.price.cent" placeholder="&#162;" data-ng-virtual-keyboard="{kt:' + "'Number_Pad'" + ', relative: false, size: 5}"/>'
		+	'</div>'
		+	'<div class="col-xs-1 no-padding"><button class="btn btn-primary btn-block" data-ng-click="$ctrl.saveItem()">Save</button></div>'
		+	'<div class="col-xs-1"></div>'
		+	'<div class="item col-xs-12" data-ng-repeat="item in $ctrl.items | limitTo:$ctrl.pageSize:$ctrl.pageNum*$ctrl.pageSize">'
		+		'<span class="col-xs-2"><input type="text" class="form-control font-20" data-ng-model="item.weight"/></span>'
		+		'<numberinput input-model="item.weight" span-width="2" font-size="20" ></numberinput>'
		+		'<span class="col-xs-4"><input type="text" class="form-control font-20" data-ng-model="item.name"/></span>'
		+		'<input type="checkbox" "class="col-xs-1" data-ng-model="item.active"/>'
		+		'<span class="col-xs-1"></span>'
		+	'</div>'
		+	'<prevnextbuttons update-current-page="$ctrl.chagenPageNum(curPage)" max-page="$ctrl.maxPageNum"></prevnextbuttons>'
};