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
													cent: ctrl.price.cent});
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
			'<div class="form-group col-xs-12">'
		+		'<sw-input input-model="$ctrl.newItemName" span-width="3" font-size="20" keyboard-config="$ctrl.keyboardConfig" place-holder="New Item" />'
		+		'<span class="col-xs-1"></span>'
		+		'<sw-input input-model="$ctrl.price.dollar" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig" place-holder="$" />'
		+		'<sw-input input-model="$ctrl.price.cent" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig" place-holder="&#162;" />'
		+		'<sw-button span-width="1" font-size="20" button-name="Save" do-click="$ctrl.saveItem()"/>'	
		+		'<span class="col-xs-1 /">'		
		+	'</div>'

		+	'<div class="item col-xs-12" data-ng-repeat="item in $ctrl.items | limitTo:$ctrl.pageSize:$ctrl.pageNum*$ctrl.pageSize">'
		+		'<sw-input input-model="item.weight" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig"></sw-input>'
		+		'<sw-input input-model="item.name" span-width="4" font-size="20" keyboard-config="$ctrl.keyboardConfig"></sw-input>'
		+		'<span class="col-xs-1" />'
		+		'<sw-input input-model="item.price.dollar" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig" />'
		+		'<sw-input input-model="item.price.cent" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig" />'		
		+		'<input type="checkbox" "class="col-xs-1" data-ng-model="item.active"/>'

		+	'</div>'
		+	'<pn-buttons update-current-page="$ctrl.chagenPageNum(curPage)" max-page="$ctrl.maxPageNum" />'
};