let manageItemTypeComponent = {
	controller:
		function manageItemTypeCtrl(itemService, menuService, utilsService, keyboardService) {
			let ctrl = this, 
				_name = 'name';
			
			ctrl.$onInit = function() {
				ctrl.numberPadConfig = keyboardService.getNumberPad();
				ctrl.keyboardConfig = keyboardService.getKeyboard();

				ctrl.itemTypes = itemService.getItemTypes();
				ctrl.items = itemService.getItems();
				
				ctrl.newItemTypeName = null;
			}
			
			_saveNewItemType = function(newItemTypeName) {
				itemService.saveOrUpdateItemType({name: newItemTypeName});
			}
			
			_updateItemType = function(itemType) {
				itemService.saveOrUpdateItemType(itemType);
			}
			
			ctrl.unselectItemType = function() {
				ctrl.currentItemType = null;
				ctrl.setItems({type: ctrl.currentItemType});
			}
			
			ctrl.selectItemType = function(index) {
				if (index == -1)
					ctrl.currentItemType = null;
				else
					ctrl.currentItemType = ctrl.itemTypes[index];
				
				ctrl.setItems({type: ctrl.currentItemType});
			}
			
			ctrl.updateItem = function(name, value, index) {
				if (angular.isUndefined(index) && angular.equals(_name, name)) {
					if (value)
						_saveNewItemType(value);
				}
				
				if (angular.isDefined(index) &&
						angular.isDefined(name) &&
						angular.isDefined(value)) {
					let _itemType = angular.copy(ctrl.itemTypes[index]);
					_itemType[name] = value;
					_updateItemType(_itemType);
				}
				
			}
		},
	bindings: {
		setItems: '&'
	},
	template:
			'<div class="form-group col-xs-12">'
		+		'<sw-input input-type="text" input-value="$ctrl.newItemTypeName" input-name="name" on-update="$ctrl.updateItem(name, value, index)"' 
		+			'span-width="7" font-size="20" keyboard-config="$ctrl.keyboardConfig" place-holder="New Item Type"></sw-input>'
		
		+		'<span class="col-xs-1" />'
		+	'</div>'
		+	'<item-type-list update-item="$ctrl.updateItem(name, value, index)" item-types="$ctrl.itemTypes" do-click="$ctrl.selectItemType(index)"/>'
};

let itemTypeListComponent = {
	controller: 
		function(utilsService, keyboardService) {
			let ctrl = this,
				currentItemTypeIndex = -1;
			
			ctrl.$onInit = function() {
				ctrl.pageSize = 10;
				ctrl.curPage = 0;
				ctrl.maxPageNum = utilsService.getMaxPageNum(ctrl.items, ctrl.pageSize);
				ctrl.numberPadConfig = keyboardService.getNumberPad();
				ctrl.keyboardConfig = keyboardService.getKeyboard();
			}
				
			ctrl.changePageNum = function(curPage) {
				ctrl.curPage = curPage;
			}
				
			ctrl.selectItemType = function(index) {
				ctrl.doClick({index: index});
			}
			
			ctrl.update = function(name, value, index) {
				ctrl.updateItem({name: name, value: value, index: index});
			}
			
			ctrl.showItems = function(index) {
				if (index === currentItemTypeIndex)
					currentItemTypeIndex = -1;
				else
					currentItemTypeIndex = index;
				
				ctrl.doClick({index: currentItemTypeIndex});
			}
		},
	bindings: {
		itemTypes: '<',
		doClick: '&',
		updateItem: '&'
	},
	template: 
			'<div class="item col-xs-12" data-ng-repeat="itemType in $ctrl.itemTypes | limitTo:$ctrl.pageSize:$ctrl.curPage*$ctrl.pageSize">'
		+		'<sw-input input-type="text" input-value="itemType.weight" input-name="weight" on-update="$ctrl.update(name, value, index)"' 
		+			'item-index="{{$index}}" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig"></sw-input>'
		
		+		'<sw-input input-type="text" input-value="itemType.name" input-name="name" on-update="$ctrl.update(name, value, index)"' 
		+			'item-index="{{$index}}" span-width="5" font-size="20" keyboard-config="$ctrl.keyboardConfig"></sw-input>'
		+		'<span class="col-xs-1" />'
		+		'<sw-input input-type="checkbox" input-value="itemType.active" input-name="active" on-update="$ctrl.update(name, value, index)"'
		+			'item-index="{{$index}}" span-width="1" />'

		+		'<sw-button button-class="btn-default" span-width="2" button-name=">>" do-click="$ctrl.showItems($index)"/>'	

		+	'</div>'
		+	'<pn-buttons update-current-page="$ctrl.changePageNum(curPage)" max-page="$ctrl.maxPageNum" />'
};