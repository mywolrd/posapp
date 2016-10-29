let cartComponent = {
	controller:
		function cartViewCtrl(cartService, customerService, navigationService) {
		let ctrl = this;
		ctrl.selectedId = null;
		
		ctrl.$doCheck = function() {
			let cart = cartService.getCart();
			if (cart)	this.cart = cart;
			let currentCustomer = customerService.getCurrentCustomer();
			if (currentCustomer)
				this.cartInfo[0].name = currentCustomer.displayValue[0];
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
		
		ctrl.removeItem = function(index) {
			cartService.remove(index);
		}
	},
	template:
			'<div class="col-xs-12 font-18 cart-info" data-ng-repeat="info in $ctrl.cartInfo">'
		+		'<span class="col-xs-3" />'
		+		'<sw-button data-ng-if="info.enabled" span-width="6" button-name="{{info.name}}" button-class="btn-primary" do-click="info.action()"/>'
		+		'<span class="col-xs-3" />'
		+	'</div>'
		
		+ 	'<div class="col-xs-12 cart-item-list">'
		+		'<div class="col-xs-12 cart-item" data-ng-repeat="cartItem in $ctrl.cart">'
		+			'<cart-item item="cartItem" item-index="$index" remove="$ctrl.removeItem(index)"/>'
		+		'</div>'
		+ 	'</div>'
}

let cartItemComponent = {
	controller:
		function() {
			let ctrl = this,
				_quantity = "quantity";
			
			ctrl.$onInit = function() {
				
			}
			
			ctrl.update = function(name, value, index) {
				if (angular.equals(name, _quantity) && value == 0) {
					ctrl.remove({index: index});
				}
				
				
				console.log(name, value, index);
			}
		},
	bindings: {
		item: '<',
		itemIndex: '<',
		remove: '&'
	},
	template:
			'<sw-input data-ng-if="$ctrl.item.hasQuantity" input-type="text" input-value="$ctrl.item.quantity" input-name="quantity" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig" />'
		
		+	'<span class="col-xs-2" data-ng-if="! $ctrl.item.hasQuantity"/>'
		
		+	'<span class="col-xs-6 font-18">{{$ctrl.item.itemName}}</span>'
		
		+	'<sw-input input-type="text" input-value="$ctrl.item.newprice.dollar" input-name="dollar" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig" />'
		
		+	'<sw-input input-type="text" input-value="$ctrl.item.newprice.cent" input-name="cent" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="2" font-size="20" keyboard-config="$ctrl.numberPadConfig" />'
};