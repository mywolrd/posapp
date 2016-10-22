var manageItemComponent = {
	controller:
		function manageItemCtrl(itemService, menuService, utilsService, keyboardService) {
			var ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.numberPadConfig = keyboardService.getNumberPad();
				ctrl.keyboardConfig = keyboardService.getKeyboard();
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
	template:
			'<div class="form-group">'
		+		'<sw-input input-model="$ctrl.newItemName" span-width="3" font-size="20" keyboard-config="$ctrl.keyboardConfig" place-holder="New Item"></sw-input>'
		+		'<span class="col-xs-1"></span>'
		+		'<sw-input input-model="$ctrl.newItemName" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig" place-holder="$"></sw-input>'
		+		'<sw-input input-model="$ctrl.newItemName" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig" place-holder="&#162;"></sw-input>'
		+		'<span class="col-xs-1 no-padding"><button class="btn btn-primary btn-block" data-ng-click="$ctrl.saveItem()">Save</button></span>'
		+		'<span class="col-xs-1"></span>'		
		+	'</div>'

		+	'<div class="item col-xs-12" data-ng-repeat="item in $ctrl.items | limitTo:$ctrl.pageSize:$ctrl.pageNum*$ctrl.pageSize">'
		+		'<sw-input input-model="item.weight" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig"></sw-input>'
		+		'<sw-input input-model="item.name" span-width="4" font-size="20" keyboard-config="$ctrl.keyboardConfig"></sw-input>'
		+		'<input type="checkbox" "class="col-xs-1" data-ng-model="item.active"/>'
		+		'<span class="col-xs-5"></span>'

		+	'</div>'
		+	'<prevnextbuttons update-current-page="$ctrl.chagenPageNum(curPage)" max-page="$ctrl.maxPageNum"></prevnextbuttons>'
};