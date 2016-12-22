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
				total();
			})
			
			let cart = cartService.get();
			if (cart) {
				ctrl.cart = flattenCart(cart);
				total();
			}
			
			ctrl.customer = customerService.getCurrentCustomer();
			
			ctrl.dateOptions = {
				dateDisabled: disabled,
				maxDate: new Date(2030, 5, 22),
				minDate: new Date(),
				startingDay: 1,
				showWeeks: false
			};

			ctrl.dt = cartService.defaultReadyDate();
			ctrl.dateFormat = 'EEE dd';
				
			ctrl.openDateWindow = function() {
			    ctrl.opened = true;
			};
				
			ctrl.opened = false;
		}

		ctrl.$onDestroy = function() {
			cartService.setReadyDate(null);

			if (cartSubscription)
				cartSubscription.dispose();
		}
		
		ctrl.changeDate = function() {
			cartService.setReadyDate(ctrl.dt);
		}
		
		ctrl.customerInfo = {
			name : "Customer",
			enabled : true,
			action : function() {
				navigationService.setRoute('searchcustomer');
				navigationService.go();
			}
		};

		function disabled(data) {
			let date = data.date, mode = data.mode;
			return mode === 'day' && date.getDay() === 0;
		}
		
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

		function total() {
			let total = cartService.getTotal();
			ctrl.tQ = total.q;
			ctrl.tDollar = total.d;
			ctrl.tCent = total.c;
		}
		
		function flattenCart(cartArray) {
			let newCart = [];
			
			for (let i = 0, len = cartArray.length; i < len; i++) {
				newCart.push(cartArray[i]);
				
				let orderDetailAddonItems = cartArray[i].orderDetailAddonItems;
				if (orderDetailAddonItems) {
					newCart = newCart.concat(orderDetailAddonItems);
				}
			}
			return newCart;
		}	
	},
	template:
			'<div class="col-xs-12 cart-info">'
		+		'<span class="col-xs-1" />'
		+		'<sw-button data-ng-if="$ctrl.customerInfo.enabled" span-width="6" button-name="{{ $ctrl.customer ? $ctrl.customer.name:$ctrl.customerInfo.name }}" button-class="btn-primary" do-click="$ctrl.customerInfo.action()"/>'
		+		'<span class="col-xs-1" />'
		+		'<div class="col-xs-3">'
        +			'<p class="input-group">'
        + 				'<input type="text" class="form-control" data-ng-change="$ctrl.changeDate()" uib-datepicker-popup="{{$ctrl.dateFormat}}" data-ng-model="$ctrl.dt" is-open="$ctrl.opened" datepicker-options="$ctrl.dateOptions" ng-required="true" close-text="Close"/>'
        +  				'<span class="input-group-btn">'
        +    				'<button type="button" class="btn btn-default" data-ng-click="$ctrl.openDateWindow()"><i class="glyphicon glyphicon-calendar"></i></button>'
        +	  			'</span>'
        +			'</p>'
        +		'</div>'
		+		'<span class="col-xs-1" />'
		+	'</div>'
		
	    +	'<div class="col-xs-12 cart-info">'
		+		'<span class="col-xs-6">Total Quantity : {{$ctrl.tQ}}</span>'
		+		'<span class="col-xs-6">Total Price : {{$ctrl.tDollar}}.{{$ctrl.tCent}}</span>'
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
		function(keyboardService) {
			let ctrl = this;
			ctrl.keyboardConfig = keyboardService.getNumberPad();
			
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
		+		'item-index="$ctrl.itemIndex" span-width="2" font-size="20" keyboard-config="$ctrl.keyboardConfig" />'
		
		+	'<sw-button data-ng-if="! $ctrl.item.hasQuantity" button-class="btn-primary" button-name="-"' 
		+		'span-width="2"  do-click="$ctrl.removeAddon()"/>'
		
		+	'<span class="col-xs-6 font-18">{{$ctrl.item.itemName}}</span>'
		
		+	'<sw-input input-type="text" input-value="$ctrl.item.dollar" input-name="dollar" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="2" font-size="20" keyboard-config="$ctrl.keyboardConfig" />'
		
		+	'<sw-input input-type="text" input-value="$ctrl.item.cent" input-name="cent" on-update="$ctrl.update(name, value, index)"' 
		+		'item-index="$ctrl.itemIndex" span-width="2" font-size="20" keyboard-config="$ctrl.keyboardConfig" />'
};