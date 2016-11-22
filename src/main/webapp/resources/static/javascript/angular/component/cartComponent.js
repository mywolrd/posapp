let cartComponent = {
	controller:
		function cartCtrl(cartService, customerService, navigationService) {
		let ctrl = this,
			cartSubscription,
			_quantity = "quantity",
			_price = "newprice",
			_cent = "cent",
			_dollar = "dollar";
		
		ctrl.$onInit = function() {
			cartSubscription = cartService.subscribe(function(d) {
				ctrl.cart = flattenCart(d);
			})
			
			let cart = cartService.get();
			if (cart)
				ctrl.cart = flattenCart(cart);
			
			let customer = customerService.getCurrent();
			if (customer)
				ctrl.customer = customer;
		}

		ctrl.$onDestroy = function() {
			if (cartSubscription)
				cartSubscription.dispose();
		}
		
		ctrl.cartInfo = [ {
			name : "Customer",
			enabled : true,
			action : function() {
				navigationService.setRoute('searchcustomer');
				navigationService.go();
			}
		}, {
			name : "today's date",
			enabled : true,
			action : function() {
			}
		}, {
			name : "ready date",
			enabled : true,
			action : function() {
			}
		} ];
		
		ctrl.update = function(name, value, index) {
			let cartItem = ctrl.cart[index];

			// Remove item
			if (angular.equals(name, _quantity) && value == 0) {
				if (cartItem.hasQuantity) {
					cartService.remove(cartItem.index);
				} else {
					cartService.remove(cartItem.index, cartItem.parentIndex);
				}
			} else {				
				cartService.update(name, value, cartItem.index, cartItem.parentIndex);
			}
		}
		
		function flattenCart(cartArray) {
			let newCart = [];
			
			for (let i = 0; i < cartArray.length; i++) {
				newCart.push(cartArray[i]);
				
				let addonItems = cartArray[i].addonItems;
				if (addonItems) {
					newCart = newCart.concat(addonItems);
				}
			}
			return newCart;
		}
		
	},
	template:
			'<div class="col-xs-12 font-18 cart-info" data-ng-repeat="info in $ctrl.cartInfo">'
		+		'<span class="col-xs-3" />'
		+		'<sw-button data-ng-if="info.enabled" span-width="6" button-name="{{info.name}}" button-class="btn-primary" do-click="info.action()"/>'
		+		'<span class="col-xs-3" />'
		+	'</div>'
		
		+	'<cart-item-list list="$ctrl.cart" on-update="$ctrl.update(name, value, index)" pref-page-size="7" />'
}

let cartItemListComponent = {
	controller: editListComponentCtrl,
	bindings: {
		list: '<',
		onUpdate: '&',
		prefPageSize: '@'
	},
	template:		
			'<div class="item col-xs-12 cart-item" data-ng-repeat="item in $ctrl.list | limitTo:$ctrl.pageSize:$ctrl.curPage*$ctrl.pageSize">'
		+		'<cart-item item="item" item-index="$index" on-update="$ctrl.update(name, value, index)" />'
		+	'</div>'
		+	'<pn-buttons cur-page="$ctrl.curPage" update-current-page="$ctrl.changePageNum(curPage)" max-page="$ctrl.maxPageNum" />'

}

let cartItemComponent = {
	controller:
		function() {
			let ctrl = this;
			
			ctrl.update = function(name, value, index) {
				ctrl.onUpdate({name: name, value: value, index: index});
			}
			
			ctrl.removeAddon = function() {
				ctrl.onUpdate({name: 'quantity', value: 0, index: ctrl.itemIndex});
			}
		},
	bindings: {
		item: '<',
		itemIndex: '<',
		onUpdate: '&'
	},
	template:
			'<sw-input data-ng-if="$ctrl.item.hasQuantity" input-type="text" input-value="$ctrl.item.quantity" input-name="quantity" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig" />'
		
		+	'<sw-button data-ng-if="! $ctrl.item.hasQuantity" button-class="btn-primary" button-name="-"' 
		+		'span-width="2"  do-click="$ctrl.removeAddon()"/>'
		
		+	'<span class="col-xs-6 font-18">{{$ctrl.item.itemName}}</span>'
		
		+	'<sw-input input-type="text" input-value="$ctrl.item.dollar" input-name="dollar" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig" />'
		
		+	'<sw-input input-type="text" input-value="$ctrl.item.cent" input-name="cent" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig" />'
};