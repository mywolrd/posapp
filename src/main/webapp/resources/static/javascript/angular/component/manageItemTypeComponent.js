let manageItemTypeComponent = {
	controller:
		function manageItemTypeCtrl(itemService, menuService, keyboardService) {
			let ctrl = this, 
				_name = 'name';
			
			ctrl.$onInit = function() {
				ctrl.numberPadConfig = keyboardService.getNumberPad();
				ctrl.keyboardConfig = keyboardService.getKeyboard();

				ctrl.itemTypes = itemService.getItemTypes();
				ctrl.items = itemService.getItems();
				
				ctrl.newItemTypeName = null;				
			}
			
			_saveOrUpdateItemType = function(itemType) {
				itemService.saveOrUpdateItemType(itemType, function success(){
					ctrl.newItemTypeName = null;
					ctrl.itemTypes = itemService.getItemTypes();
					
					menuService.refreshMenu();
				});
			}
			
			ctrl.selectItemType = function(index) {
				if (index == -1)
					ctrl.currentItemType = null;
				else
					ctrl.currentItemType = ctrl.itemTypes[index];
				
				ctrl.setItems({type: ctrl.currentItemType});
			}
			
			ctrl.update = function(name, value, index) {
				if (angular.isUndefined(index) && angular.equals(_name, name)) {
					if (value) {
						ctrl.newItemTypeName = value;
						_saveOrUpdateItemType({name: value});
					}
				}
				
				if (angular.isDefined(index) &&
						angular.isDefined(name) &&
						angular.isDefined(value)) {
					let _itemType = angular.copy(ctrl.itemTypes[index]);
					_itemType[name] = value;
					_saveOrUpdateItemType(_itemType);
				}
			}
		},
	bindings: {
		setItems: '&'
	},
	template:
			'<div class="form-group col-xs-12">'
		+		'<sw-input input-type="text" input-value="$ctrl.newItemTypeName" input-name="name" on-update="$ctrl.update(name, value, index)"' 
		+			'span-width="7" font-size="20" keyboard-config="$ctrl.keyboardConfig" place-holder="New Item Type"></sw-input>'		
		+		'<span class="col-xs-1" />'
		+	'</div>'
		
		+	'<item-type-list list="$ctrl.itemTypes" pref-page-size="7" on-update="$ctrl.update(name, value, index)" do-click="$ctrl.selectItemType(index)" />'
};

let itemTypeListComponent = {
	controller: editListComponentCtrl,
	bindings: {
		list: '<',
		doClick: '&',
		onUpdate: '&',
		prefPageSize: '@'
	},
	template: 
			'<div class="item col-xs-12" data-ng-repeat="itemType in $ctrl.list | limitTo:$ctrl.pageSize:$ctrl.curPage*$ctrl.pageSize">'
		+		'<itemtype class="item-type" item-type="itemType" item-index="$index" do-click="$ctrl.select(index)" on-update="$ctrl.update(name, value, index)" />'
		+	'</div>'
		+	'<pn-buttons update-current-page="$ctrl.changePageNum(curPage)" max-page="$ctrl.maxPageNum" />'
};

let editItemTypeComponent = {
	controller:
		function(keyboardService) {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.numberPadConfig = keyboardService.getNumberPad();
				ctrl.keyboardConfig = keyboardService.getKeyboard();
			}
			
			ctrl.update = function(name, value, index) {
				ctrl.onUpdate({name: name, value: value, index: index});
			}
			
			ctrl.click = function(index) {
				ctrl.doClick({index: index});
			}
		},
	bindings: {
		itemType: '<',
		itemIndex: '<',
		onUpdate: '&',
		doClick: '&'
	},
	template:
			'<sw-input input-type="text" input-value="$ctrl.itemType.weight" input-name="weight" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig"></sw-input>'
		
		+	'<sw-input input-type="text" input-value="$ctrl.itemType.name" input-name="name" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="5" font-size="20" keyboard-config="$ctrl.keyboardConfig"></sw-input>'
		
		+	'<span class="col-xs-1" />'
		
		+	'<sw-input input-type="checkbox" input-value="$ctrl.itemType.active" input-name="active" on-update="$ctrl.update(name, value, index)"'
		+		'item-index="$ctrl.itemIndex" span-width="1" />'

		+	'<sw-button button-class="btn-default" span-width="2" button-name="Items" do-click="$ctrl.click($ctrl.itemIndex)"/>'	
};