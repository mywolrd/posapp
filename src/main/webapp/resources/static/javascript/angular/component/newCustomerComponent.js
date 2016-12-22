let newCustomerComponent = {
	controller:
		function newCustomerCtrl(customerService, keyboardService) {
			let ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.new_customer_info = [
					{label: 'Last Name', id: "lastName", value: null, required: true, keyboardConfig: keyboardService.getKeyboard()}, 
					{label: 'First Name', id: "firstName", value: null, required: false, keyboardConfig: keyboardService.getKeyboard()}, 
					{label: 'Phone Number',id: "phoneNumber", value: null, required: false, keyboardConfig: keyboardService.getNumberPad()}];
						
				ctrl.title = 'New Customer';
			}

			ctrl.save = function() {
				let new_customer = ctrl.new_customer_info.reduce(function(map, currentItem) {
					map[currentItem.id] = currentItem.value;
					return map;
				}, {});

				customerService.save(new_customer, function(res) {
					customerService.setCurrentCustomer(res.data);
					_reset();
				}, function(res) {
				});
			};
			
			ctrl.update = function(name, value, index) {
				ctrl.new_customer_info[index].value = value;
			};
			
			function _reset() {				
				for (info of ctrl.new_customer_info) {
					info.value = null;
				}				
			};
		},
	template:
			'<div class="col-xs-6">'
		+		'<p-form form-input="$ctrl.new_customer_info" title="{{$ctrl.title}}" button-name="Save"'
		+			'on-update="$ctrl.update(name, value, index)" submit="$ctrl.save()" />'
		+	'</div>'
}