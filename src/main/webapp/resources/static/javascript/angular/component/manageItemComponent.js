let manageItemComponent = {
	controller:
		function manageItemCtrl(itemService, menuService, utilsService, keyboardService) {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.numberPadConfig = keyboardService.getNumberPad();
				ctrl.keyboardConfig = keyboardService.getKeyboard();
				ctrl.price = {};
			}
			
			ctrl.saveItem = function() {
				if (ctrl.itemType) {
					itemService.saveOrUpdateItem({	itemTypeId: ctrl.itemType.id,
													name: ctrl.newItemName,
													dollar: ctrl.price.dollar,
													cent: ctrl.price.cent});
				}
			}
			
			ctrl.update = function(name, value, index) {
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
		+		'<sw-button button-class="btn-primary" span-width="1" font-size="20" button-name="Save" do-click="$ctrl.saveItem()"/>'	
		+		'<span class="col-xs-1 /">'		
		+	'</div>'

		+	'<div data-ng-if="!$ctrl.items"><span>No Items for {{$ctrl.itemType.name}}</span></div>'
		
		+	'<div data-ng-if="$ctrl.items" class="item col-xs-12" data-ng-repeat="item in $ctrl.items | limitTo:$ctrl.pageSize:$ctrl.pageNum*$ctrl.pageSize">'
		
		+		'<sw-input input-type="text" input-value="item.weight" input-name="weight" on-update="$ctrl.update(name, value, index)"' 
		+			'item-index="{{$index}}" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig"></sw-input>'
		
		+		'<sw-input input-type="text" input-value="item.name" input-name="name" on-update="$ctrl.update(name, value, index)"' 
		+			'item-index="{{$index}}" span-width="4" font-size="20" keyboard-config="$ctrl.keyboardConfig"></sw-input>'
		
		+		'<span class="col-xs-1" />'
		
		+		'<sw-input input-type="text" input-value="item.price.dollar" input-name="dollar" on-update="$ctrl.update(name, value, index)"' 
		+			'item-index="{{$index}}" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig"></sw-input>'
		
		+		'<sw-input input-type="text" input-value="item.price.cent" input-name="cent" on-update="$ctrl.update(name, value, index)"' 
		+			'item-index="{{$index}}" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig"></sw-input>'
		
		+		'<sw-input input-type="checkbox" input-value="item.active" input-name="active" on-update="$ctrl.update(name, value, index)"'
		+			'item-index="{{$index}}" span-width="1" />'

		+	'</div>'
		+	'<pn-buttons update-current-page="$ctrl.chagenPageNum(curPage)" max-page="$ctrl.maxPageNum" />'
};