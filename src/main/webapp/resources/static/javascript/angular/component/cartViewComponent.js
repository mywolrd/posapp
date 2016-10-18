var cartViewComponent = {
	controller:
		function cartViewCtrl(cartService, customerService) {
		var ctrl = this;
		this.selectedId = null;
		
		this.$doCheck = function() {
			var cart = cartService.getCart();
			if (cart)	this.cart = cart;
			var currentCustomer = customerService.getCurrentCustomer();
			if (currentCustomer)	this.cartInfo[0].name = currentCustomer.displayValue[0];
		}
		
		this.cartInfo = [ {
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
	},
	template:'<table id="cart-info-table" class="table">'
		+ 		'<tbody>'
		+ 			'<tr data-ng-repeat="info in $ctrl.cartInfo">'
		+ 				'<td data-ng-if="info.enabled">'
		+ 					'<button class="btn btn-block" data-ng-click="info.action()">{{info.name}}</button>'
		+ 				'</td>'
		+ 				'<td data-ng-if="!info.enabled"><label>{{info.name}}</label></td>'
		+ 			'</tr>'
		+ 		'</tbody>'
		+ 	'</table>'
		+ 	'<div id="cart-items-list" class="col-xs-12">'
		+ 		'<div class="col-xs-12 item" data-ng-repeat="cartItem in $ctrl.cart">'
		+			'<span class="col-xs-2"><input type="text" class="form-control cart-item-button" data-ng-model="cartItem.quantity" data-ng-virtual-keyboard="{kt:' + "'Number_Pad'" + ', relative: false, size: 5}"/></span>'
		+ 			'<span class="col-xs-6">{{cartItem.itemName}}</span>'
		+			'<span class="col-xs-2"><input type="text" class="form-control cart-item-button" data-ng-model="cartItem.price.dollar" data-ng-virtual-keyboard="{kt:' + "'Number_Pad'" + ', relative: false, size: 5}"/></span>'
		+			'<span class="col-xs-2"><input type="text" class="form-control cart-item-button" data-ng-model="cartItem.price.cent" data-ng-virtual-keyboard="{kt:' + "'Number_Pad'" + ', relative: false, size: 5}"/></span>'
		+ 		'</div>'
		+ 	'</div>'
}